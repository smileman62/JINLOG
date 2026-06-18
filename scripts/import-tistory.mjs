/**
 * Tistory 블로그 글을 Velite MDX로 가져옵니다.
 * 사용: node scripts/import-tistory.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";
import TurndownService from "turndown";

const BASE_URL = "https://jskim6335.tistory.com";
const OUTPUT_DIR = path.join(process.cwd(), "content/posts/tistory");

const CATEGORY_PAGES = [
  "/category/React",
  "/category/Next.js",
  "/category/TypeScript%20%EB%94%A5%20%EB%8B%A4%EC%9D%B4%EB%B8%8C%21",
  "/category/%EC%BD%94%EB%94%A9%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EC%A4%80%EB%B9%84/Python%20%EA%B8%B0%EB%B3%B8",
];

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});
turndown.addRule("strikethrough", {
  filter: ["del", "s"],
  replacement: (content) => `~~${content}~~`,
});
turndown.addRule("images", {
  filter: "img",
  replacement: (_content, node) => {
    const alt = node.getAttribute("alt") || "";
    const src = node.getAttribute("src") || "";
    return src ? `![${alt}](${src})` : "";
  },
});

function sanitizeMarkdown(markdown) {
  let result = markdown
    .replace(/<form[\s\S]*?<\/form>/gi, "")
    .replace(/<\/?form[^>]*>/gi, "")
    .replace(/<img\b[^>]*\/?>/gi, (tag) => {
      const src = tag.match(/src="([^"]+)"/i)?.[1];
      const alt = tag.match(/alt="([^"]*)"/i)?.[1] ?? "";
      return src ? `![${alt}](${src})` : "";
    })
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const parts = result.split(/(```[\s\S]*?```)/g);
  result = parts
    .map((part, index) => {
      if (index % 2 === 1) return part;
      return part
        .replace(/\{/g, "\\{")
        .replace(/\}/g, "\\}")
        .replace(/</g, "&lt;");
    })
    .join("");

  return result;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugifyTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function inferTags(title, categoryLabel, markdown) {
  const tags = new Set();
  const haystack = `${title} ${categoryLabel} ${markdown}`.toLowerCase();

  if (haystack.includes("next.js") || haystack.includes("nextjs")) {
    tags.add("nextjs");
  }
  if (haystack.includes("react")) {
    tags.add("react");
  }
  if (categoryLabel.toLowerCase().includes("next")) {
    tags.add("nextjs");
  }
  if (categoryLabel.toLowerCase().includes("react")) {
    tags.add("react");
  }
  if (tags.size === 0) {
    tags.add("react");
  }
  return [...tags];
}

function yamlEscape(value) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function toIsoDate(value) {
  if (!value) return new Date().toISOString().slice(0, 10);
  return new Date(value).toISOString().slice(0, 10);
}

function summarize(text, max = 160) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1)}…`;
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "JINLOG-Importer/1.0" },
  });
  if (!res.ok) return null;
  return res.text();
}

async function collectPostIds() {
  const ids = new Set();

  for (let page = 1; page <= 6; page += 1) {
    const html = await fetchHtml(`${BASE_URL}/?page=${page}`);
    if (!html) continue;
    for (const match of html.matchAll(/href="\/(\d+)"/g)) {
      ids.add(Number(match[1]));
    }
    await sleep(200);
  }

  for (const categoryPath of CATEGORY_PAGES) {
    const html = await fetchHtml(`${BASE_URL}${categoryPath}`);
    if (!html) continue;
    for (const match of html.matchAll(/href="\/(\d+)"/g)) {
      ids.add(Number(match[1]));
    }
    await sleep(200);
  }

  for (let id = 1; id <= 40; id += 1) {
    const html = await fetchHtml(`${BASE_URL}/${id}`);
    if (!html) continue;
    if (html.includes('property="og:type" content="article"')) {
      ids.add(id);
    }
    await sleep(150);
  }

  return [...ids].sort((a, b) => b - a);
}

function parsePost(html, id) {
  const $ = cheerio.load(html);
  const title =
    $('meta[property="og:title"]').attr("content")?.trim() ||
    $("title").text().split("—")[0]?.trim() ||
    `Tistory Post ${id}`;
  const published =
    $('meta[property="article:published_time"]').attr("content") ||
    $('meta[property="og:regDate"]').attr("content");
  const categoryLabel = $("a.category").first().text().trim() || "";
  const contentRoot =
    $(".tt_article_useless_p_margin.contents_style").first().length > 0
      ? $(".tt_article_useless_p_margin.contents_style").first()
      : $(".contents_style").first();

  const htmlContent = contentRoot.html()?.trim() ?? "";
  const markdown = sanitizeMarkdown(turndown.turndown(htmlContent || "<p></p>"));
  const plainText = contentRoot.text().replace(/\s+/g, " ").trim();
  const description = summarize(
    $('meta[name="description"]').attr("content") || plainText,
  );
  const ogImage = $('meta[property="og:image"]').attr("content");
  const cover =
    ogImage && !ogImage.includes("opengraph.png") ? ogImage : undefined;

  return {
    id,
    title,
    date: toIsoDate(published),
    categoryLabel,
    description,
    tags: inferTags(title, categoryLabel, markdown),
    cover,
    markdown: markdown.trim(),
  };
}

async function writePost(post) {
  const baseSlug = slugifyTitle(post.title) || `post-${post.id}`;
  const filename = `${baseSlug}-${post.id}.mdx`;
  const filepath = path.join(OUTPUT_DIR, filename);

  const frontmatter = [
    "---",
    `title: ${yamlEscape(post.title)}`,
    `description: ${yamlEscape(post.description)}`,
    `date: ${yamlEscape(post.date)}`,
    `tags: [${post.tags.map((tag) => `"${tag}"`).join(", ")}]`,
    `published: true`,
    post.cover ? `cover: ${yamlEscape(post.cover)}` : null,
    "---",
    "",
    post.markdown,
    "",
  ]
    .filter(Boolean)
    .join("\n");

  await fs.writeFile(filepath, frontmatter, "utf8");
  return filename;
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const ids = await collectPostIds();
  console.log(`Found ${ids.length} posts:`, ids.join(", "));

  const results = [];
  for (const id of ids) {
    const html = await fetchHtml(`${BASE_URL}/${id}`);
    if (!html) {
      console.warn(`Skip ${id}: fetch failed`);
      continue;
    }
    const post = parsePost(html, id);
    const filename = await writePost(post);
    results.push({ id, filename, title: post.title });
    console.log(`✓ [${id}] ${post.title}`);
    await sleep(300);
  }

  await fs.writeFile(
    path.join(OUTPUT_DIR, "_import-manifest.json"),
    JSON.stringify(results, null, 2),
    "utf8",
  );
  console.log(`\nImported ${results.length} posts to ${OUTPUT_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

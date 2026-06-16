import { readFileSync } from "node:fs";
import { join } from "node:path";
import { defineCollection, defineConfig, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";

const jinlogLight = JSON.parse(
  readFileSync(join(process.cwd(), "lib/shiki/jinlog-light.json"), "utf-8"),
);
const jinlogDark = JSON.parse(
  readFileSync(join(process.cwd(), "lib/shiki/jinlog-dark.json"), "utf-8"),
);

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    date: s.isodate(),
    tags: s.array(s.string()),
    published: s.boolean(),
    cover: s.string().optional(),
    body: s.mdx(),
    slug: s.path(),
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    clean: true,
  },
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: {
            light: jinlogLight,
            dark: jinlogDark,
          },
          keepBackground: false,
          defaultLang: "plaintext",
          bypassInlineCode: true,
          grid: true,
        },
      ],
    ],
  },
  collections: { posts },
});

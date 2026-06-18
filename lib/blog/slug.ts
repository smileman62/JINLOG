const POSTS_ROUTE_PREFIX = "posts/";

function decodeSlugPart(part: string): string {
  try {
    return decodeURIComponent(part);
  } catch {
    return part;
  }
}

export function normalizeRouteSlug(slug: string | string[]): string[] {
  const parts =
    typeof slug === "string"
      ? slug.split("/").filter(Boolean)
      : slug.length === 1 && slug[0].includes("/")
        ? slug[0].split("/").filter(Boolean)
        : slug;

  return parts.map(decodeSlugPart);
}

export function toVeliteSlug(routeSlugParts: string[]): string {
  return `${POSTS_ROUTE_PREFIX}${routeSlugParts.join("/")}`;
}

export function toRouteSlug(veliteSlug: string): string[] {
  const withoutPrefix = veliteSlug.startsWith(POSTS_ROUTE_PREFIX)
    ? veliteSlug.slice(POSTS_ROUTE_PREFIX.length)
    : veliteSlug;
  return withoutPrefix.split("/").filter(Boolean);
}

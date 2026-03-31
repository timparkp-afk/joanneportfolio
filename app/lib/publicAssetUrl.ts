/**
 * Encode each path segment so spaces and special chars in `public/` filenames
 * produce valid URLs on mobile Safari and case-sensitive hosts.
 */
export function publicAssetUrl(path: string): string {
  try {
    return path
      .split("/")
      .map((segment) => {
        if (segment === "") return "";
        return encodeURIComponent(decodeURIComponent(segment));
      })
      .join("/");
  } catch {
    return encodeURI(path);
  }
}

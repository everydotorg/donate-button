/**
 * @param pathParts Segments of the URL to be joined together
 * @returns A path created by combining all the parts provided into a single
 * path string, compatible with URLs; empty segments are skipped
 */
export function pathJoin(...pathParts: string[]): string {
  return pathParts
    .reduce<string[]>((memo, part) => [...memo, ...part.split("/")], [])
    .filter(Boolean)
    .join("/");
}

/**
 * @param url Base URL to join path parts onto
 * @param pathParts Parts to join onto the pathname of the base URL
 * @returns A new URL instance with the same value as the input url, but with
 * the path segments from pathParts appended to its pathname
 */
export function pathJoinToUrl(url: URL, ...pathParts: string[]): URL {
  const newUrl = new URL(url.toString());
  newUrl.pathname = pathJoin(url.pathname, ...pathParts);
  return newUrl;
}

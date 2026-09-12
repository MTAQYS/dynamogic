/** True when building / running the GitHub Pages static marketing export. */
export const isStaticDemo =
  process.env.NEXT_PUBLIC_STATIC_DEMO === "1" ||
  process.env.STATIC_EXPORT === "1";

export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}

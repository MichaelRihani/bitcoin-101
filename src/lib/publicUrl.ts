/** Paths for files in `/public`. Respects Vite `base` (e.g. `/bitcoin-101/` on GitHub Pages). */
export function publicUrl(path: string): string {
  const p = path.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${p}`;
}

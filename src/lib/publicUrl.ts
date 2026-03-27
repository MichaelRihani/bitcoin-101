/** Paths for files in `/public`. Respects Vite `base` (e.g. `/bitcoin-101/` on GitHub Pages). */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL ?? "/";
  const p = path.replace(/^\//, "");
  return `${base}${p}`;
}

/** In-page anchor that works with `base` and GitHub Pages subpaths (e.g. `/bitcoin-101/#intro`). */
export function hashHref(fragmentId: string): string {
  const id = fragmentId.replace(/^#/, "");
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base}#${id}`;
}

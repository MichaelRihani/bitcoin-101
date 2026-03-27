/** Remote screenshot thumbnail (thum.io). Larger width = sharper on retina; object-contain in UI avoids cropping. */
export function linkThumbnailUrl(pageUrl: string): string {
  return `https://image.thum.io/get/width/800/crop/600/noanimate/${encodeURIComponent(pageUrl)}`;
}

export function linkFaviconUrl(pageUrl: string): string | null {
  try {
    const host = new URL(pageUrl).hostname;
    return `https://www.google.com/s2/favicons?sz=128&domain=${encodeURIComponent(host)}`;
  } catch {
    return null;
  }
}

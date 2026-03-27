/** X / Twitter status URLs → numeric tweet id for platform embed iframe. */
export function tweetIdFromStatusUrl(url: string): string | null {
  const m = url.match(/status\/(\d+)/);
  return m?.[1] ?? null;
}

/** Spotify show page URL → embed iframe `src`. */
export function spotifyShowEmbedSrc(showUrl: string): string | null {
  const m = showUrl.match(/show\/([a-zA-Z0-9]+)/);
  return m ? `https://open.spotify.com/embed/show/${m[1]}?utm_source=generator` : null;
}

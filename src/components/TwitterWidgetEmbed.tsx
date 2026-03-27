import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: {
      ready: (cb: (twttr: { widgets: { load: (el?: Element | null) => void } }) => void) => void;
      widgets: {
        load: (el?: Element | null) => void;
      };
    };
  }
}

function loadTwitterWidgetsScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.twttr?.widgets) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const id = "twitter-wjs";
    const existing = document.getElementById(id) as HTMLScriptElement | null;
    if (existing) {
      if (window.twttr?.widgets) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://platform.twitter.com/widgets.js";
    s.async = true;
    s.charset = "utf-8";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Twitter widgets"));
    document.body.appendChild(s);
  });
}

function tweetPageUrl(url: string): string {
  return url.replace(/^https:\/\/x\.com\//, "https://twitter.com/");
}

/**
 * Full post from X/Twitter. Height follows tweet content (widgets.js).
 */
export function TwitterWidgetEmbed({ url, caption }: { url: string; caption?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const href = tweetPageUrl(url);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      const el = rootRef.current;
      if (!el || cancelled) return;
      if (window.twttr?.ready) {
        window.twttr.ready(() => {
          if (!cancelled) window.twttr?.widgets.load(rootRef.current);
        });
      } else {
        window.twttr?.widgets.load(el);
      }
    };
    loadTwitterWidgetsScript()
      .then(() => {
        if (!cancelled) load();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [href]);

  return (
    <figure className="overflow-visible rounded-xl border border-black/[0.07] bg-white p-3 shadow-sm ring-1 ring-black/[0.04]">
      <div ref={rootRef} className="twitter-embed-root min-w-0">
        <blockquote className="twitter-tweet" data-dnt="true" data-theme="light">
          <a href={href}>View post on X</a>
        </blockquote>
      </div>
      {caption && (
        <figcaption className="mt-3 border-t border-black/5 px-1 pt-3 text-xs text-ink-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

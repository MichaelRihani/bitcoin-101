import { useRef, useState } from "react";
import { books, podcasts, posts, videoSectionSocial } from "../data/bioSiteResources";
import { conferences2026Sorted, curatedLinks, hardwareItems } from "../data/resourcesMore";
import { linkFaviconUrl, linkThumbnailUrl } from "../lib/linkPreview";
import { spotifyShowEmbedSrc, tweetIdFromStatusUrl } from "../lib/socialEmbeds";
import { publicUrl } from "../lib/publicUrl";
import { SectionTitle } from "./SectionTitle";
import { TwitterWidgetEmbed } from "./TwitterWidgetEmbed";

const BLANK_IMG =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function CuratedLinkThumb({ pageUrl, previewImageUrl }: { pageUrl: string; previewImageUrl?: string }) {
  const fav = linkFaviconUrl(pageUrl);
  const [src, setSrc] = useState(() => previewImageUrl ?? linkThumbnailUrl(pageUrl));
  const triedFav = useRef(false);
  return (
    <div className="relative h-[6.5rem] w-40 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-black/[0.06] sm:h-28 sm:w-44">
      <img
        src={src}
        alt=""
        className="h-full w-full object-contain object-top"
        loading="lazy"
        decoding="async"
        onError={() => {
          if (previewImageUrl && src === previewImageUrl && previewImageUrl.startsWith("http")) {
            setSrc(linkThumbnailUrl(pageUrl));
            return;
          }
          if (previewImageUrl === publicUrl("bitcoin.svg") && src === publicUrl("bitcoin.svg")) {
            if (fav) {
              triedFav.current = true;
              setSrc(fav);
              return;
            }
            setSrc(BLANK_IMG);
            return;
          }
          if (!triedFav.current && fav) {
            triedFav.current = true;
            setSrc(fav);
            return;
          }
          setSrc(BLANK_IMG);
        }}
      />
    </div>
  );
}

const tweetLinkClass =
  "flex gap-3 rounded-xl border border-black/[0.07] bg-white px-4 py-3 text-sm text-ink shadow-sm ring-1 ring-black/[0.04] transition hover:border-btc/30 hover:bg-btc-glow/30";

function TwitterOrLink({ url, caption }: { url: string; caption?: string }) {
  if (!tweetIdFromStatusUrl(url)) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={tweetLinkClass}>
        <span className="text-btc" aria-hidden>
          ↗
        </span>
        <span className="leading-snug">{caption ?? url}</span>
      </a>
    );
  }
  return <TwitterWidgetEmbed url={url} caption={caption} />;
}

function SpotifyShowEmbed({ title, spotifyUrl }: { title: string; spotifyUrl: string }) {
  const src = spotifyShowEmbedSrc(spotifyUrl);
  if (!src) {
    return (
      <a
        href={spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col justify-between rounded-xl border border-black/[0.07] p-5 shadow-sm ring-1 ring-black/[0.04] transition hover:border-btc/30"
      >
        <span className="text-lg font-semibold text-ink">{title}</span>
        <span className="mt-3 text-sm font-medium text-btc-deep">Open in Spotify →</span>
      </a>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-black/[0.07] bg-[#121212] shadow-sm ring-1 ring-black/[0.04]">
      <p className="border-b border-white/10 px-4 py-2.5 text-sm font-semibold text-white">{title}</p>
      <iframe
        title={title}
        src={src}
        width="100%"
        height={232}
        className="border-0"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
    </div>
  );
}

function cardClassName() {
  return "rounded-xl border border-black/[0.07] bg-white shadow-sm ring-1 ring-black/[0.04] transition hover:border-btc/25 hover:shadow-soft";
}

export function ResourcesSection() {
  return (
    <div className="space-y-20 md:space-y-24">
      <section id="resources-books" className="scroll-mt-28" aria-labelledby="books-heading">
        <SectionTitle id="books-heading" eyebrow="Read" title="Bitcoin books">
          <p>Prices match the original listing. Confirm with retailers before you buy.</p>
        </SectionTitle>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => (
            <a
              key={b.url}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col overflow-hidden ${cardClassName()}`}
            >
              <div className="aspect-[3/4] overflow-hidden bg-surface-soft">
                <img
                  src={b.thumbnailUrl}
                  alt={b.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-semibold text-ink group-hover:text-btc-deep">{b.title}</h3>
                {b.note && <p className="mt-1 text-xs text-ink-muted">{b.note}</p>}
                <span className="mt-auto pt-3 text-sm font-medium text-ink-muted">
                  From ${b.priceUsd.toFixed(2)} USD
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="resources-clips" className="scroll-mt-28" aria-labelledby="res-clips-heading">
        <SectionTitle id="res-clips-heading" eyebrow="Watch" title="Short clips">
          <p>For longer explainers, use the lesson videos above.</p>
        </SectionTitle>
        <div className="mt-8 grid max-w-5xl gap-8 sm:grid-cols-2">
          {videoSectionSocial.map((item) => (
            <TwitterOrLink key={item.url} url={item.url} caption={item.label} />
          ))}
        </div>
      </section>

      <section id="resources-posts" className="scroll-mt-28" aria-labelledby="posts-heading">
        <SectionTitle id="posts-heading" eyebrow="X (Twitter)" title="Bitcoin posts">
          <p>Threads and posts worth a slow read between lessons.</p>
        </SectionTitle>
        <div className="mt-8 grid max-w-5xl gap-8 sm:grid-cols-2">
          {posts.map((item) => (
            <TwitterOrLink key={item.url} url={item.url} caption={item.label} />
          ))}
        </div>
      </section>

      <section id="resources-links" className="scroll-mt-28" aria-labelledby="links-heading">
        <SectionTitle id="links-heading" eyebrow="Reference" title="Helpful links">
          <p>From the whitepaper to everyday tools.</p>
        </SectionTitle>
        <ul className="mt-8 space-y-4">
          {curatedLinks.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex gap-4 p-5 ${cardClassName()}`}
              >
                <CuratedLinkThumb pageUrl={item.url} previewImageUrl={item.previewImageUrl} />
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-btc-deep">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{item.description}</span>
                  <span className="mt-2 block truncate text-xs text-ink-faint">{item.url}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="resources-hardware" className="scroll-mt-28" aria-labelledby="hardware-heading">
        <SectionTitle id="hardware-heading" eyebrow="Security" title="Hardware">
          <p>Trusted wallets and a desk display. Check each manufacturer for current price.</p>
        </SectionTitle>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hardwareItems.map((h) => (
            <a
              key={h.url}
              href={h.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col overflow-hidden ${cardClassName()}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-surface-soft p-4">
                <img
                  src={h.imageSrc}
                  alt={h.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-contain transition group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-semibold text-ink group-hover:text-btc-deep">{h.name}</h3>
                <span className="mt-auto pt-3 text-sm font-medium text-ink-muted">{h.priceLabel}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="resources-conferences" className="scroll-mt-28" aria-labelledby="conferences-heading">
        <SectionTitle id="conferences-heading" eyebrow="Travel" title="Major Bitcoin conferences (2026)">
          <p>Soonest first. Check dates and venue on the official site.</p>
        </SectionTitle>
        <div className="mt-6 overflow-x-auto rounded-xl border border-black/[0.07] bg-white shadow-sm ring-1 ring-black/[0.04]">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-surface-soft/90">
                <th scope="col" className="px-4 py-3.5 font-semibold text-ink">
                  Conference
                </th>
                <th scope="col" className="whitespace-nowrap px-4 py-3.5 font-semibold text-ink">
                  Est. attendees
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-ink">
                  Dates (2026)
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-ink">
                  Location
                </th>
              </tr>
            </thead>
            <tbody>
              {conferences2026Sorted.map((row) => (
                <tr key={row.url + row.name} className="border-b border-black/[0.06] last:border-b-0">
                  <td className="align-top px-4 py-3.5 text-ink">
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-btc-deep underline decoration-btc/30 underline-offset-2 hover:text-btc"
                    >
                      {row.name}
                    </a>
                    {row.note && (
                      <span className="mt-1 block text-xs font-normal leading-snug text-ink-muted">{row.note}</span>
                    )}
                  </td>
                  <td className="align-top whitespace-nowrap px-4 py-3.5 tabular-nums text-ink-muted">
                    {row.attendeesEstimate != null ? `~${row.attendeesEstimate.toLocaleString("en-US")}` : "–"}
                  </td>
                  <td className="align-top px-4 py-3.5 text-ink-muted">{row.dates2026}</td>
                  <td className="align-top px-4 py-3.5 text-ink-muted">{row.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="resources-podcasts" className="scroll-mt-28" aria-labelledby="podcasts-heading">
        <SectionTitle id="podcasts-heading" eyebrow="Listen" title="Bitcoin podcasts">
          <p>Spotify players inline. No app switch.</p>
        </SectionTitle>
        <ul className="mx-auto mt-8 flex max-w-5xl flex-col gap-6">
          {podcasts.map((p) => (
            <li key={p.spotifyUrl} className="w-full">
              <SpotifyShowEmbed title={p.title} spotifyUrl={p.spotifyUrl} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

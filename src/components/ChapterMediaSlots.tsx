import type { MediaSlot } from "../data/chapters";

export function YoutubeEmbed({
  id,
  title,
  className,
  startSeconds,
}: {
  id: string;
  title: string;
  className?: string;
  startSeconds?: number;
}) {
  const src =
    startSeconds != null && Number.isFinite(startSeconds) && startSeconds > 0
      ? `https://www.youtube-nocookie.com/embed/${id}?start=${Math.floor(startSeconds)}`
      : `https://www.youtube-nocookie.com/embed/${id}`;
  return (
    <div className={`overflow-hidden rounded-2xl border border-black/5 bg-black shadow-sm ${className ?? ""}`}>
      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <p className="border-t border-white/10 bg-neutral-900 px-4 py-2 text-xs text-white/90">{title}</p>
    </div>
  );
}

function MediaSlotView({ slot }: { slot: MediaSlot }) {
  if (slot.kind === "image") {
    return (
      <figure className="overflow-hidden rounded-2xl border border-black/5 bg-surface-soft shadow-sm">
        <img src={slot.src} alt={slot.alt} className="aspect-video w-full object-cover" loading="lazy" />
        {slot.caption && (
          <figcaption className="border-t border-black/5 bg-white px-4 py-2 text-xs text-ink-muted">{slot.caption}</figcaption>
        )}
      </figure>
    );
  }
  if (slot.kind === "youtube") {
    return <YoutubeEmbed id={slot.id} title={slot.title} startSeconds={slot.startSeconds} />;
  }
  return null;
}

export function ChapterMediaSlots({ slots }: { slots: MediaSlot[] }) {
  if (slots.length === 0) return null;
  return (
    <div
      className={`mt-10 grid gap-6 ${slots.length === 1 ? "md:max-w-3xl" : "md:grid-cols-2"}`}
    >
      {slots.map((slot, i) => (
        <MediaSlotView key={i} slot={slot} />
      ))}
    </div>
  );
}

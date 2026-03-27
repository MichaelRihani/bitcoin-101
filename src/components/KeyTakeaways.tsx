export function KeyTakeaways({ id, items }: { id?: string; items: string[] }) {
  const headingId = id ?? "takeaways-heading";
  return (
    <aside
      className="my-8 rounded-2xl border border-btc/25 bg-gradient-to-br from-btc-glow to-white p-6 shadow-soft"
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="text-sm font-semibold uppercase tracking-wide text-btc-deep">
        At a glance
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((t) => (
          <li key={t} className="flex gap-3 text-ink">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-btc" aria-hidden />
            <span className="leading-relaxed">{t}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

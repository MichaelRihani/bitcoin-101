import type { ReactNode } from "react";

/** Doc-style section label inspired by readable Bitcoin documentation sites (clear hierarchy, scannable). */
export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">{children}</p>
  );
}

export function SectionTitle({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <h2
        id={id}
        className={`text-2xl font-semibold tracking-tight text-ink md:text-3xl ${eyebrow ? "mt-2" : ""}`}
      >
        {title}
      </h2>
      {children && <div className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">{children}</div>}
    </header>
  );
}

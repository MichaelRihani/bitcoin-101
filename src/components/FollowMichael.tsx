import { bioProfile } from "../data/bioSiteResources";

const followLinkClass =
  "rounded-full bg-surface-soft px-4 py-2 font-medium text-ink transition hover:bg-btc-glow";

export function FollowMichael() {
  return (
    <section
      id="resources-follow"
      className="scroll-mt-28 pb-12 md:pb-16"
      aria-labelledby="follow-michael-heading"
    >
      <header className="max-w-3xl">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">Connect</p>
        <h2 id="follow-michael-heading" className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Follow Michael
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
          Michael put this page together. Writing and projects live here.
        </p>
      </header>
      <div className="mt-8 flex flex-col gap-6 rounded-xl border border-black/[0.07] bg-white p-6 shadow-sm ring-1 ring-black/[0.04] md:flex-row md:items-center">
        <img
          src={bioProfile.imageUrl}
          alt={bioProfile.name}
          width={96}
          height={96}
          className="h-24 w-24 shrink-0 rounded-2xl object-cover ring-2 ring-btc/20"
        />
        <div>
          <h3 className="text-xl font-semibold text-ink">{bioProfile.name}</h3>
          <p className="mt-1 text-ink-muted">{bioProfile.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href={bioProfile.linkedInUrl} target="_blank" rel="noopener noreferrer" className={followLinkClass}>
              LinkedIn
            </a>
            <a href={bioProfile.xUrl} target="_blank" rel="noopener noreferrer" className={followLinkClass}>
              X (Twitter)
            </a>
            <a href={bioProfile.githubUrl} target="_blank" rel="noopener noreferrer" className={followLinkClass}>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

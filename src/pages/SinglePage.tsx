import { useEffect, useState } from "react";
import { chapters, sectionIdForChapter, type Chapter } from "../data/chapters";
import { KeyTakeaways } from "../components/KeyTakeaways";
import { BlockchainDiagram } from "../components/diagrams/BlockchainDiagram";
import { TransactionFlowDiagram } from "../components/diagrams/TransactionFlowDiagram";
import { ChapterMediaSlots, YoutubeEmbed } from "../components/ChapterMediaSlots";
import { FollowMichael } from "../components/FollowMichael";
import { ResourcesSection } from "../components/ResourcesSection";
import { SectionTitle } from "../components/SectionTitle";
import { BitcoinLogo } from "../components/BitcoinLogo";
import { SatoshiConverter } from "../components/SatoshiConverter";
import { useActiveSection, scrollToSection, SECTION_SCROLL_OFFSET_PX } from "../hooks/useActiveSection";

/** Resource + bottom sections (after lessons). Order must match DOM. */
const RESOURCE_SECTION_IDS = [
  "resources-books",
  "resources-clips",
  "resources-posts",
  "resources-links",
  "resources-hardware",
  "resources-conferences",
  "resources-podcasts",
  "converter",
  "resources-follow",
] as const;

const RESOURCE_NAV_LABEL: Record<string, string> = {
  "resources-books": "Books",
  "resources-clips": "Clips",
  "resources-posts": "Posts",
  "resources-links": "Links",
  "resources-hardware": "Hardware",
  "resources-conferences": "Conferences",
  "resources-podcasts": "Podcasts",
  converter: "BTC Converter",
  "resources-follow": "Follow Michael",
};

const NAV_LABEL: Record<string, string> = {
  money: "Money",
  "what-is-bitcoin": "What is Bitcoin?",
  technology: "How it works",
  wallets: "Wallets",
  using: "Using Bitcoin",
};

/** Shorter labels on small screens (horizontal nav) to reduce overflow. */
const NAV_SHORT_LABEL: Partial<Record<string, string>> = {
  "what-is-bitcoin": "What is BTC?",
  using: "Using BTC",
};

const WHITEPAPER_PDF = "https://bitcoin.org/bitcoin.pdf";

function BasicsParagraph({ chapterId, paragraph, index }: { chapterId: string; paragraph: string; index: number }) {
  if (chapterId === "what-is-bitcoin" && index === 0) {
    const parts = paragraph.split("whitepaper");
    if (parts.length === 2) {
      return (
        <p className="text-base leading-relaxed text-ink">
          {parts[0]}
          <a
            href={WHITEPAPER_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-btc-deep underline decoration-btc/30 underline-offset-2 hover:text-btc"
          >
            whitepaper
          </a>
          {parts[1]}
        </p>
      );
    }
  }
  return <p className="text-base leading-relaxed text-ink">{paragraph}</p>;
}

function ChapterSection({ chapter }: { chapter: Chapter }) {
  const sid = sectionIdForChapter(chapter.id);
  return (
    <section
      id={sid}
      className="scroll-mt-28 border-b border-black/5 py-16 last:border-b-0"
      aria-labelledby={`${sid}-title`}
    >
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-btc-deep">Learn</p>
      <h2 id={`${sid}-title`} className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {chapter.title}
      </h2>
      <p className="mt-4 text-lg text-ink-muted">{chapter.subtitle}</p>

      <KeyTakeaways id={`${sid}-takeaways`} items={chapter.takeaways} />

      <div className="mt-10">
        <h3 className="text-xs font-bold uppercase tracking-widest text-ink-faint">Basics</h3>
        <div className="mt-4 space-y-4">
          {chapter.basics.map((p, i) => (
            <BasicsParagraph key={`${chapter.id}-basic-${i}`} chapterId={chapter.id} paragraph={p} index={i} />
          ))}
        </div>
      </div>

      <ChapterMediaSlots slots={chapter.mediaSlots} />

      {chapter.id === "technology" && (
        <div className="mt-12 space-y-10">
          <BlockchainDiagram />
          <TransactionFlowDiagram />
        </div>
      )}

      {chapter.infographic && (
        <figure className="mt-12 overflow-hidden rounded-2xl border border-btc/20 bg-gradient-to-br from-btc-glow to-white p-8 shadow-soft">
          <h3 className="text-lg font-semibold text-ink">{chapter.infographic.title}</h3>
          <ul className="mt-6 space-y-3">
            {chapter.infographic.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-ink">
                <span className="font-semibold text-btc">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </figure>
      )}
    </section>
  );
}

export function SinglePage() {
  const sectionIds = ["intro", ...chapters.map((c) => sectionIdForChapter(c.id)), ...RESOURCE_SECTION_IDS];
  const scrollActiveId = useActiveSection(sectionIds, SECTION_SCROLL_OFFSET_PX);
  /** Immediate feedback when clicking nav; cleared once scroll-spy matches (avoids “stuck on Intro” during smooth scroll). */
  const [navOverrideId, setNavOverrideId] = useState<string | null>(null);

  useEffect(() => {
    if (navOverrideId != null && scrollActiveId === navOverrideId) {
      setNavOverrideId(null);
    }
  }, [navOverrideId, scrollActiveId]);

  const activeId = navOverrideId ?? scrollActiveId;

  return (
    <div className="lg:flex lg:gap-8 xl:gap-10">
      <nav
        className="min-w-0 shrink-0 lg:sticky lg:top-24 lg:z-10 lg:h-[calc(100vh-7rem)] lg:w-56 lg:overflow-x-visible lg:overflow-y-auto"
        aria-label="Page sections"
      >
        <div className="scrollbar-thin mb-8 flex gap-1 overflow-x-auto px-1 pb-2 pt-0.5 sm:px-0 lg:mb-0 lg:flex-col lg:gap-0.5 lg:overflow-x-visible lg:overflow-y-auto lg:px-2 lg:pb-10">
          <NavPill
            label="Intro"
            targetId="intro"
            active={activeId === "intro"}
            onNavigate={setNavOverrideId}
          />
          {chapters.map((c) => {
            const id = sectionIdForChapter(c.id);
            return (
              <NavPill
                key={c.id}
                label={NAV_LABEL[c.id] ?? c.title}
                shortLabel={NAV_SHORT_LABEL[c.id]}
                targetId={id}
                active={activeId === id}
                onNavigate={setNavOverrideId}
              />
            );
          })}
          {RESOURCE_SECTION_IDS.map((id) => (
            <NavPill
              key={id}
              label={RESOURCE_NAV_LABEL[id] ?? id}
              shortLabel={id === "converter" ? "Converter" : undefined}
              targetId={id}
              active={activeId === id}
              onNavigate={setNavOverrideId}
            />
          ))}
        </div>
      </nav>

      <div className="min-w-0 flex-1">
        <section id="intro" className="scroll-mt-28 pb-16">
          <YoutubeEmbed
            className="mb-8 md:mb-10"
            id="BL5vUVQvmX4"
            title="What is Bitcoin? Explained in 3 Minutes"
          />
          <div className="relative overflow-hidden rounded-3xl border border-black/[0.06] bg-gradient-to-b from-white via-surface-soft to-btc-glow/35 px-6 py-14 shadow-sm ring-1 ring-black/[0.04] md:px-14 md:py-20">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-btc/[0.09] blur-3xl"
              aria-hidden
            />
            <div className="relative flex max-w-2xl flex-col gap-6">
              <div className="flex items-center gap-4">
                <BitcoinLogo className="h-14 w-14 shrink-0 md:h-16 md:w-16" />
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-btc-deep">Bitcoin 101</p>
                  <h1 className="text-balance text-3xl font-semibold tracking-tight text-ink md:text-5xl">
                    Bitcoin. Crystal clear.
                  </h1>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-ink-muted">
                Short lessons that teach Bitcoin from scratch, plus curated books, clips, posts, podcasts, and links. No
                background required.
              </p>
              <p className="text-lg leading-relaxed text-ink-muted">
                After the lessons, you’ll find hardware picks, conferences, a live BTC converter, and a way to follow
                Michael.
              </p>
              <p className="text-sm text-ink-faint">
                For learning only. Not financial, legal, or tax advice.
              </p>
            </div>
          </div>
        </section>

        {chapters.map((c) => (
          <ChapterSection key={c.id} chapter={c} />
        ))}

        <div className="border-t border-black/[0.06] py-16 md:py-20">
          <ResourcesSection />
        </div>

        <section id="converter" className="scroll-mt-28 border-t border-black/[0.06] py-16 md:py-20" aria-labelledby="converter-heading">
          <SectionTitle id="converter-heading" eyebrow="Tools" title="BTC Converter">
            <p>See how USD, BTC, bits, and satoshis line up. Rates use a live BTC/USD feed.</p>
          </SectionTitle>
          <div className="mt-8 max-w-2xl">
            <SatoshiConverter showPageTitle={false} />
          </div>
        </section>

        <div className="border-t border-black/[0.06] pt-16 md:pt-20 pb-8 md:pb-12">
          <FollowMichael />
        </div>
      </div>
    </div>
  );
}

function NavPill({
  label,
  shortLabel,
  targetId,
  active,
  onNavigate,
}: {
  label: string;
  shortLabel?: string;
  targetId: string;
  active: boolean;
  onNavigate: (id: string) => void;
}) {
  const activeRing =
    active
      ? "bg-btc text-white shadow-sm lg:bg-btc-glow lg:text-btc-deep lg:ring-1 lg:ring-btc/30"
      : "bg-surface-soft text-ink-muted hover:bg-black/5 hover:text-ink lg:bg-transparent";
  return (
    <button
      type="button"
      onClick={() => {
        onNavigate(targetId);
        scrollToSection(targetId);
      }}
      className={`whitespace-nowrap rounded-full px-3 py-2 text-left text-xs font-medium transition sm:px-4 sm:text-sm lg:w-full lg:rounded-xl lg:px-3 lg:py-2.5 ${activeRing}`}
    >
      {shortLabel ? (
        <>
          <span className="sm:hidden">{shortLabel}</span>
          <span className="hidden sm:inline">{label}</span>
        </>
      ) : (
        label
      )}
    </button>
  );
}

import { useEffect, useState } from "react";

/** Matches Tailwind `scroll-mt-28` (7rem) on section anchors. Keep in sync. */
export const SECTION_SCROLL_OFFSET_PX = 112;

/** Document Y position of element top (offsetTop is wrong inside nested layouts). */
function elementDocumentTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY;
}

/**
 * Which section is currently “current” while scrolling (for nav highlight).
 * Uses getBoundingClientRect so nested sections don’t report a wrong offsetTop.
 * The active line sits below the sticky header and partway down the viewport so tall
 * sections (e.g. a long table) don’t keep the previous nav item highlighted after the
 * next section is already on screen.
 */
export function useActiveSection(sectionIds: string[], headerOffsetPx = SECTION_SCROLL_OFFSET_PX) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollBottom = window.scrollY + window.innerHeight;
      const lastId = sectionIds[sectionIds.length - 1] ?? "";
      /** Near the bottom of the page, highlight the last nav item. */
      const atDocumentBottom = scrollBottom >= doc.scrollHeight - 8;
      if (atDocumentBottom && lastId) {
        setActiveId(lastId);
        return;
      }

      const vh = window.innerHeight;
      const belowHeader = Math.max(0, vh - headerOffsetPx);
      const activeLineY = window.scrollY + headerOffsetPx + belowHeader * 0.28;
      let current = sectionIds[0] ?? "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (elementDocumentTop(el) <= activeLineY) current = id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds.join("|"), headerOffsetPx]);

  return activeId;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scroll so the section’s top sits `SECTION_SCROLL_OFFSET_PX` below the viewport top (same as scroll-mt-28). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_OFFSET_PX;
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
  window.scrollTo({ top: Math.max(0, top), behavior });
}

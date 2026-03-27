import { type ReactNode } from "react";
import { LivePrice } from "./LivePrice";
import { BitcoinLogo } from "./BitcoinLogo";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#intro"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to intro
      </a>
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/85 backdrop-blur-xl supports-[backdrop-filter]:bg-white/75">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <a href="#intro" className="flex shrink-0 items-center gap-3 text-ink">
            <BitcoinLogo className="h-9 w-9 shrink-0" />
            <span className="font-semibold tracking-tight">Bitcoin 101</span>
          </a>
          <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">
            <LivePrice />
          </div>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-8 md:px-6 md:pb-16">
        {children}
      </main>
      <footer className="border-t border-black/5 bg-white py-10">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-sm leading-relaxed text-ink-muted">
            For learning only. Not financial, legal, or tax advice.
          </p>
          <p className="mt-4 text-xs text-ink-faint">
            Built by Bitcoiners, for you. Don&apos;t trust. Verify.
          </p>
          <p className="mt-6">
            <a
              href="#intro"
              className="text-sm font-medium text-btc-deep underline decoration-btc/30 underline-offset-2 transition hover:text-btc"
            >
              Back to top
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

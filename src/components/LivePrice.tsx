import { useEffect, useState } from "react";
import { useBtcMarketSnapshot } from "../hooks/useBtcUsdPrice";

const usdCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 2,
});

const usdFull = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function fmtMillions(btc: number): string {
  return `${(btc / 1_000_000).toFixed(2)}M`;
}

export function LivePrice() {
  const { usd, marketCapUsd, circulatingBtc, maxBtc, supplyPct, error } = useBtcMarketSnapshot();
  const [updated, setUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (usd != null) setUpdated(new Date());
  }, [usd]);

  const priceStr =
    usd != null
      ? usd >= 1000
        ? usdFull.format(usd)
        : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(usd)
      : error ?? "…";

  const mcapStr =
    marketCapUsd != null && Number.isFinite(marketCapUsd) ? usdCompact.format(marketCapUsd) : null;

  const supplyStr =
    circulatingBtc != null &&
    maxBtc != null &&
    supplyPct != null &&
    Number.isFinite(circulatingBtc) &&
    Number.isFinite(maxBtc) &&
    Number.isFinite(supplyPct)
      ? `${fmtMillions(circulatingBtc)} / ${fmtMillions(maxBtc)} (${supplyPct.toFixed(1)}%)`
      : null;

  return (
    <div
      className="flex flex-col gap-1 rounded-lg bg-white/80 px-3 py-2 text-xs shadow-sm ring-1 ring-black/5 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2 sm:gap-y-1 sm:rounded-full sm:px-4 sm:py-2 sm:text-sm"
      role="status"
      aria-live="polite"
      aria-label={`Bitcoin spot ${priceStr}. Market cap ${mcapStr ?? "unavailable"}. ${supplyStr ? `Supply ${supplyStr}.` : ""}`}
    >
      <span className="text-ink-muted">
        <span className="font-medium">BTC</span> <span className="tabular-nums text-ink">{priceStr}</span>
      </span>
      <span className="hidden text-ink-faint sm:inline" aria-hidden>
        ·
      </span>
      <span className="flex flex-wrap items-baseline gap-1.5">
        <span className="font-medium text-ink-muted">Market cap</span>
        <span className="tabular-nums text-ink">{mcapStr ?? "–"}</span>
      </span>
      {supplyStr && (
        <>
          <span className="hidden text-ink-faint sm:inline" aria-hidden>
            ·
          </span>
          <span className="text-ink-muted">
            <span className="font-medium">Supply</span> <span className="tabular-nums text-ink">{supplyStr}</span>
          </span>
        </>
      )}
      {updated && <span className="text-[0.65rem] text-ink-faint sm:text-xs">Updated {updated.toLocaleTimeString()}</span>}
    </div>
  );
}

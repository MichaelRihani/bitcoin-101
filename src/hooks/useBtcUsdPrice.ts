import { useEffect, useState } from "react";
import { fetchBtcSnapshot, fetchBtcUsd, type BtcMarketSnapshot } from "../lib/coingeckoPrice";

/** Full BTC/USD + market cap + supply (CoinGecko). Shared fetch cache in `coingeckoPrice`. */
export function useBtcMarketSnapshot() {
  const [snapshot, setSnapshot] = useState<BtcMarketSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const s = await fetchBtcSnapshot();
        if (!cancelled) {
          setSnapshot(s);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setSnapshot(null);
          setError("Price unavailable");
        }
      }
    }
    load();
    const id = window.setInterval(load, 90_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return {
    usd: snapshot?.usd ?? null,
    marketCapUsd: snapshot?.marketCapUsd ?? null,
    circulatingBtc: snapshot?.circulatingBtc ?? null,
    maxBtc: snapshot?.maxBtc ?? null,
    supplyPct: snapshot?.supplyPct ?? null,
    error,
  };
}

/** Shared spot price for BTC/USD (converter, etc.). */
export function useBtcUsdPrice() {
  const [usd, setUsd] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const p = await fetchBtcUsd();
        if (!cancelled) {
          setUsd(p);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setUsd(null);
          setError("Price unavailable");
        }
      }
    }
    load();
    const id = window.setInterval(load, 90_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return { usd, error };
}

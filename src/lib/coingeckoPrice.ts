/** Client-side cache so multiple components / intervals do not spam the network. */
const CLIENT_TTL_MS = 90_000;

const DEFAULT_MAX_BTC = 21_000_000;

export type BtcMarketSnapshot = {
  usd: number;
  marketCapUsd: number | null;
  circulatingBtc: number | null;
  maxBtc: number;
  /** (circulating / max) × 100 */
  supplyPct: number | null;
};

let cache: { data: BtcMarketSnapshot; at: number } | null = null;

const COIN_URLS = [
  "/api/coingecko/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false",
  "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false",
] as const;

const SIMPLE_PRICE_URLS = [
  "/api/coingecko/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
] as const;

type CoinGeckoCoin = {
  market_data?: {
    current_price?: { usd?: number };
    market_cap?: { usd?: number };
    circulating_supply?: number;
    max_supply?: number;
  };
};

function parseCoinJson(data: unknown): BtcMarketSnapshot | null {
  const d = data as CoinGeckoCoin;
  const md = d.market_data;
  const usd = md?.current_price?.usd;
  if (typeof usd !== "number" || !Number.isFinite(usd)) return null;

  const mcap = md?.market_cap?.usd;
  const circ = md?.circulating_supply;
  const maxBtc =
    typeof md?.max_supply === "number" && Number.isFinite(md.max_supply) && md.max_supply > 0
      ? md.max_supply
      : DEFAULT_MAX_BTC;

  let supplyPct: number | null = null;
  if (typeof circ === "number" && circ >= 0 && maxBtc > 0) {
    supplyPct = Math.min(100, (circ / maxBtc) * 100);
  }

  return {
    usd,
    marketCapUsd: typeof mcap === "number" && Number.isFinite(mcap) ? mcap : null,
    circulatingBtc: typeof circ === "number" && Number.isFinite(circ) ? circ : null,
    maxBtc,
    supplyPct,
  };
}

async function fetchSimpleUsdOnly(): Promise<number> {
  for (const url of SIMPLE_PRICE_URLS) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = (await res.json()) as { bitcoin?: { usd?: number } };
      const p = data.bitcoin?.usd;
      if (typeof p === "number") return p;
    } catch {
      // try next
    }
  }
  throw new Error("unavailable");
}

export async function fetchBtcSnapshot(): Promise<BtcMarketSnapshot> {
  const now = Date.now();
  if (cache && now - cache.at < CLIENT_TTL_MS) {
    return cache.data;
  }

  for (const url of COIN_URLS) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const json: unknown = await res.json();
      const parsed = parseCoinJson(json);
      if (parsed) {
        cache = { data: parsed, at: Date.now() };
        return parsed;
      }
    } catch {
      // try next URL
    }
  }

  const usd = await fetchSimpleUsdOnly();
  const fallback: BtcMarketSnapshot = {
    usd,
    marketCapUsd: null,
    circulatingBtc: null,
    maxBtc: DEFAULT_MAX_BTC,
    supplyPct: null,
  };
  cache = { data: fallback, at: Date.now() };
  return fallback;
}

export async function fetchBtcUsd(): Promise<number> {
  const s = await fetchBtcSnapshot();
  return s.usd;
}

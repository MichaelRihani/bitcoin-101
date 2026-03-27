/**
 * Curated links, hardware, conferences. Conference figures are approximate; confirm on official sites.
 */

import { publicUrl } from "../lib/publicUrl";

export type CuratedLink = {
  title: string;
  url: string;
  description: string;
  /** Lower = higher in the list (more popular / essential first). */
  popularity: number;
  /** Optional sharp logo/preview URL when generic screenshots look blurry. */
  previewImageUrl?: string;
};

const curatedLinksUnsorted: CuratedLink[] = [
  {
    title: "Bitcoin whitepaper",
    url: "https://bitcoin.org/bitcoin.pdf",
    description: "Where it started: peer-to-peer electronic cash without a trusted third party.",
    popularity: 1,
  },
  {
    title: "mempool.space",
    url: "https://mempool.space/",
    description: "Live mempool, blocks, fees, and mining. See congestion and why fees move.",
    popularity: 2,
  },
  {
    title: "River Learn",
    url: "https://river.com/learn/",
    description: "Plain articles on basics, security, mining, and Lightning. Good for onboarding.",
    popularity: 3,
  },
  {
    title: "Clark Moody Bitcoin Dashboard",
    url: "https://bitcoin.clarkmoody.com/dashboard/",
    description: "Price, depth, mempool, and network stats in one dashboard.",
    popularity: 4,
  },
  {
    title: "The Bullish Case for Bitcoin (essay)",
    url: "https://vijayboyapati.medium.com/the-bullish-case-for-bitcoin-6ecc8bdecc1",
    description: "Long-form case for Bitcoin as money: history, gold, and common pushback.",
    popularity: 5,
  },
  {
    title: "Hope.com",
    url: "https://www.hope.com/",
    description: "Bitcoin as digital property. Treasury and institutional framing.",
    popularity: 6,
    previewImageUrl: publicUrl("bitcoin.svg"),
  },
  {
    title: "Gradually, Then Suddenly (blog series)",
    url: "https://unchained-capital.com/blog/category/gradually-then-suddenly/",
    description: "Essays on money and fiat. Deep ideas, readable prose.",
    popularity: 7,
  },
  {
    title: "Bitcoin Design Guide",
    url: "https://bitcoin.design/",
    description: "Open UX patterns for wallets and apps. Safer, clearer products.",
    popularity: 8,
  },
];

/** Helpful links sorted by popularity / importance (best first). */
export const curatedLinks = [...curatedLinksUnsorted].sort((a, b) => a.popularity - b.popularity);

export type HardwareItem = {
  name: string;
  url: string;
  /** Retail-style label; check the manufacturer for current pricing. */
  priceLabel: string;
  imageSrc: string;
  imageAlt: string;
};

export const hardwareItems: HardwareItem[] = [
  {
    name: "Bitkey",
    url: "https://bitkey.world/",
    priceLabel: "From ~$150 USD",
    imageSrc: publicUrl("hardware/bitkey.webp"),
    imageAlt: "Bitkey hardware wallet device",
  },
  {
    name: "Trezor",
    url: "https://trezor.io/",
    priceLabel: "From ~$179 USD (model varies)",
    imageSrc: publicUrl("hardware/trezor.svg"),
    imageAlt: "Trezor hardware wallet (illustration)",
  },
  {
    name: "Ledger",
    url: "https://www.ledger.com/",
    priceLabel: "From ~$179 USD (model varies)",
    imageSrc: publicUrl("hardware/ledger.png"),
    imageAlt: "Ledger hardware wallet device",
  },
  {
    name: "BLOCKCLOCK mini",
    url: "https://blockclockmini.com/",
    priceLabel: "From ~$399 USD",
    imageSrc: publicUrl("hardware/blockclock-mini.png"),
    imageAlt: "BLOCKCLOCK mini Bitcoin display",
  },
];

export type ConferenceRow = {
  name: string;
  dates2026: string;
  location: string;
  url: string;
  attendeesEstimate: number | null;
  /** Start of event (UTC) for chronological sorting. */
  sortStartMs: number;
  note?: string;
};

const conferences2026Raw: ConferenceRow[] = [
  {
    name: "Adopting Bitcoin · Cape Town",
    dates2026: "Jan 30–31, 2026",
    location: "Cape Town, South Africa",
    url: "https://za26.adoptingbitcoin.org/",
    attendeesEstimate: 1_200,
    sortStartMs: Date.UTC(2026, 0, 30, 12, 0, 0),
    note: "Southern Africa adoption focus; attendance is an estimate.",
  },
  {
    name: "Bit Block Boom!",
    dates2026: "Apr 9–12, 2026",
    location: "Fort Worth, TX, USA",
    url: "https://bitblockboom.com/",
    attendeesEstimate: 2_000,
    sortStartMs: Date.UTC(2026, 3, 9, 12, 0, 0),
    note: "Long-running U.S. maximalist conference; attendance is an estimate.",
  },
  {
    name: "Bitcoin Africa Conference",
    dates2026: "Apr 17–19, 2026",
    location: "Ouagadougou, Burkina Faso",
    url: "https://www.afriquebitcoin.org/en",
    attendeesEstimate: 3_000,
    sortStartMs: Date.UTC(2026, 3, 17, 12, 0, 0),
    note: "Pan‑African Bitcoin conference; size is an estimate.",
  },
  {
    name: "Bitcoin 2026 (Bitcoin Conference)",
    dates2026: "Apr 27–29, 2026",
    location: "Las Vegas, NV, USA",
    url: "https://2026.b.tc/",
    attendeesEstimate: 40_000,
    sortStartMs: Date.UTC(2026, 3, 27, 12, 0, 0),
    note: "Organizer press has cited ~40k+ capacity targets. Verify on site.",
  },
  {
    name: "Unconfiscatable",
    dates2026: "Apr 27, 2026",
    location: "Las Vegas, NV, USA",
    url: "https://unconfiscatable.com/",
    attendeesEstimate: 450,
    sortStartMs: Date.UTC(2026, 3, 27, 18, 0, 0),
    note: "Curated, capped attendance (~450 in past marketing). Verify.",
  },
  {
    name: "Adopting Bitcoin · Nairobi",
    dates2026: "Jun 24–26, 2026",
    location: "Nairobi, Kenya",
    url: "https://ke26.adoptingbitcoin.org/",
    attendeesEstimate: 1_800,
    sortStartMs: Date.UTC(2026, 5, 24, 12, 0, 0),
    note: "East Africa builders’ edition; attendance is an estimate.",
  },
  {
    name: "bitcoin++ (typical single-city edition)",
    dates2026: "Multiple 2026",
    location: "Americas, Europe, Africa (varies)",
    url: "https://btcplusplus.dev/",
    attendeesEstimate: 600,
    sortStartMs: Date.UTC(2026, 6, 1, 12, 0, 0),
    note: "Developer series with several editions per year. Figure is per typical city, not cumulative.",
  },
  {
    name: "TABConf (TABConf 8)",
    dates2026: "Oct 12–15, 2026",
    location: "Atlanta, GA, USA",
    url: "https://tabconf.com/",
    attendeesEstimate: 900,
    sortStartMs: Date.UTC(2026, 9, 12, 12, 0, 0),
    note: "Technical, developer-heavy; smaller by design. Estimate.",
  },
  {
    name: "Bitcoin Amsterdam",
    dates2026: "Nov 5–6, 2026",
    location: "Halfweg (Amsterdam area), Netherlands",
    url: "https://www.bitcoin.amsterdam/2026",
    attendeesEstimate: 8_000,
    sortStartMs: Date.UTC(2026, 10, 5, 12, 0, 0),
    note: "Major European Bitcoin-only conference; size is an estimate.",
  },
  {
    name: "Adopting Bitcoin · El Salvador",
    dates2026: "2026 TBA (2025: Nov 14–15)",
    location: "San Salvador, El Salvador",
    url: "https://www.adoptingbitcoin.org/",
    attendeesEstimate: 3_500,
    sortStartMs: Date.UTC(2026, 10, 15, 12, 0, 0),
    note: "Flagship regional conference; 2026 dates TBA. Confirm when published.",
  },
  {
    name: "Africa Bitcoin Conference (ABC)",
    dates2026: "Dec 2–5, 2026",
    location: "Blantyre, Malawi",
    url: "https://afrobitcoin.org/",
    attendeesEstimate: 4_000,
    sortStartMs: Date.UTC(2026, 11, 2, 12, 0, 0),
    note: "Described as Africa’s largest Bitcoin gathering; attendance is an estimate.",
  },
];

function sortByStartDate(rows: ConferenceRow[]): ConferenceRow[] {
  return [...rows].sort((a, b) => a.sortStartMs - b.sortStartMs);
}

/** Conferences sorted soonest first. */
export const conferences2026Sorted = sortByStartDate(conferences2026Raw);

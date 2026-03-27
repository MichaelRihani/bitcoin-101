/**
 * Curated media from Michael Rihani’s link-in-bio page.
 * Primary source: https://bio.site/bitcoin21
 */

/** Primary source for curated lists: https://bio.site/bitcoin21 */

export const bioProfile = {
  name: "Michael Rihani",
  tagline: "Bitcoin & Blockchain @ Nubank | ex-Tesla, Apple Pay, Coinbase",
  imageUrl: "https://media.bio.site/sites/5ba51d1d-5725-4235-ad8b-9064dc3857d1/e7kEDgo6rDz9nst39HMyxL.jpg",
  xUrl: "https://x.com/michaelrihani",
  linkedInUrl: "https://www.linkedin.com/in/michaelrihani/",
  githubUrl: "https://github.com/michaelrihani",
};

export type BookItem = {
  title: string;
  url: string;
  thumbnailUrl: string;
  priceUsd: number;
  note?: string;
};

export const books: BookItem[] = [
  {
    title: "The Bullish Case for Bitcoin",
    url: "https://www.bullishcaseforbitcoin.com/",
    thumbnailUrl:
      "https://media.bio.site/sites/5ba51d1d-5725-4235-ad8b-9064dc3857d1/drafts/xDY7babqJKBdhzNQVMjHh3.png",
    priceUsd: 21,
    note: "Popular essay-turned-book on the case for BTC.",
  },
  {
    title: "The Bitcoin Standard",
    url: "https://www.amazon.com/dp/1119473861/",
    thumbnailUrl:
      "https://media.bio.site/sites/5ba51d1d-5725-4235-ad8b-9064dc3857d1/drafts/TSmJMad2fwrqVsAvqJTevT.jpg",
    priceUsd: 22,
  },
  {
    title: "Broken Money",
    url: "https://www.amazon.com/dp/B0CG8985FR",
    thumbnailUrl:
      "https://media.bio.site/sites/5ba51d1d-5725-4235-ad8b-9064dc3857d1/drafts/JK6ccaNEwK7ihuceFnuVuX.jpg",
    priceUsd: 21,
  },
  {
    title: "The Price of Tomorrow",
    url: "https://www.amazon.com/Price-Tomorrow-Deflation-Abundant-Future/dp/1999257405",
    thumbnailUrl:
      "https://media.bio.site/sites/5ba51d1d-5725-4235-ad8b-9064dc3857d1/drafts/UXYAMtd2vqVCApP9rJBVNQ.jpg",
    priceUsd: 15,
  },
  {
    title: "The Sovereign Individual",
    url: "https://www.amazon.com/Sovereign-Individual-Mastering-Transition-Information/dp/0684832720",
    thumbnailUrl:
      "https://media.bio.site/sites/5ba51d1d-5725-4235-ad8b-9064dc3857d1/drafts/s3xCjWUuTJC7J7T8K7GTF3.jpg",
    priceUsd: 13,
  },
  {
    title: "Bitcoin Money (Kids)",
    url: "https://www.amazon.com/Bitcoin-Money-Tale-Bitville-Discovering/dp/0578490676",
    thumbnailUrl:
      "https://media.bio.site/sites/5ba51d1d-5725-4235-ad8b-9064dc3857d1/drafts/FL3xnuV5hsnrtTeKxzFhUm.jpg",
    priceUsd: 9,
    note: "Intro for younger readers.",
  },
];

export type SocialLink = { label: string; url: string };

/** Short X video clips. */
export const videoSectionSocial: SocialLink[] = [
  {
    label: "The reason bitcoin is magical · Michael Saylor (~2 min)",
    url: "https://twitter.com/DocumentingBTC/status/1500165031912161281",
  },
  {
    label: "Steve Wozniak on why to invest in bitcoin vs. other coins",
    url: "https://twitter.com/pete_rizzo_/status/1502258231602733059",
  },
  { label: "Joe Rogan on Bitcoin", url: "https://x.com/arshmolu/status/1612830387100651524" },
  { label: "Tahini’s (Canada) on Bitcoin", url: "https://x.com/TheRealTahinis/status/1488208618549915648" },
];

export const posts: SocialLink[] = [
  { label: "BlackRock: bitcoin as best-performing asset", url: "https://x.com/0xgaut/status/1745441498496115191" },
  {
    label: "Bitcoin to banks as email to USPS",
    url: "https://x.com/BTCBreakdown/status/1844893499470020835",
  },
  { label: "Bitcoin bigger than banks", url: "https://x.com/BoldBitcoin/status/1849994423574167983" },
  { label: "Apple added bitcoin symbols", url: "https://x.com/DocumentingBTC/status/1875692853244108862" },
  { label: "Bitcoin price every 4 years", url: "https://x.com/Kurt_Kokain/status/1881345478966845527" },
  { label: "Bitcoin $100,000", url: "https://x.com/brian_armstrong/status/1864510348856053858" },
  {
    label: "Brian Armstrong: a billion people by 2030",
    url: "https://x.com/brian_armstrong/status/1888822443873325247",
  },
  { label: "Bitcoin at a Warriors game", url: "https://x.com/andr3w/status/1857666141109498052" },
  { label: "Trump at PubKey", url: "https://x.com/PubKey/status/1836510708634390680" },
  { label: "BTC vs. USD", url: "https://x.com/BitcoinMagazine/status/1782050550399324609" },
  { label: "Hayek: “sly, roundabout way”", url: "https://x.com/FAHayekSays/status/1864730944126570974" },
  { label: "Elon on Bitcoin", url: "https://x.com/S_S_BSC/status/1418087777510457344" },
  { label: "Jack: hyperinflation", url: "https://x.com/jack/status/1451733913961783299" },
  { label: "Jack: hyperinflation in the US", url: "https://x.com/jack/status/1451735753117999104" },
  { label: "Jack: in it to fix the money", url: "https://x.com/jack/status/1426000451074408450" },
];

export type PodcastItem = { title: string; spotifyUrl: string };

export const podcasts: PodcastItem[] = [
  { title: "Bitcoin Fundamentals", spotifyUrl: "https://open.spotify.com/show/28RHOkXkuHuotUrkCdvlOP" },
  { title: "The Peter McCormack Show", spotifyUrl: "https://open.spotify.com/show/0mWUJuONiilW5JSBBFZ0s7" },
  { title: "What Bitcoin Did", spotifyUrl: "https://open.spotify.com/show/18Pixm6jNMATYXSO6cUnTH" },
  { title: "The Bitcoin Standard (podcast)", spotifyUrl: "https://open.spotify.com/show/691nFDIWWmhFFAz7xp3wAr" },
  { title: "Coin Stories", spotifyUrl: "https://open.spotify.com/show/0YOEwxAR1uIx1a15QpqE0l" },
  { title: "The Bitcoin Layer", spotifyUrl: "https://open.spotify.com/show/69AABOXxSynCpfFzwIYK9v" },
  { title: "Bitcoin Magazine", spotifyUrl: "https://open.spotify.com/show/1IxBiqXrUwWUgwiQwKWwxk" },
];

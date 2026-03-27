export type MediaSlot =
  | { kind: "image"; src: string; alt: string; caption?: string }
  | { kind: "youtube"; id: string; title: string; startSeconds?: number };

export type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  takeaways: string[];
  basics: string[];
  /** Media embeds (YouTube, images). Omit empty placeholders; only list real slots. */
  mediaSlots: MediaSlot[];
  infographic?: { title: string; bullets: string[] };
};

export const chapters: Chapter[] = [
  {
    id: "money",
    title: "Money and why it matters",
    subtitle: "What money does, how it keeps changing, and where Bitcoin fits in.",
    takeaways: [
      "Money does three jobs: trade, pricing, and saving. No form of money does all three perfectly.",
      "What counts as money has shifted for thousands of years: salt, stones, shells, metal, paper, and mostly digits today.",
      "Bitcoin proposes fixed rules in software: predictable issuance, no company printing past the cap. Whether that helps people everywhere is something each person has to weigh.",
    ],
    basics: [
      "You might picture coins and notes, but money has taken many forms: salt, stones, seashells, metal, paper, and entries on bank ledgers. Useful money is easy to recognize, split, move, and scarce enough that it holds value.",
      "Today most money is digital. Banks and central banks run the plumbing for cards, payroll, and credit. Policy can change supply and borrowing costs; savings don’t always keep pace with prices.",
      "When people talk about inflation, they mean the same dollars buying less over time. How much is “too much” is debated; the trade-off is familiar: flexibility today versus knowing what savings will buy tomorrow.",
      "Bitcoin is another chapter in a long story: open software, shared rules, and no single issuer who can change the supply. People argue about many things, including whether it can make value easier to move across borders and whether open networks can lead to fairer access over time. This site doesn’t promise outcomes; it explains how the system is designed.",
    ],
    mediaSlots: [
      {
        kind: "youtube",
        id: "QN8u4UAa0GY",
        title: "What is money? (video explainer)",
      },
      {
        kind: "youtube",
        id: "czEPG75wzPI",
        title: "The History of Money",
      },
    ],
    infographic: {
      title: "Three jobs of money",
      bullets: [
        "Medium of exchange: people accept it for goods and services",
        "Unit of account: prices are quoted in it",
        "Store of value: savings keep purchasing power over time",
      ],
    },
  },
  {
    id: "what-is-bitcoin",
    title: "What is Bitcoin?",
    subtitle: "Digital money, the network behind it, and how it differs from cash in your pocket.",
    takeaways: [
      "Bitcoin (capital B) is the network; bitcoin (BTC) is the asset you send, spend, or save. It is entirely digital.",
      "A blockchain is a shared record: many computers check the same rules so transactions can settle without a bank in the middle.",
      "You can hold keys yourself: no application from a bank, and no CEO who can flip a switch on “your” bitcoin the way a bank can freeze an account.",
      "Scarcity is built in: about 21 million BTC, ever. Code enforces it, not a board vote.",
    ],
    basics: [
      "Satoshi Nakamoto’s whitepaper described “A Peer-to-Peer Electronic Cash System.” Software nodes follow the same rules, so payments can settle without a trusted middleman. No bank has to sign off.",
      "BTC is 100% digital. You use a wallet to send and receive; after a transaction confirms, there is no chargeback in the traditional sense. Finality is a feature: get the address right.",
      "People use bitcoin to send value across distances, to save for the long term, or to spend where it is accepted. You interact through the internet, on your own schedule. What you can do still depends on local law and who will accept it.",
      "People say “Bitcoin” for the project and “bitcoin” or BTC for the asset, like “email” (the system) and “an email” (one message). Bitcoin is one specific protocol with a long history; it isn’t shorthand for every other token people call “crypto.”",
    ],
    mediaSlots: [
      {
        kind: "youtube",
        id: "5JDrK7sP3gA",
        title: "What is Bitcoin? (video explainer)",
        startSeconds: 17,
      },
    ],
    infographic: {
      title: "Network vs. asset",
      bullets: ["Bitcoin = open protocol + people who run it", "BTC = the units the protocol tracks (up to ~21 million)"],
    },
  },
  {
    id: "technology",
    title: "How Bitcoin works",
    subtitle: "The Bitcoin network, the blockchain, and why changing the past is hard.",
    takeaways: [
      "The Bitcoin network is a digital system: nodes share a single rulebook for valid transactions and blocks.",
      "The blockchain is a chain of blocks: each block links to the one before. Many machines re-check the history so one player can’t quietly rewrite it.",
      "Miners compete to publish the next block; fees and new coins pay for that work. About every four years, the new-coin reward halves.",
    ],
    basics: [
      "Transactions are broadcast and wait in the mempool. Miners bundle them into a block that references the previous block’s fingerprint. That’s the chain: a public, ordered record of transfers.",
      "Proof-of-work means miners spend energy to find a hash that satisfies the rules. Rewriting old blocks is expensive because an attacker would have to redo the work faster than the rest of the network.",
      "Cryptography secures ownership: private keys prove you can spend, and the protocol uses math (hashes, signatures) so rules are enforced in code, not by someone’s discretion.",
      "Anyone can run a full node to verify every rule, without mining. That’s how users stay independent of any single company’s servers.",
      "Energy use comes up a lot. Mining is a competitive industry that often chases cheap or stranded power. Whether that trade-off is worth it is a values question; the energy is paying for security and for ordering transactions.",
    ],
    mediaSlots: [],
  },
  {
    id: "wallets",
    title: "Wallets, keys, and staying safe",
    subtitle: "Keys control the coins. Everything else is convenience or risk.",
    takeaways: [
      "A seed phrase is a master backup. Anyone with it can spend your bitcoin.",
      "Custodial accounts are simpler. Self-custody gives you control and full responsibility.",
      "Lightning can make small payments faster and cheaper; it’s still maturing for everyday casual use.",
    ],
    basics: [
      "A wallet stores private keys: the secret that proves you can spend. You share a public address to receive; you never share the secret.",
      "A seed phrase (often 12 or 24 words) backs up those keys. No phrase and no other backup usually means no recovery.",
      "Hardware wallets keep keys offline. Phone and desktop wallets are “hot”: convenient, but more exposed to malware and phishing.",
      "Scams are common: fake support, fake apps, “send bitcoin to verify” requests. No one legitimate needs your seed phrase or remote control of your wallet. If something feels urgent, stop and verify.",
    ],
    mediaSlots: [],
  },
  {
    id: "using",
    title: "Using and getting bitcoin",
    subtitle: "Buying, sending, fees, and why some people value the asset.",
    takeaways: [
      "On-chain sends are irreversible. Double-check the address and amount.",
      "Fees go up when many people transact at once; time of day and week can matter.",
      "There will only ever be about 21 million BTC. That fixed cap is why some people compare bitcoin to scarce commodities and think in years, not days.",
      "People use bitcoin for savings, remittances, and payments, depending on country and law. Price is volatile; nothing here is investment advice.",
    ],
    basics: [
      "Sending BTC means broadcasting a transaction to the network. Miners include it in a block; more blocks after yours generally mean stronger finality.",
      "You might buy on a regulated exchange, earn it, or use a Bitcoin ATM where legal. Home mining is rarely profitable for individuals. Most people get BTC by buying or earning.",
      "Some people treat bitcoin as a long-term position in a technology they believe will keep changing how the world moves and stores value. Others use small amounts to learn. Price moves a lot compared to many national currencies. Neither approach is “correct.” It depends on goals and risk tolerance.",
      "Tax and reporting rules vary by country. This site doesn’t give tax or legal advice. If you’re unsure, ask a professional in your jurisdiction.",
    ],
    mediaSlots: [],
  },
];

export function sectionIdForChapter(chapterId: string): string {
  return `chapter-${chapterId}`;
}

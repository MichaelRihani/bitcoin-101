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
    subtitle: "What money does, how today’s money works, and where Bitcoin fits in.",
    takeaways: [
      "Money does three jobs: trade, pricing, and saving. No form of money does all three perfectly.",
      "Most money today is digital. Policy can change supply and borrowing costs; savings don’t always keep pace.",
      "Bitcoin’s rules are fixed in code: no company, predictable issuance, nothing past the cap.",
    ],
    basics: [
      "People have used shells, metal, coins, and paper for thousands of years. Useful money is easy to recognize, split, move, and scarce enough that it holds value.",
      "Today, most money is entries on ledgers at banks and central banks. That works for cards, payroll, and credit. The amount of money and the cost of borrowing can still change with policy, crises, and time.",
      "When people talk about inflation, they mean the same dollars buying less over time. How much is “too much” is debated; the trade-off is familiar: flexibility today versus knowing what savings will buy tomorrow.",
      "Bitcoin is a different idea: shared rules, software anyone can run, a known supply schedule, and no single issuer who can change the rules.",
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
    subtitle: "The network, the asset, and the ideas that started it.",
    takeaways: [
      "Bitcoin (capital B) is the network; bitcoin (BTC) is units tracked on that network.",
      "You don’t need permission to use the protocol. No one has to approve an account.",
      "Scarcity is built in: about 21 million BTC, ever. Code enforces it, not a board vote.",
    ],
    basics: [
      "Satoshi Nakamoto’s whitepaper described “A Peer-to-Peer Electronic Cash System.” Software nodes follow the same rules, so payments can settle without a trusted middleman. No bank has to sign off.",
      "You send BTC to a Bitcoin address. After a transaction is confirmed, there is no chargeback in the traditional sense. Finality is a feature: get the address right.",
      "People say “Bitcoin” for the project and “bitcoin” or BTC for the asset, like “email” (the system) and “an email” (one message).",
      "Bitcoin is often lumped in with “crypto.” For beginners, the useful split is simple: Bitcoin is one protocol with a long history and open development, focused on decentralized money. It isn’t a stand-in for every other token.",
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
    subtitle: "Blocks, transactions, mining, and why changing the past is hard.",
    takeaways: [
      "The blockchain is a public chain of blocks. Each block links to the one before it.",
      "Miners compete to publish the next block; fees and new coins pay for that work.",
      "About every four years, the new-coin reward halves. Over time, fees carry most of the security budget.",
    ],
    basics: [
      "Transactions are broadcast to the network and wait in the mempool. Miners bundle them into a block that references the previous block’s fingerprint. That’s the chain.",
      "Proof-of-work means miners spend energy to find a hash that satisfies the rules. Rewriting old blocks is expensive because an attacker would have to redo the work faster than the rest of the network.",
      "Anyone can run a full node to verify every rule, without mining. That’s how users stay off any single company’s servers.",
      "Energy use comes up a lot. Mining is a competitive industry that often chases cheap or stranded power. Whether that trade-off is worth it is a values question; the energy is paying for security and for ordering transactions.",
    ],
    mediaSlots: [
      {
        kind: "youtube",
        id: "xLYYh4aPXAM",
        title: "Bitcoin is protecting human rights around the world",
      },
    ],
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
    subtitle: "Buying, sending, fees, and what to expect in the real world.",
    takeaways: [
      "On-chain sends are irreversible. Double-check the address and amount.",
      "Fees go up when many people transact at once; time of day and week can matter.",
      "People use bitcoin for savings, remittances, and payments, depending on country and law.",
    ],
    basics: [
      "Sending BTC means broadcasting a transaction to the network. Miners include it in a block; more blocks after yours generally mean stronger finality.",
      "You might buy on a regulated exchange, earn it, or use a Bitcoin ATM where legal. Home mining is rarely profitable for individuals. Most people get BTC by buying or earning.",
      "Price moves a lot compared to many national currencies. Some people hold long-term; others use small amounts to learn. Neither is “correct.” It depends on goals and risk tolerance.",
      "Tax and reporting rules vary by country. This site doesn’t give tax or legal advice. If you’re unsure, ask a professional in your jurisdiction.",
    ],
    mediaSlots: [],
  },
];

export function sectionIdForChapter(chapterId: string): string {
  return `chapter-${chapterId}`;
}

export function TransactionFlowDiagram() {
  const steps = [
    { x: 32, title: "Wallet signs", sub: "private key" },
    { x: 182, title: "Broadcast", sub: "mempool" },
    { x: 332, title: "Miner adds", sub: "new block" },
    { x: 482, title: "Confirmations", sub: "more blocks" },
  ];
  return (
    <figure
      className="rounded-2xl border border-black/5 bg-white p-6 shadow-soft"
      aria-label="Diagram of a bitcoin transaction flow"
    >
      <svg viewBox="0 0 640 200" className="h-auto w-full max-w-3xl mx-auto" role="img">
        <title>Transaction flow from wallet to confirmations</title>
        <defs>
          <marker id="txArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="#1d1d1f" />
          </marker>
        </defs>
        {steps.map((step) => (
          <g key={step.title} transform={`translate(${step.x}, 44)`}>
            <rect width="126" height="68" rx="12" fill="#ffffff" stroke="#e5e5ea" strokeWidth="1" />
            <text x="63" y="28" textAnchor="middle" className="fill-ink text-[11px] font-semibold">
              {step.title}
            </text>
            <text x="63" y="48" textAnchor="middle" className="fill-btc text-[10px]">
              {step.sub}
            </text>
          </g>
        ))}
        <line x1="158" y1="78" x2="172" y2="78" stroke="#1d1d1f" strokeWidth="1.5" markerEnd="url(#txArrow)" />
        <line x1="308" y1="78" x2="322" y2="78" stroke="#1d1d1f" strokeWidth="1.5" markerEnd="url(#txArrow)" />
        <line x1="458" y1="78" x2="472" y2="78" stroke="#1d1d1f" strokeWidth="1.5" markerEnd="url(#txArrow)" />
        <text x="320" y="168" textAnchor="middle" className="fill-ink-muted text-xs">
          Fees help miners pick what fits in the next block.
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-ink-muted">
        Sketch only. Real flows add relay, validation, and fee markets.
      </figcaption>
    </figure>
  );
}

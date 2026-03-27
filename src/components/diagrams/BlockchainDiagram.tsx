export function BlockchainDiagram() {
  return (
    <figure
      className="rounded-2xl border border-black/5 bg-white p-6 shadow-soft"
      aria-label="Diagram of blocks chained together"
    >
      <svg viewBox="0 0 560 200" className="h-auto w-full max-w-2xl mx-auto" role="img">
        <title>Blockchain: each block links to the previous</title>
        <defs>
          <linearGradient id="blockGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff4e8" />
            <stop offset="100%" stopColor="#fde8d0" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.12" />
          </filter>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#1d1d1f" />
          </marker>
        </defs>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${40 + i * 170}, 40)`}>
            <rect
              width="140"
              height="100"
              rx="14"
              fill="url(#blockGrad)"
              stroke="#f7931a"
              strokeWidth="2"
              filter="url(#softShadow)"
            />
            <text x="70" y="38" textAnchor="middle" className="fill-ink text-sm font-semibold">
              Block {i + 100}
            </text>
            <text x="70" y="62" textAnchor="middle" className="fill-ink-muted text-xs">
              transactions…
            </text>
            <text x="70" y="84" textAnchor="middle" className="fill-ink-faint text-[10px] font-mono">
              hash: …a3f{i}9c
            </text>
            {i > 0 && (
              <path
                d="M -30 50 L 0 50"
                stroke="#1d1d1f"
                strokeWidth="2"
                strokeLinecap="round"
                markerEnd="url(#arrowhead)"
              />
            )}
          </g>
        ))}
        <text x="280" y="175" textAnchor="middle" className="fill-ink-muted text-xs">
          Each block points back. Change the past and you redo the work.
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-ink-muted">
        Simplified. Real blocks add Merkle roots, timestamps, and more.
      </figcaption>
    </figure>
  );
}

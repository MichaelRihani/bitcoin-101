/** Wikipedia “Bitcoin” logo (File:Bitcoin.svg). Orange ₿ mark. */
export function BitcoinLogo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <img
      src="/bitcoin.svg"
      alt=""
      width={64}
      height={64}
      className={className}
      decoding="async"
    />
  );
}

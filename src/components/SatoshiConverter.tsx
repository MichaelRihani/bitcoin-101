import { useEffect, useRef, useState, type ReactNode } from "react";
import { useBtcUsdPrice } from "../hooks/useBtcUsdPrice";

const SATS_PER_BTC = 100_000_000;
/** 1 bit (μBTC) = 100 satoshis. */
const SATS_PER_BIT = 100;

type Field = "usd" | "btc" | "bits" | "sats";

function parseNum(s: string): number | null {
  const t = s.replace(/[$,]/g, "").trim();
  if (t === "" || t === ".") return null;
  const n = Number(t);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

function formatFromBtc(
  field: Field,
  btc: number,
  btcUsd: number | null,
): string {
  switch (field) {
    case "usd":
      return btcUsd != null ? (btc * btcUsd).toFixed(2) : "";
    case "btc":
      return btc.toFixed(8);
    case "bits":
      return (Math.round(btc * SATS_PER_BTC) / SATS_PER_BIT).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    case "sats":
      return Math.round(btc * SATS_PER_BTC).toLocaleString("en-US");
  }
}

function btcFromField(field: Field, text: string, btcUsd: number | null): number | null {
  const n = parseNum(text);
  if (n === null) return null;
  switch (field) {
    case "usd":
      return btcUsd != null ? n / btcUsd : null;
    case "btc":
      return n;
    case "bits":
      return (n * SATS_PER_BIT) / SATS_PER_BTC;
    case "sats":
      return n / SATS_PER_BTC;
    default:
      return null;
  }
}

export function SatoshiConverter({ showPageTitle = true }: { showPageTitle?: boolean }) {
  const { usd: btcUsd, error: priceError } = useBtcUsdPrice();
  const initialized = useRef(false);
  const [btc, setBtc] = useState<number | null>(null);
  /** While set, that field shows raw `text` so partial input (e.g. "0.") is not overwritten. */
  const [edit, setEdit] = useState<{ field: Field; text: string } | null>(null);

  useEffect(() => {
    if (btcUsd != null && !initialized.current) {
      setBtc(1 / btcUsd);
      initialized.current = true;
    }
  }, [btcUsd]);

  function display(field: Field): string {
    if (edit?.field === field) return edit.text;
    if (btc == null) return "";
    return formatFromBtc(field, btc, btcUsd);
  }

  function handleFocus(field: Field) {
    if (btc == null) return;
    setEdit({ field, text: formatFromBtc(field, btc, btcUsd) });
  }

  function handleChange(field: Field, text: string) {
    setEdit({ field, text });
    const next = btcFromField(field, text, btcUsd);
    if (next !== null) setBtc(next);
  }

  function handleBlur() {
    setEdit(null);
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-soft md:p-8">
      {showPageTitle && (
        <>
          <h2 className="text-xl font-semibold text-violet-700 md:text-2xl">BTC, bits, and satoshis</h2>
          <p className="mt-2 text-ink">Edit any field. The rest update.</p>
        </>
      )}
      {priceError && <p className={`text-xs text-amber-700 ${showPageTitle ? "mt-2" : ""}`}>{priceError}</p>}

      <div className={`flex flex-col gap-4 ${showPageTitle ? "mt-8" : "mt-0"}`}>
        <ConverterRow
          label="USD"
          icon={<UsdIcon />}
          iconClass="bg-emerald-500"
          inputMode="decimal"
          value={display("usd")}
          onFocus={() => handleFocus("usd")}
          onChange={(e) => handleChange("usd", e.target.value)}
          onBlur={handleBlur}
          disabled={btcUsd == null || btc == null}
        />
        <ConverterRow
          label="BTC"
          icon={<BtcGlyph />}
          iconClass="bg-btc"
          inputMode="decimal"
          value={display("btc")}
          onFocus={() => handleFocus("btc")}
          onChange={(e) => handleChange("btc", e.target.value)}
          onBlur={handleBlur}
          disabled={btc == null}
        />
        <ConverterRow
          label="BITS"
          icon={<BitsIcon />}
          iconClass="bg-violet-600"
          inputMode="decimal"
          value={display("bits")}
          onFocus={() => handleFocus("bits")}
          onChange={(e) => handleChange("bits", e.target.value)}
          onBlur={handleBlur}
          disabled={btc == null}
        />
        <ConverterRow
          label="SATS"
          icon={<SatsIcon />}
          iconClass="bg-neutral-800"
          inputMode="decimal"
          value={display("sats")}
          onFocus={() => handleFocus("sats")}
          onChange={(e) => handleChange("sats", e.target.value)}
          onBlur={handleBlur}
          disabled={btc == null}
        />
      </div>

      <div className="mt-6 flex gap-3 rounded-xl bg-violet-50/80 p-4 text-sm leading-relaxed text-ink-muted">
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white"
          aria-hidden
        >
          i
        </span>
        <p>
          One bitcoin is 100 million satoshis; bits are a handy middle unit. Rates use live BTC/USD.
        </p>
      </div>
    </div>
  );
}

function ConverterRow({
  label,
  icon,
  iconClass,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled,
  inputMode,
}: {
  label: string;
  icon: ReactNode;
  iconClass: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  disabled?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-3 py-2.5 shadow-sm ring-1 ring-black/[0.03]">
      <input
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        className="min-w-0 flex-1 border-0 bg-transparent text-left text-lg font-bold tabular-nums text-ink outline-none placeholder:text-ink-faint disabled:opacity-50 sm:text-xl"
        aria-label={label}
        autoComplete="off"
      />
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-sm font-medium leading-none text-ink-muted">{label}</span>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${iconClass}`}
          aria-hidden
        >
          {icon}
        </span>
      </div>
    </div>
  );
}

function UsdIcon() {
  return <span className="text-lg">$</span>;
}
function BtcGlyph() {
  return <span className="text-lg font-sans">₿</span>;
}
function BitsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M4 8h16M4 12h16M4 16h10" strokeLinecap="round" />
    </svg>
  );
}
function SatsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 7h14M5 12h14M5 17h14" strokeLinecap="round" />
    </svg>
  );
}

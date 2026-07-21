import { Chapter } from "./Chapter";

const MID = 176.4;
const PRICE = (MID * 1.001) / (1 - 0.0002); // half-spread on the mid, fee off the quote side

const fmt = (n: number, d = 2) =>
  n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

const LINES = [
  {
    op: "",
    term: "mid",
    figure: `${fmt(MID)} USDG`,
    note: "The guarded Chainlink price. Zero, stale or implausible rounds halt the market instead of pricing it.",
  },
  {
    op: "+",
    term: "spread × regime",
    figure: "10.0 bps × 1.0",
    note: "The tier's half-spread, 10 bps for Tier A, times the session multiplier: ×1.0 open, ×1.5 extended, ×3.0 closed.",
  },
  {
    op: "±",
    term: "skew",
    figure: "+0 bps",
    note: "A vault off its 50/50 inventory target quotes tighter on the side that rebalances it, up to ±15 bps.",
  },
  {
    op: "+",
    term: "fee",
    figure: "2.0 bps",
    note: "Shown as its own line on the ticket and recorded in the fill event. Never inside the curve.",
  },
] as const;

const GUARANTEES = [
  {
    title: "The chain re-derives it",
    body: "The router recomputes the vault quote from oracle and vault state inside your transaction, so a front end cannot route you to a worse price than the formula's.",
  },
  {
    title: "Makers must beat it",
    body: "Signed RFQ quotes from attested makers settle only when they pay you more than the vault. Losing costs them nothing, which keeps them quoting.",
  },
  {
    title: "Worse means revert",
    body: "Your slippage bound and deadline travel with the signature. If state moves past them before inclusion, the swap reverts rather than fills.",
  },
] as const;

export function PricingLedger() {
  return (
    <Chapter
      id="pricing"
      no="01"
      title="One formula, published in full"
      kicker="Every quote on MirageFi is the same arithmetic over public state. Anyone can reproduce any price from on-chain inputs."
    >
      <div className="border-t border-mf-ink">
        {LINES.map((l) => (
          <div
            key={l.term}
            className="grid gap-x-8 gap-y-2 border-b border-mf-line py-5 md:grid-cols-[32px_180px_1fr_160px] md:items-baseline"
          >
            <span className="hidden font-heading text-[26px] leading-none text-mf-faint md:block">{l.op}</span>
            <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-mf-ink">
              <span className="mr-2 text-mf-faint md:hidden">{l.op}</span>
              {l.term}
            </span>
            <p className="text-[14.5px] leading-relaxed text-mf-muted">{l.note}</p>
            <span className="font-mono text-[13px] text-mf-ink md:text-right">{l.figure}</span>
          </div>
        ))}
        <div className="grid gap-x-8 gap-y-2 border-b border-mf-ink py-6 md:grid-cols-[32px_180px_1fr_160px] md:items-baseline">
          <span className="hidden font-heading text-[26px] leading-none text-mf-ink md:block">=</span>
          <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-mf-blue">
            <span className="mr-2 md:hidden">=</span>your price
          </span>
          <p className="text-[14.5px] leading-relaxed text-mf-slate">
            Bounded by a hard band: nothing settles more than 75 bps from the mid, whatever goes wrong upstream.
          </p>
          <span className="font-heading text-[30px] leading-none text-mf-ink md:text-right">{fmt(PRICE)}</span>
        </div>
      </div>

      <ol className="mt-12 grid gap-8 md:grid-cols-3">
        {GUARANTEES.map((g, i) => (
          <li key={g.title}>
            <span className="label">Guarantee 0{i + 1}</span>
            <h3 className="mt-3 font-heading text-[22px] leading-tight text-mf-ink">{g.title}</h3>
            <p className="mt-2.5 text-[14px] leading-relaxed text-mf-muted">{g.body}</p>
          </li>
        ))}
      </ol>
    </Chapter>
  );
}

import { Chapter } from "./Chapter";

const LANES = [
  {
    name: "Anchor vaults",
    does: "Quote both sides of every market around the guarded Chainlink mid, with the spread set by tier, session and inventory. Standard size fills here, instantly.",
    gets: "A formula price you can recompute, and LP revenue that is the market's real cost of immediacy rather than the residue after arbitrage.",
  },
  {
    name: "RFQ makers",
    does: "Attested market makers receive block-size requests off-chain and answer with signed quotes. They pay nothing to quote and win only by beating the vault.",
    gets: "Size that would walk a curve goes to competition instead, settled atomically against the maker's own wallet through a standing Permit2 allowance.",
  },
  {
    name: "The router",
    does: "One entry point. Checks eligibility, checks the band, prices the vault path and any RFQ quote, and settles whichever pays you more.",
    gets: "Token-to-token swaps run as two legs through USDG in the same transaction. If either leg cannot clear inside its guards, both revert.",
  },
] as const;

const FIGURES = [
  { v: "75 bps", k: "The hard bound", s: "The Tier A oracle band. No fill settles further from the guarded mid, from a vault or a maker, under any parameters." },
  { v: "2 bps", k: "The whole fee", s: "Itemised on the ticket, recorded in the fill event, plus 10% of the vault's realised spread. Nothing hidden inside a curve." },
  { v: "None", k: "Custody", s: "Assets sit in your wallet or in LP-owned vaults. Settlement is atomic; there is nothing at the venue to lose." },
] as const;

const SEATS = [
  { who: "Traders", what: "Swap 24/7 at itemised prices, with the session on the face of the ticket." },
  { who: "Liquidity providers", what: "Fund a vault, earn the spread. Withdrawal is in kind and works in every state, halted or paused, even with an expired attestation." },
  { who: "Market makers", what: "Quote for free off-chain, win only by beating the vault, settle atomically." },
] as const;

export function VenueLanes() {
  return (
    <Chapter
      id="venue"
      no="03"
      title="Two venues behind one router"
      kicker="Standard size fills against oracle-anchored vaults. Block size goes to professional makers through signed quotes. The router settles whichever pays you more."
    >
      <div className="hidden grid-cols-[180px_1fr_1fr] gap-8 pb-3 md:grid">
        <span className="label">Lane</span>
        <span className="label">What it does</span>
        <span className="label">What you get</span>
      </div>
      <div className="border-t border-mf-ink">
        {LANES.map((l) => (
          <div key={l.name} className="grid gap-3 border-b border-mf-line py-6 md:grid-cols-[180px_1fr_1fr] md:gap-8">
            <h3 className="font-heading text-[26px] italic leading-tight text-mf-ink">{l.name}</h3>
            <p className="text-[14.5px] leading-relaxed text-mf-slate">{l.does}</p>
            <p className="text-[14.5px] leading-relaxed text-mf-muted">{l.gets}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-px border border-mf-line bg-mf-line sm:grid-cols-3">
        {FIGURES.map((f) => (
          <div key={f.k} className="bg-mf-paper p-6">
            <p className="font-heading text-[56px] leading-none text-mf-blue">{f.v}</p>
            <p className="label mt-4">{f.k}</p>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-mf-muted">{f.s}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <span className="label">Three seats</span>
        <ul className="mt-3 border-t border-mf-line">
          {SEATS.map((s) => (
            <li key={s.who} className="grid gap-1 border-b border-mf-line py-4 sm:grid-cols-[180px_1fr] sm:gap-8">
              <span className="font-heading text-[19px] text-mf-ink">{s.who}</span>
              <span className="text-[14.5px] leading-relaxed text-mf-muted">{s.what}</span>
            </li>
          ))}
        </ul>
      </div>
    </Chapter>
  );
}

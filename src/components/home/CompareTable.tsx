import { Chapter } from "./Chapter";

const ROWS = [
  { what: "Price", them: "Discovered from the pool's own reserves", us: "Anchored to the Chainlink mid, bounded by a hard band" },
  { what: "Weekends", them: "Saturday quoted as if it were Tuesday", us: "Closed sessions widen spreads and shrink clips, on the ticket" },
  { what: "LP returns", them: "Arbitraged on every reference-price move", us: "The spread; skew pays the market to rebalance them" },
  { what: "Splits", them: "Break the pool or force a migration", us: "Halt the market, resume on the adjusted feed" },
  { what: "Size", them: "Walks the curve and pays for it", us: "Goes to competing makers through signed RFQ quotes" },
  { what: "Fees", them: "Folded invisibly into the curve", us: "Itemised on the quote and recorded in the fill event" },
] as const;

export function CompareTable() {
  return (
    <Chapter
      id="compare"
      no="04"
      title="Generic pools price RWAs like memecoins"
      kicker="Constant-product pools suit crypto-native pairs and fail assets whose authoritative price lives on an exchange. The 2025 launch dislocations, where thin pools quoted tokenized stocks at large premiums, were this difference playing out in public."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-mf-ink">
              <th scope="col" className="label pb-3 pr-6 font-normal">Property</th>
              <th scope="col" className="label pb-3 pr-6 font-normal">A generic pool</th>
              <th scope="col" className="label pb-3 font-normal text-mf-blue">MirageFi</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.what} className="border-b border-mf-line align-top">
                <th scope="row" className="py-5 pr-6 font-heading text-[19px] font-normal leading-tight text-mf-ink">{r.what}</th>
                <td className="py-5 pr-6 text-[14.5px] leading-relaxed text-mf-faint">{r.them}</td>
                <td className="py-5 text-[14.5px] leading-relaxed text-mf-slate">{r.us}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 max-w-2xl text-[13.5px] leading-relaxed text-mf-faint">
        Complementary, not adversarial: arbitrageurs keeping generic pools in line with anchored quotes are
        welcome flow, and skew pricing pays them to rebalance the vaults while they do it.
      </p>
    </Chapter>
  );
}

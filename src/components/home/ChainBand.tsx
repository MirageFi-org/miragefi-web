const SPECS = [
  { label: "Network", value: "Robinhood Chain · ID 4663" },
  { label: "Stack", value: "Arbitrum Nitro, EVM-equivalent" },
  { label: "Settlement", value: "Ethereum, blob data availability" },
  { label: "Block time", value: "~250 ms · 100 ms preconfirms" },
  { label: "Median transaction", value: "~$0.001, gas in ETH" },
  { label: "Assets", value: "2,000+ Stock Tokens, ERC-20" },
  { label: "Issuer", value: "Robinhood Assets (Jersey) Ltd, 1:1 backed" },
  { label: "Corporate actions", value: "ERC-8056 uiMultiplier()" },
  { label: "Oracles", value: "Chainlink Feeds + Streams with market status" },
  { label: "Quote asset", value: "USDG (Paxos), MiCA-regulated, native" },
  { label: "Accounts", value: "ERC-4337 + EIP-7702, sponsored first swap" },
  { label: "Explorer", value: "Blockscout, every fill linked" },
] as const;

const REASONS = [
  "Plain ERC-20 stocks mean no issuer allowlisting stands between a wallet and a swap.",
  "The oracle carries the session flag the regime engine runs on, from the same source that prices the fill.",
  "Sub-cent transactions keep small swaps economic and quotes fresh at a hundred milliseconds.",
] as const;

/** Night in the desert: the one dark band on the page, for the chain the venue is built on. */
export function ChainBand() {
  return (
    <section id="chain" className="scroll-mt-16 bg-mf-night text-mf-cloud">
      <div className="page">
        <div className="grid gap-10 py-24 lg:grid-cols-[300px_1fr] lg:gap-12 lg:py-32">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <span className="numeral block text-[72px] text-mf-dune/60 md:text-[88px]">05</span>
            <h2 className="mt-5 max-w-[11ch] font-heading text-[34px] leading-[1.04] text-mf-paper md:text-[38px]">
              Built where the assets already live
            </h2>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-mf-sand/80">
              Robinhood Chain is the only network where a regulated broker issues tokenized equities as
              ordinary ERC-20s, with Chainlink feeds, permissionless deployment and the broker&apos;s own
              distribution behind them.
            </p>
          </div>

          <div className="min-w-0">
            <div className="flex items-baseline justify-between border-b border-mf-paper/60 pb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mf-sand/80">Datasheet</span>
              <span className="font-mono text-[11px] text-mf-sand/60">mainnet · 1 Jul 2026</span>
            </div>
            <dl className="grid md:grid-cols-2 md:gap-x-12">
              {SPECS.map((s) => (
                <div key={s.label} className="flex items-baseline border-b border-mf-paper/15 py-3 font-mono text-[12.5px]">
                  <dt className="shrink-0 text-mf-sand/70">{s.label}</dt>
                  <span className="mx-3 mb-1 flex-1 border-b border-dotted border-mf-paper/25" aria-hidden="true" />
                  <dd className="shrink-0 text-right text-mf-paper">{s.value}</dd>
                </div>
              ))}
            </dl>

            <ol className="mt-12 grid gap-8 md:grid-cols-3">
              {REASONS.map((r, i) => (
                <li key={r} className="border-t border-mf-teal-bright/60 pt-4">
                  <span className="font-mono text-[11px] text-mf-teal-bright">0{i + 1}</span>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-mf-sand/90">{r}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

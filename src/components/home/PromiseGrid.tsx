import { Chapter } from "./Chapter";

const ENTRIES = [
  { title: "Every fill is itemised on-chain", body: "The fill event carries mid, spread, skew and fee, matching the ticket.", check: "any fill on Blockscout against its receipt" },
  { title: "No fill outside the band", body: "A contract invariant, not a policy, on the vault path and RFQ alike.", check: "the public invariant suite" },
  { title: "Execution quality, unfiltered", body: "Every fill's distance from the mid, published live and downloadable raw.", check: "recompute it from chain events" },
  { title: "No payment for order flow", body: "The router settles the best verifiable price, per fill, on-chain.", check: "re-derive any fill's venue comparison" },
  { title: "No custody, ever", body: "Atomic settlement; vault inventory belongs to LPs, not the venue.", check: "the audits attest there is no such function" },
  { title: "Withdrawals unconditional", body: "In every vault state, with every pause active. Exits cannot be gated.", check: "halt-state withdrawals in the explorer" },
  { title: "Timelocked, published changes", body: "Every parameter change is scheduled with its rationale before it executes.", check: "the governance log, complete from block one" },
  { title: "Open source, verified bytecode", body: "The deployed code is the audited code, asserted in CI on every release.", check: "reproduce the build against the tag" },
] as const;

export function PromiseGrid() {
  return (
    <Chapter
      id="ledger"
      no="06"
      title="Eight promises, each with a verification path"
      kicker="Transparency claims are cheap; commitments are checkable. If any entry here ever fails verification, that is an incident, handled as one, with a public post-mortem."
    >
      <ol className="grid gap-px border border-mf-line bg-mf-line sm:grid-cols-2 xl:grid-cols-4">
        {ENTRIES.map((e, i) => (
          <li key={e.title} className="flex flex-col bg-mf-paper p-6">
            <span className="numeral text-[40px] text-mf-dune">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-5 font-heading text-[20px] leading-tight text-mf-ink">{e.title}</h3>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-mf-muted">{e.body}</p>
            <p className="mt-auto pt-6 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.12em] text-mf-teal">
              verify: {e.check}
            </p>
          </li>
        ))}
      </ol>
    </Chapter>
  );
}

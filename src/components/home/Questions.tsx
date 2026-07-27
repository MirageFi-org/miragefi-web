import { Chapter } from "./Chapter";

const FAQS = [
  {
    q: "Is MirageFi an exchange?",
    a: "It is a non-custodial swap venue: quotes come from oracle-anchored vaults and competing makers, settlement is atomic on Robinhood Chain, and your assets never sit with the venue. There is no order book and no account to fund.",
  },
  {
    q: "Why is the spread wider tonight than this afternoon?",
    a: "The underlying market is closed. Closed-session quotes carry a ×3 spread multiplier and smaller clips because liquidity providers bear the gap to the next open. The ticket's regime badge always shows the multiplier in force, before you sign.",
  },
  {
    q: "Do I own Apple shares after buying tokenized AAPL?",
    a: "No. You hold a Stock Token: an ERC-20 debt security issued by Robinhood Assets (Jersey) Ltd that tracks the share, with dividends accruing into the token through its ERC-8056 multiplier. The disclosure at your first swap spells out the difference.",
  },
  {
    q: "What do liquidity providers actually earn?",
    a: "The realised spread on their vault's fills, minus the protocol's 10% share, accruing into value per share. No emissions and no points. It is not impermanent loss in the AMM sense: anchored vaults do not bleed to reference-price arbitrage, and the real risks, inventory and weekend gaps, are stated plainly and charged for.",
  },
  {
    q: "Who sets the prices?",
    a: "A formula over public state: the guarded Chainlink mid, the tier half-spread times the session multiplier, the inventory skew, and an itemised fee. Nobody at MirageFi can touch an individual quote or fill, and parameters change only through a timelock with a published rationale.",
  },
  {
    q: "What comes after Stock Tokens?",
    a: "The guarded launch runs Tier A equity markets with visible caps. Next: the long tail of Stock Tokens as feeds and reviews complete, then tokenized treasuries and gold through the same listing checklist, then the public API and SDK, then the governance handover. Each phase opens on evidence from the last.",
  },
  {
    q: "Can I integrate MirageFi into my app?",
    a: "Yes. The router is a public contract with a stable interface, eligibility follows your users' wallets rather than your app, and the quote API and TypeScript SDK ship with the infrastructure phase of the roadmap. There is no partner tier; the reference front end has no privileged path.",
  },
] as const;

export function Questions() {
  return (
    <Chapter
      id="faq"
      no="07"
      title="Asked, answered, on the record"
      kicker="The short versions live here. The long versions, with the maths and the failure modes, live in the documentation."
    >
      <dl className="border-t border-mf-ink">
        {FAQS.map((f) => (
          <div key={f.q} className="grid gap-3 border-b border-mf-line py-7 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
            <dt className="font-heading text-[23px] leading-[1.15] text-mf-ink">{f.q}</dt>
            <dd className="text-[14.5px] leading-relaxed text-mf-muted">{f.a}</dd>
          </div>
        ))}
      </dl>
    </Chapter>
  );
}

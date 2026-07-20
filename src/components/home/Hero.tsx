import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * The first screen is the desert, edge to edge. The headline sits low on the left, over the
 * dunes; a ticket for one swap sits on the right so the first thing a visitor reads
 * after the claim is a fully itemised price. The ticket's figures follow the vault formula.
 */
const AMOUNT_IN = 10_000;
const MID = 176.4;
const FEE = (AMOUNT_IN * 2) / 10_000;
const NET = AMOUNT_IN - FEE;
const OUT = NET / (MID * 1.001); // 10 bps half-spread, open session
const SPREAD_COST = NET - OUT * MID;

const fmt = (n: number, d = 2) =>
  n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

const STRIP = [
  { k: "Half-spread", v: "10 bps", s: "Tier A, open session" },
  { k: "Protocol fee", v: "2 bps", s: "its own line, every ticket" },
  { k: "Oracle band", v: "75 bps", s: "no fill settles outside it" },
  { k: "Settlement", v: "Atomic", s: `Robinhood Chain · ${SITE.chainId}` },
] as const;

export function Hero() {
  return (
    <section className="relative isolate -mt-[65px] overflow-hidden pt-[65px]">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/images/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-[50%_35%]"
        />
      </div>

      <div className="page flex min-h-[calc(100svh-65px)] flex-col justify-end pb-10 pt-20 md:pt-28">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_440px] lg:gap-16">
          <div className="animate-rise relative isolate">
            {/* A soft cream glow bounded to the copy, so the artwork stays untouched beyond the words */}
            <div
              aria-hidden="true"
              className="absolute -inset-x-10 -inset-y-12 -z-10 rounded-[64px] bg-mf-cloud/80 blur-3xl"
            />
            <p className="label">The RWA swap venue · Robinhood Chain</p>
            <h1 className="mt-6 max-w-[12ch] font-heading text-[54px] leading-[0.96] text-mf-ink md:text-[84px] lg:text-[104px]">
              Tokenized stocks,{" "}
              <em className="font-heading italic text-mf-blue-deep">priced like the real thing.</em>
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-[1.6] text-mf-slate md:text-[18px]">
              Swap Stock Tokens against USDG at prices anchored to the live Chainlink mid. The
              spread and the fee are separate lines on every ticket, and every fill settles on-chain
              where anyone can check it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={SITE.appHref} className="btn btn-primary">
                Open the venue
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
              <Link href="#pricing" className="btn btn-ghost">
                Read the formula
              </Link>
            </div>
          </div>

          {/* The ticket */}
          <div className="animate-rise delay-2 mx-auto w-full max-w-[440px] lg:mx-0">
            <div className="rounded-2xl border border-white/70 bg-mf-paper/85 p-6 shadow-[0_40px_90px_-40px_rgb(36_28_20/0.5)] backdrop-blur-xl md:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="label">Swap</p>
                  <p className="mt-1.5 font-heading text-[20px] leading-none text-mf-ink">NVDAx / USDG</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-mf-teal/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mf-teal">
                  <span className="size-1.5 rounded-full bg-mf-teal" aria-hidden="true" />
                  Open ×1.0
                </span>
              </div>

              <div className="mt-6 rounded-xl bg-mf-ink/[0.04] px-5 py-4">
                <p className="text-[12px] text-mf-muted">You pay</p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="font-heading text-[36px] leading-none tracking-[-0.01em] text-mf-ink">{fmt(AMOUNT_IN, 0)}</span>
                  <span className="font-mono text-[12px] text-mf-muted">USDG</span>
                </p>
              </div>

              <div className="mt-5 divide-y divide-mf-line">
                <Row k="Chainlink mid" v={`${fmt(MID)} USDG`} />
                <Row k="Spread · 10.0 bps" v={`${fmt(SPREAD_COST)} USDG`} />
                <Row k="Skew" v="+0 bps" />
                <Row k="Protocol fee · 2.0 bps" v={`${fmt(FEE)} USDG`} />
              </div>

              <div className="mt-5 rounded-xl border border-mf-teal/20 bg-mf-teal/[0.06] px-5 py-4">
                <p className="text-[12px] text-mf-teal-deep">You receive</p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="font-heading text-[36px] leading-none tracking-[-0.01em] text-mf-ink">{fmt(OUT, 4)}</span>
                  <span className="font-mono text-[12px] text-mf-muted">NVDAx</span>
                </p>
              </div>

              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-mf-faint">
                Bounded 75 bps from mid · settles atomically
              </p>
            </div>
          </div>
        </div>

        {/* The strip: four facts along the horizon */}
        <div className="mt-14 grid grid-cols-2 border border-mf-line bg-mf-paper/85 backdrop-blur-sm lg:grid-cols-4">
          {STRIP.map((s, i) => (
            <div
              key={s.k}
              className={
                "px-5 py-4 " +
                (i % 2 === 1 ? "border-l border-mf-line " : "") +
                (i >= 2 ? "border-t border-mf-line lg:border-t-0 " : "") +
                (i === 2 ? "lg:border-l " : "")
              }
            >
              <p className="label">{s.k}</p>
              <p className="mt-2 font-heading text-[30px] leading-none text-mf-ink">{s.v}</p>
              <p className="mt-1.5 font-mono text-[11px] text-mf-muted">{s.s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <span className="text-[13px] text-mf-muted">{k}</span>
      <span className="font-mono text-[13px] tabular-nums text-mf-ink">{v}</span>
    </div>
  );
}

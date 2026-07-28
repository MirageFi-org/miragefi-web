import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const PHASES = [
  { name: "Testnet", live: true },
  { name: "Guarded mainnet", live: true },
  { name: "Catalogue and caps", live: false },
  { name: "API and cross-chain", live: false },
  { name: "Governance", live: false },
] as const;

export function Closing() {
  return (
    <section className="relative">
      {/* The route */}
      <div className="page border-t border-mf-line py-14">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="label">The route · each phase opens on evidence from the last</span>
          <span className="font-mono text-[11px] text-mf-faint">two of five reached</span>
        </div>
        <ol className="mt-6 grid grid-cols-2 gap-y-6 sm:grid-cols-5">
          {PHASES.map((p, i) => (
            <li key={p.name} className="pr-4">
              <div className={cn("h-px", p.live ? "bg-mf-teal" : "bg-mf-line-strong")} aria-hidden="true" />
              <p className={cn("mt-3 font-mono text-[11px]", p.live ? "text-mf-teal" : "text-mf-faint")}>0{i + 1}</p>
              <p className={cn("mt-1 font-heading text-[19px] leading-tight", p.live ? "text-mf-ink" : "text-mf-muted")}>
                {p.name}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* The horizon, once more */}
      <div className="relative isolate overflow-hidden border-t border-mf-line">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <Image
            src="/images/banner.png"
            alt=""
            fill
            sizes="100vw"
            quality={85}
            className="object-cover object-[50%_40%]"
          />
        </div>
        <div className="page flex min-h-[520px] flex-col justify-between py-12 md:min-h-[600px]">
          <p className="label text-mf-paper/80!">Every asset · every hour · every fill on-chain</p>
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="max-w-[9ch] font-heading text-[56px] leading-[0.95] text-mf-paper md:text-[96px]">
              The market <em className="italic text-mf-sky">is open.</em>
            </h2>
            <div className="max-w-sm">
              <p className="text-[15px] leading-relaxed text-mf-cloud/90">
                Verified traders can be swapping in minutes. LPs fund vaults and earn the spread.
                Makers quote for free. Every fill lands on Robinhood Chain.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={SITE.appHref}
                  className="btn border border-mf-paper bg-mf-paper text-mf-ink hover:bg-mf-cloud"
                >
                  Open the venue
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
                <a href={SITE.xUrl} target="_blank" rel="noopener noreferrer" className="btn border border-mf-paper/50 text-mf-paper hover:border-mf-paper hover:bg-mf-paper/10"
                >
                  Follow {SITE.xHandle}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

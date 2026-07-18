import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";

const LINKS = [
  { label: "Open the venue", href: SITE.appHref },
  ...NAV_LINKS.map((l) => ({ label: l.label, href: l.href })),
] as const;

const OUTSIDE = [
  { label: SITE.xHandle, href: SITE.xUrl },
  { label: "GitHub", href: SITE.githubUrl },
  { label: "Contact", href: `mailto:${SITE.contactEmail}` },
] as const;

/** The colophon: the name set very large, then one line of links, then the small print. */
export function Footer() {
  return (
    <footer className="relative border-t border-mf-ink bg-mf-mist">
      <div className="page pb-10 pt-12">
        <p
          aria-hidden="true"
          className="font-heading text-[clamp(64px,13.5vw,214px)] leading-[0.88] tracking-[-0.04em] text-mf-ink"
        >
          MirageFi
        </p>

        <div className="mt-10 grid gap-10 border-t border-mf-line pt-8 lg:grid-cols-[1fr_auto]">
          <p className="max-w-md text-[15px] leading-relaxed text-mf-slate">
            A non-custodial swap venue for tokenized real-world assets on Robinhood
            Chain. Oracle-anchored pricing, itemised fees, atomic settlement in USDG.
          </p>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
            <ul className="flex flex-col gap-2.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="label transition-colors hover:text-mf-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2.5">
              {OUTSIDE.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="label transition-colors hover:text-mf-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-mf-line pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-mf-faint sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; 2026 MirageFi · {SITE.domain} · chain {SITE.chainId}</span>
          <span>Every asset. Every hour. Every fill on-chain.</span>
        </div>
      </div>
    </footer>
  );
}

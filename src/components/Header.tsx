"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { GitHubIcon, XIcon } from "@/components/icons";
import { HEADER_LINKS, NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** A single frosted line across the top of the page: brand, a short chapter index, the door to the venue. */
export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-mf-line bg-mf-paper/75 backdrop-blur-xl">
      <div className="page flex h-16 items-center justify-between gap-8">
        <Logo size={28} />

        <nav aria-label="Chapters" className="hidden items-center gap-1 lg:flex">
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-mf-slate transition-colors hover:bg-mf-ink/[0.05] hover:text-mf-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={SITE.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`MirageFi on X (${SITE.xHandle})`}
            className="inline-flex size-9 items-center justify-center rounded-full text-mf-slate transition-colors hover:bg-mf-ink/[0.05] hover:text-mf-ink"
          >
            <XIcon className="size-4" />
          </a>
          <a
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MirageFi on GitHub"
            className="inline-flex size-9 items-center justify-center rounded-full text-mf-slate transition-colors hover:bg-mf-ink/[0.05] hover:text-mf-ink"
          >
            <GitHubIcon className="size-4.5" />
          </a>
          <Link
            href={SITE.appHref}
            className="btn ml-2 rounded-full! border border-mf-ink bg-mf-ink px-5 py-3 text-mf-paper hover:border-mf-teal-deep hover:bg-mf-teal-deep"
          >
            Open the venue
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-mf-line-strong text-mf-ink lg:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      <div id="mobile-nav" className={cn("lg:hidden", open ? "block" : "hidden")}>
        <div className="page border-t border-mf-line pb-6 pt-2">
          <ul className="divide-y divide-mf-line">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-3.5 font-heading text-[22px] text-mf-ink"
                >
                  <span className="font-mono text-[11px] text-mf-faint">{link.no}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <Link href={SITE.appHref} className="btn btn-primary w-full rounded-full!" onClick={() => setOpen(false)}>
              Open the venue
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
            <div className="flex gap-3">
              <a href={SITE.xUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1 rounded-full!">
                {SITE.xHandle}
              </a>
              <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1 rounded-full!">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

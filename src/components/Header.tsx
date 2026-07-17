"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** A single line across the top of the page: brand, chapter index, links, the door to the venue. */
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
    <header className="relative z-40 w-full bg-mf-paper/75 backdrop-blur-xl">
      <div className="page flex h-16 items-center justify-between gap-8">
        <Logo size={28} />

        <nav aria-label="Chapters" className="hidden items-center gap-7 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="label transition-colors hover:text-mf-ink">
              <span className="mr-1.5 text-mf-faint">{link.no}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a href={SITE.xUrl} target="_blank" rel="noopener noreferrer" className="label hidden transition-colors hover:text-mf-ink 2xl:inline">
            {SITE.xHandle}
          </a>
          <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="label hidden transition-colors hover:text-mf-ink 2xl:inline">
            GitHub
          </a>
          <Link href={SITE.appHref} className="btn btn-primary">
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
          className="inline-flex size-10 items-center justify-center border border-mf-line-strong text-mf-ink lg:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>
      <div className="rule" aria-hidden="true" />

      <div id="mobile-nav" className={cn("lg:hidden", open ? "block" : "hidden")}>
        <div className="page border-b border-mf-line bg-mf-paper pb-6 pt-2">
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
            <Link href={SITE.appHref} className="btn btn-primary w-full" onClick={() => setOpen(false)}>
              Open the venue
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
            <div className="flex gap-3">
              <a href={SITE.xUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1">
                {SITE.xHandle}
              </a>
              <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

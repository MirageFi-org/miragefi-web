"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ArrowRightLeft, Briefcase, Droplets, LayoutDashboard, LogOut, Search, Settings } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useSession } from "./PlatformProviders";
import { useNow } from "./usePlatformData";
import { shortAddress } from "@/lib/platform/format";
import { REGIMES, currentSession } from "@/lib/platform/markets";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/platform", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/platform/swap", label: "Swap", icon: ArrowRightLeft },
  { href: "/platform/liquidity", label: "Liquidity", icon: Droplets },
  { href: "/platform/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/platform/explorer", label: "Explorer", icon: Search },
  { href: "/platform/settings", label: "Settings", icon: Settings },
] as const;

/** The venue's shell: a fixed index rail on the left, the page on the right, a flat dock on small screens. */
export function PlatformShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { ready, authenticated, walletAddress, email, login, logout, sessionError } = useSession();
  const now = useNow();
  const session = currentSession(new Date(now));
  const regime = REGIMES[session];

  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href));

  const account = !ready ? (
    <div className="h-9 w-full animate-pulse bg-mf-mist" />
  ) : authenticated ? (
    <div className="flex items-center justify-between gap-3 border border-mf-line-strong px-3 py-2">
      <div className="min-w-0">
        <div className="flex items-center gap-2 font-mono text-[12px] text-mf-ink">
          <span className="size-1.5 bg-mf-teal" aria-hidden="true" />
          {shortAddress(walletAddress)}
        </div>
        {email && <div className="truncate text-[11px] text-mf-faint">{email}</div>}
      </div>
      <button
        type="button"
        onClick={() => void logout()}
        aria-label="Sign out"
        className="inline-flex size-7 shrink-0 items-center justify-center text-mf-muted transition-colors hover:text-mf-ink"
      >
        <LogOut className="size-3.5" />
      </button>
    </div>
  ) : (
    <button type="button" onClick={login} className="btn btn-primary w-full">
      Sign in
      <ArrowUpRight className="size-3.5" aria-hidden="true" />
    </button>
  );

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[256px_minmax(0,1fr)]">
      {/* Index rail */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-mf-line bg-mf-cloud px-6 py-6 lg:flex">
        <Logo size={26} />
        <nav aria-label="Platform" className="mt-12">
          <ul className="flex flex-col">
            {NAV.map((item, i) => {
              const active = isActive(item.href, "exact" in item && item.exact);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 border-l-2 py-2.5 pl-4 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors",
                      active ? "border-mf-teal text-mf-ink" : "border-transparent text-mf-muted hover:text-mf-ink"
                    )}
                  >
                    <span className={cn("w-5", active ? "text-mf-teal" : "text-mf-faint")}>0{i + 1}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto space-y-5">
          <div className="border-t border-mf-line pt-5">
            <p className="label">Session · US equities</p>
            <p className="mt-2 font-heading text-[30px] leading-none text-mf-ink">{regime.label.toLowerCase()}</p>
            <p className="mt-2 font-mono text-[11px] text-mf-muted">
              spreads ×{(regime.spreadMulBps / 10_000).toFixed(1)} · clips ×{(regime.clipMulBps / 10_000).toFixed(2)}
            </p>
          </div>
          {account}
        </div>
      </aside>

      <div className="min-w-0">
        {/* Small screens: a flat top line */}
        <header className="flex h-14 items-center justify-between border-b border-mf-line bg-mf-cloud px-4 lg:hidden">
          <Logo size={24} />
          <div className="flex items-center gap-3">
            <span className="tag">{regime.label}</span>
            {!ready ? null : authenticated ? (
              <button type="button" onClick={() => void logout()} aria-label="Sign out" className="inline-flex size-8 items-center justify-center border border-mf-line-strong text-mf-muted">
                <LogOut className="size-3.5" />
              </button>
            ) : (
              <button type="button" onClick={login} className="btn btn-primary !py-2.5">
                Sign in
              </button>
            )}
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 md:px-10 lg:px-14 lg:pb-16 lg:pt-12">
          {sessionError && (
            <div className="mb-6 border-l-2 border-mf-rose py-2 pl-4 pr-3 text-[13px] text-mf-rose">{sessionError}</div>
          )}
          {children}
        </main>
      </div>

      {/* Dock */}
      <nav aria-label="Platform" className="fixed inset-x-0 bottom-0 z-40 border-t border-mf-line bg-mf-paper lg:hidden">
        <ul className="flex items-stretch justify-around px-1 py-1.5">
          {NAV.map((item) => {
            const active = isActive(item.href, "exact" in item && item.exact);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1 border-t-2 px-2.5 pb-1 pt-2 transition-colors",
                    active ? "border-mf-teal text-mf-ink" : "border-transparent text-mf-muted hover:text-mf-ink"
                  )}
                >
                  <item.icon className="size-4" aria-hidden="true" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.08em]">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

/** Gate that asks the visitor to sign in before showing account-specific content. */
export function RequireAuth({ children, title, body }: { children: React.ReactNode; title?: string; body?: string }) {
  const { ready, authenticated, login } = useSession();
  if (!ready) return <div className="h-40 animate-pulse bg-mf-mist/60" />;
  if (!authenticated) {
    return (
      <div className="sheet overflow-hidden">
        <div className="sheet-head">
          <span>Sign in required</span>
          <span>MF · access</span>
        </div>
        <div className="flex flex-col items-start gap-4 p-7">
          <h2 className="font-heading text-[28px] leading-tight text-mf-ink">{title ?? "Sign in to continue"}</h2>
          <p className="max-w-xl text-[14px] leading-relaxed text-mf-muted">
            {body ?? "Use your email, a social account or any EVM wallet. A wallet on Robinhood Chain is created for you if you do not have one, and it is the address your swaps settle to."}
          </p>
          <button type="button" onClick={login} className="btn btn-primary">
            Sign in
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

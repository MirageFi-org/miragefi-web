"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* Platform primitives: flat paper areas, hairlines, mono labels, serif figures, underlined fields. */

export function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("sheet p-5 md:p-6", className)}>{children}</div>;
}

/** A sheet with a mono label row on top; content gets its own padding. */
export function Sheet({
  label,
  meta,
  className,
  children,
}: {
  label: string;
  meta?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("sheet overflow-hidden", className)}>
      <div className="sheet-head">
        <span>{label}</span>
        {meta && <span className="normal-case tracking-normal">{meta}</span>}
      </div>
      <div className="p-5 md:p-6">{children}</div>
    </section>
  );
}

export function PanelHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 border-b border-mf-line pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="label text-mf-teal">{eyebrow}</p>}
        <h2 className={cn("font-heading text-xl text-mf-ink md:text-2xl", eyebrow && "mt-2")}>{title}</h2>
        {description && <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-mf-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/** Page header: the page code, a serif title, an optional action, over a strong rule. */
export function PageHead({
  code,
  title,
  description,
  action,
}: {
  code: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="border-b border-mf-ink pb-7">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label text-mf-teal">{code}</p>
          <h1 className="mt-3 font-heading text-[40px] leading-[1] text-mf-ink md:text-[52px]">{title}</h1>
          {description && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mf-muted">{description}</p>}
        </div>
        {action}
      </div>
    </div>
  );
}

/** One row of figures divided by hairlines. */
export function StatBand({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid border-y border-mf-line sm:grid-cols-2 lg:grid-cols-4", className)}>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: "teal" | "rose";
}) {
  return (
    <div className="border-b border-mf-line px-1 py-5 sm:border-b-0 sm:border-l sm:px-5 sm:first:border-l-0 lg:[&:nth-child(2)]:border-l">
      <div className="label">{label}</div>
      <div
        className={cn(
          "mt-3 font-heading text-[38px] leading-none [font-variant-numeric:tabular-nums]",
          accent === "teal" ? "text-mf-teal" : accent === "rose" ? "text-mf-rose" : "text-mf-ink"
        )}
      >
        {value}
      </div>
      {hint && <div className="mt-2.5 font-mono text-[11px] text-mf-muted">{hint}</div>}
    </div>
  );
}

export function Badge({
  tone = "muted",
  children,
}: {
  tone?: "teal" | "blue" | "peri" | "rose" | "muted";
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "tag",
        tone === "teal" && "border-mf-teal/50 text-mf-teal",
        tone === "blue" && "border-mf-blue/45 text-mf-blue",
        tone === "peri" && "border-mf-peri/50 text-mf-peri",
        tone === "rose" && "border-mf-rose/50 text-mf-rose",
        tone === "muted" && "border-mf-line-strong text-mf-muted"
      )}
    >
      {children}
    </span>
  );
}

/** Session badge tones: OPEN aqua, EXTENDED lagoon, CLOSED sun, HALTED terracotta. */
export function sessionTone(session: string): "teal" | "blue" | "peri" | "rose" {
  if (session === "regular") return "teal";
  if (session === "extended") return "blue";
  if (session === "closed") return "peri";
  return "rose";
}

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="label mb-1 block">{label}</span>
      {children}
      {hint && <span className="mt-2 block text-[12px] text-mf-muted">{hint}</span>}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn("field", props.type === "checkbox" || props.type === "radio" ? "w-auto cursor-pointer" : "", props.className)}
    />
  );
}

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className={cn("relative block", className)}>
      <select {...props} className="field cursor-pointer appearance-none pr-8" />
      <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-mf-teal" aria-hidden="true" />
    </span>
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  return (
    <button
      {...props}
      className={cn(
        "btn disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "btn-primary",
        variant === "ghost" && "btn-ghost",
        variant === "danger" && "border border-mf-rose/50 bg-transparent text-mf-rose hover:border-mf-rose",
        className
      )}
    />
  );
}

export function EmptyState({ title, body, action }: { title: string; body?: string; action?: React.ReactNode }) {
  return (
    <div className="perf flex flex-col items-start justify-center px-1 pb-4 pt-6">
      <p className="font-heading text-[20px] text-mf-ink">{title}</p>
      {body && <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-mf-muted">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Notice({ tone = "info", children }: { tone?: "info" | "warn" | "error"; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "border-l-2 py-2 pl-4 pr-3 text-[13px] leading-relaxed",
        tone === "info" && "border-mf-teal text-mf-slate",
        tone === "warn" && "border-mf-peri text-mf-slate",
        tone === "error" && "border-mf-rose text-mf-rose"
      )}
    >
      {children}
    </div>
  );
}

export function Table({ children, minWidth = 640 }: { children: React.ReactNode; minWidth?: number }) {
  return (
    <div className="scrollbar-none -mx-5 overflow-x-auto px-5 md:-mx-6 md:px-6">
      <table className="w-full border-collapse text-left text-[13.5px] [font-variant-numeric:tabular-nums]" style={{ minWidth }}>
        {children}
      </table>
    </div>
  );
}

export function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <th scope="col" className={cn("label border-b border-mf-ink pb-3 pr-4 font-normal", className)}>
      {children}
    </th>
  );
}

export function Td({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <td className={cn("border-b border-mf-line py-3.5 pr-4 align-top text-mf-slate", className)}>{children}</td>;
}

export function Skeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-8 animate-pulse border-b border-mf-line bg-mf-mist/60" />
      ))}
    </div>
  );
}

/** A dotted-leader row, like a line on a printed manifest. */
export function LeaderRow({ label, value, sub }: { label: React.ReactNode; value: React.ReactNode; sub?: string }) {
  return (
    <div className="py-[7px] font-mono text-[13px]">
      <div className="flex items-baseline">
        <span className="shrink-0 text-mf-muted">{label}</span>
        <span className="leader" aria-hidden="true" />
        <span className="shrink-0 text-right text-mf-ink [font-variant-numeric:tabular-nums]">{value}</span>
      </div>
      {sub && <div className="mt-0.5 text-[10.5px] normal-case text-mf-faint">{sub}</div>}
    </div>
  );
}

export function ExplorerLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-mf-teal underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}

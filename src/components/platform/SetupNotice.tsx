import Link from "next/link";
import { Logo } from "@/components/Logo";

export function SetupNotice({ missing }: { missing: string[] }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="panel max-w-xl p-8">
        <Logo size={32} />
        <p className="label mt-8 block">Platform not configured</p>
        <h1 className="mt-3 text-2xl font-medium text-mf-ink">Environment variables are missing</h1>
        <p className="mt-3 text-[14px] leading-relaxed text-mf-muted">
          The platform reads its configuration from Privy and Supabase. Add the following to <code className="font-mono text-mf-blue">.env.local</code>,
          run <code className="font-mono text-mf-blue">supabase/schema.sql</code> and <code className="font-mono text-mf-blue">supabase/seed.sql</code>,
          then restart the dev server.
        </p>
        <ul className="mt-4 space-y-1 font-mono text-[13px] text-mf-slate">
          {missing.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <p className="mt-6 text-[13px] text-mf-faint">
          See <code className="font-mono">supabase/README.md</code> for the full setup, or{" "}
          <Link href="/" className="text-mf-blue underline-offset-4 hover:underline">
            return to the homepage
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

import { Chapter } from "./Chapter";

/**
 * A weekday on the venue drawn as a 24-hour ring in UTC. Arc lengths are minutes / 1440.
 * Schedule: 00:00-01:00 extended tail, 01:00-09:00 closed, 09:00-14:30 extended,
 * 14:30-21:00 regular, 21:00-24:00 extended.
 */
const DAY = [
  { session: "extended", from: 0, minutes: 60 },
  { session: "closed", from: 60, minutes: 480 },
  { session: "extended", from: 540, minutes: 330 },
  { session: "regular", from: 870, minutes: 390 },
  { session: "extended", from: 1260, minutes: 180 },
] as const;

const LEGEND = [
  { session: "regular", label: "Open", spread: "×1.0 spread", clip: "full clip", color: "#0b8f9a" },
  { session: "extended", label: "Extended", spread: "×1.5 spread", clip: "×0.75 clip", color: "#5cc8e3" },
  { session: "closed", label: "Closed", spread: "×3.0 spread", clip: "×0.5 clip", color: "#e6d7b8" },
] as const;

const HALTS = [
  { trigger: "Feed older than the session's staleness bound", clears: "a fresh oracle round" },
  { trigger: "Corporate action: the feed reports oraclePaused()", clears: "the feed resuming" },
  { trigger: "A single round moves more than 25%", clears: "timelocked review, published" },
  { trigger: "Sequencer outage, plus one hour of recovery grace", clears: "the grace expiring" },
] as const;

const R = 118;
const C = 2 * Math.PI * R;
const color = (s: string) => LEGEND.find((l) => l.session === s)?.color ?? "#e6d7b8";

export function SessionClock() {
  return (
    <Chapter
      id="sessions"
      no="02"
      title="A venue that knows what time it is"
      kicker="Equity markets are open about 32 hours a week. Stock Tokens trade around the clock. Every market carries a regime that prices the difference, read from the oracle's own market status."
    >
      <div className="grid gap-10 md:grid-cols-[300px_1fr] md:items-center">
        <svg viewBox="0 0 300 300" className="mx-auto w-[260px] md:w-[300px]" role="img" aria-label="A weekday on the venue, in UTC: closed from 01:00 to 09:00, extended until 14:30, open until 21:00, extended until 01:00">
          <circle cx="150" cy="150" r={R} fill="none" stroke="#efe5d2" strokeWidth="26" />
          {DAY.map((seg, i) => {
            const len = (seg.minutes / 1440) * C - 2;
            const start = (seg.from / 1440) * C + 1;
            return (
              <circle
                key={i}
                cx="150"
                cy="150"
                r={R}
                fill="none"
                stroke={color(seg.session)}
                strokeWidth="26"
                strokeDasharray={`${len} ${C - len}`}
                strokeDashoffset={-start}
                transform="rotate(-90 150 150)"
              />
            );
          })}
          {Array.from({ length: 24 }).map((_, h) => {
            const a = (h / 24) * 2 * Math.PI - Math.PI / 2;
            const r1 = R + 20;
            const r2 = h % 6 === 0 ? R + 30 : R + 25;
            return (
              <line
                key={h}
                x1={150 + r1 * Math.cos(a)}
                y1={150 + r1 * Math.sin(a)}
                x2={150 + r2 * Math.cos(a)}
                y2={150 + r2 * Math.sin(a)}
                stroke="#a2958a"
                strokeWidth="1"
              />
            );
          })}
          {[0, 6, 12, 18].map((h) => {
            const a = (h / 24) * 2 * Math.PI - Math.PI / 2;
            const r = R - 30;
            return (
              <text
                key={h}
                x={150 + r * Math.cos(a)}
                y={150 + r * Math.sin(a)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="var(--font-mono)"
                fontSize="10"
                fill="#74675a"
              >
                {String(h).padStart(2, "0")}:00
              </text>
            );
          })}
          <text x="150" y="146" textAnchor="middle" fontFamily="var(--font-heading)" fontSize="22" fill="#241c14">
            weekday
          </text>
          <text x="150" y="166" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.5" fill="#74675a">
            24H · UTC
          </text>
        </svg>

        <div>
          <ul className="divide-y divide-mf-line border-y border-mf-line">
            {LEGEND.map((l) => (
              <li key={l.label} className="grid grid-cols-[16px_110px_1fr] items-center gap-4 py-3.5">
                <span className="size-3" style={{ background: l.color }} aria-hidden="true" />
                <span className="font-heading text-[20px] text-mf-ink">{l.label}</span>
                <span className="font-mono text-[12px] text-mf-muted">
                  {l.spread} · {l.clip}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[14.5px] leading-relaxed text-mf-muted">
            Saturday and Sunday are closed all day: quoting continues at ×3.0 in half the clip, and the
            ticket says so. Refusing to quote would recreate market hours on a 24/7 chain; quoting
            weekend trades at weekday spreads would make LPs the free counterparty to every Monday gap.
            If your trade can wait for the open, waiting is cheaper, and the venue tells you.
          </p>
        </div>
      </div>

      <div className="mt-14">
        <h3 className="font-heading text-[24px] text-mf-ink">When quoting stops entirely</h3>
        <ol className="mt-4 border-t border-mf-ink">
          {HALTS.map((h, i) => (
            <li key={h.trigger} className="grid gap-1 border-b border-mf-line py-4 sm:grid-cols-[40px_1fr_auto] sm:items-baseline sm:gap-6">
              <span className="font-mono text-[11px] text-mf-faint">0{i + 1}</span>
              <span className="text-[15px] text-mf-slate">{h.trigger}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-mf-teal">clears on {h.clears}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mf-faint">
          A halt stops pricing and nothing else. LP withdrawals always work.
        </p>
      </div>
    </Chapter>
  );
}

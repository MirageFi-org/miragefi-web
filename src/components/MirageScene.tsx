import { cn } from "@/lib/utils";

/**
 * The desert at midday, drawn rather than photographed: a pale water-lit sky, a low sun,
 * a sheet of crystal water lying along the horizon where the mirage forms, and layered
 * dunes in the foreground. Pure SVG, so it stays crisp at any size and shares the page's
 * palette exactly. `horizon` is the fraction of the viewBox height where the water sits.
 */
export function MirageScene({
  horizon = 0.6,
  className,
}: {
  horizon?: number;
  className?: string;
}) {
  const W = 1600;
  const H = 900;
  const hy = Math.round(H * horizon);
  const id = `mirage-${Math.round(horizon * 100)}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      <defs>
        {/* Sky: cream at the zenith, cooling to water-light at the horizon */}
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8f1e3" />
          <stop offset="0.55" stopColor="#e9eee6" />
          <stop offset="1" stopColor="#c9ecf3" />
        </linearGradient>
        {/* The sun, a soft disc of gold with a wide halo */}
        <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff7dc" stopOpacity="1" />
          <stop offset="0.25" stopColor="#f6d98a" stopOpacity="0.85" />
          <stop offset="0.6" stopColor="#f0c76a" stopOpacity="0.22" />
          <stop offset="1" stopColor="#f0c76a" stopOpacity="0" />
        </radialGradient>
        {/* Water: bright aqua at the far edge, lagoon blue where it deepens toward the viewer */}
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bdeff5" />
          <stop offset="0.35" stopColor="#3ed2dc" />
          <stop offset="0.75" stopColor="#1687b8" />
          <stop offset="1" stopColor="#0f5583" />
        </linearGradient>
        {/* The water fades into the sand at its near edge, the way a mirage dissolves as you approach */}
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-watermask`}>
          <rect x="0" y={hy - 4} width={W} height="130" fill={`url(#${id}-fade)`} />
        </mask>
        {/* Dunes: sunlit face to shaded face */}
        <linearGradient id={`${id}-dune-far`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#efe5d2" />
          <stop offset="1" stopColor="#e6d7b8" />
        </linearGradient>
        <linearGradient id={`${id}-dune-mid`} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0" stopColor="#e6d7b8" />
          <stop offset="0.5" stopColor="#dcc9a2" />
          <stop offset="1" stopColor="#e9dcc2" />
        </linearGradient>
        <linearGradient id={`${id}-dune-near`} x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0" stopColor="#d3bc8f" />
          <stop offset="0.55" stopColor="#e2d1ad" />
          <stop offset="1" stopColor="#cbb283" />
        </linearGradient>
        {/* Heat haze: a small static displacement that bends the horizon line */}
        <filter id={`${id}-haze`} x="-2%" y="-20%" width="104%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Sand grain on the near dune */}
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="g" />
          <feColorMatrix in="g" type="saturate" values="0" result="gs" />
          <feComponentTransfer in="gs" result="ga">
            <feFuncA type="linear" slope="0.14" intercept="0" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="ga" mode="multiply" />
        </filter>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width={W} height={hy + 40} fill={`url(#${id}-sky)`} />
      <circle cx={W * 0.78} cy={hy * 0.42} r="260" fill={`url(#${id}-sun)`} />

      {/* Distant dunes: a pale ridge just above the water, softened by the haze */}
      <g filter={`url(#${id}-haze)`} className="mirage-haze">
        <path
          d={`M0 ${hy - 22} C ${W * 0.12} ${hy - 58}, ${W * 0.22} ${hy - 30}, ${W * 0.36} ${hy - 40} S ${W * 0.62} ${hy - 12}, ${W * 0.78} ${hy - 36} S ${W * 0.94} ${hy - 20}, ${W} ${hy - 30} L ${W} ${hy + 10} L 0 ${hy + 10} Z`}
          fill={`url(#${id}-dune-far)`}
          opacity="0.9"
        />
      </g>

      {/* The mirage: a sheet of water lying along the horizon */}
      <g mask={`url(#${id}-watermask)`}>
        <rect x="0" y={hy - 4} width={W} height="130" fill={`url(#${id}-water)`} />
        {/* Shimmer: light catching on the water, drifting slowly */}
        <g className="mirage-shimmer" fill="#ffffff">
          <rect x={W * 0.08} y={hy + 14} width={W * 0.22} height="2" rx="1" opacity="0.7" />
          <rect x={W * 0.42} y={hy + 26} width={W * 0.3} height="2" rx="1" opacity="0.55" />
          <rect x={W * 0.7} y={hy + 10} width={W * 0.18} height="2" rx="1" opacity="0.6" />
        </g>
        <g className="mirage-shimmer-2" fill="#ffffff">
          <rect x={W * 0.2} y={hy + 44} width={W * 0.16} height="2" rx="1" opacity="0.4" />
          <rect x={W * 0.55} y={hy + 52} width={W * 0.26} height="2" rx="1" opacity="0.45" />
          <rect x={W * 0.86} y={hy + 36} width={W * 0.1} height="2" rx="1" opacity="0.4" />
        </g>
      </g>

      {/* Dunes */}
      <path
        d={`M0 ${hy + 96} C ${W * 0.14} ${hy + 40}, ${W * 0.3} ${hy + 130}, ${W * 0.48} ${hy + 84} S ${W * 0.76} ${hy + 30}, ${W} ${hy + 92} L ${W} ${H} L 0 ${H} Z`}
        fill={`url(#${id}-dune-mid)`}
      />
      <path
        d={`M0 ${hy + 210} C ${W * 0.18} ${hy + 120}, ${W * 0.36} ${hy + 250}, ${W * 0.58} ${hy + 170} S ${W * 0.86} ${hy + 110}, ${W} ${hy + 190} L ${W} ${H} L 0 ${H} Z`}
        fill={`url(#${id}-dune-near)`}
        filter={`url(#${id}-grain)`}
      />
      {/* Crest highlights */}
      <path
        d={`M0 ${hy + 210} C ${W * 0.18} ${hy + 120}, ${W * 0.36} ${hy + 250}, ${W * 0.58} ${hy + 170} S ${W * 0.86} ${hy + 110}, ${W} ${hy + 190}`}
        fill="none"
        stroke="#fff8ea"
        strokeOpacity="0.6"
        strokeWidth="2"
      />
      <path
        d={`M0 ${hy + 96} C ${W * 0.14} ${hy + 40}, ${W * 0.3} ${hy + 130}, ${W * 0.48} ${hy + 84} S ${W * 0.76} ${hy + 30}, ${W} ${hy + 92}`}
        fill="none"
        stroke="#fff8ea"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Brand constants shared across the site. */
export const SITE = {
  name: "MirageFi",
  domain: "miragefi.org",
  url: "https://miragefi.org",
  xHandle: "@MirageFi",
  xUrl: "https://x.com/MirageFiorg",
  githubUrl: "https://github.com/MirageFi-org",
  contactEmail: "hello@miragefi.org",
  chainId: 4663,
  appHref: "/platform",
} as const;

/** The chapters of the homepage, in reading order. */
export const NAV_LINKS = [
  { no: "01", label: "Pricing", href: "#pricing" },
  { no: "02", label: "Sessions", href: "#sessions" },
  { no: "03", label: "Venue", href: "#venue" },
  { no: "04", label: "Compared", href: "#compare" },
  { no: "05", label: "Chain", href: "#chain" },
  { no: "06", label: "Promises", href: "#ledger" },
  { no: "07", label: "Questions", href: "#faq" },
] as const;

/** The few chapters worth a place in the header; the rest are reachable from the footer. */
export const HEADER_LINKS = NAV_LINKS.filter((l) =>
  ["Pricing", "Sessions", "Venue", "Questions"].includes(l.label)
);

import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://miragefi.org";
const TITLE = "MirageFi | Swap real-world assets on Robinhood Chain";
const DESCRIPTION =
  "MirageFi is a non-custodial swap venue for tokenized real-world assets on Robinhood Chain. Trade Stock Tokens against USDG at prices anchored to the live Chainlink mid, with the spread and fee itemised on every ticket and every fill settled on-chain.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | MirageFi",
  },
  description: DESCRIPTION,
  applicationName: "MirageFi",
  keywords: [
    "MirageFi",
    "Robinhood Chain",
    "tokenized stocks",
    "RWA swap",
    "real-world assets",
    "USDG",
    "tokenized equities",
    "DeFi",
  ],
  authors: [{ name: "MirageFi", url: SITE_URL }],
  creator: "MirageFi",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "MirageFi",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@MirageFi",
    creator: "@MirageFi",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f6efe2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background text-mf-ink antialiased">
        {children}
      </body>
    </html>
  );
}

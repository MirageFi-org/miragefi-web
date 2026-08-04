<p align="center">
  <img src="public/images/logo-mark.png" alt="MirageFi" width="96" />
</p>

<h1 align="center">MirageFi</h1>

<p align="center">
  A non-custodial swap venue for tokenized real-world assets on Robinhood Chain.<br />
  This repository is the website at <a href="https://miragefi.org">miragefi.org</a> and the trading platform at <code>/platform</code>.
</p>

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS 4 with the MirageFi design tokens in `src/app/globals.css` (light, sky-inspired theme)
- Privy for sign-in and embedded wallets on Robinhood Chain
- Supabase (Postgres) for profiles and eligibility attestations
- viem for chain configuration and on-chain interaction

## Requirements

- Node 24 or newer (see `.nvmrc`)
- A Supabase project
- A Privy app

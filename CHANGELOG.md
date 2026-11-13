# Changelog

## 1.2.0

- Rebuild the FixedCoin interface as the Midnight Circuit Command Deck with a visibly distinct technical-premium layout.
- Introduce an asymmetric access console, a persistent desktop navigation rail and a responsive wallet workspace.
- Present the balance as the primary instrument alongside real network, block-height, spendable-balance and UTXO telemetry.
- Refine mobile navigation, translated label handling, focus states, touch targets and reduced-motion behavior without changing wallet logic.
- Preserve all direct Electrum, session, recovery phrase, transaction and Rust/WASM cryptographic behavior.

## 1.1.0

- Patch CVE-2026-126187 by updating React, React DOM and React Server Components to 19.2.9.
- Introduce the Midnight Circuit visual system with a blue-black canvas, FixedCoin gold actions and dedicated network-status colors.
- Refine the access workspace, shared controls and wallet dashboard without changing wallet, network, cryptographic or session behavior.
- Add a compact desktop navigation and a safe-area-aware mobile navigation with larger touch targets and clearer focus states.
- Improve balance, UTXO, form, loading, error and success presentation across responsive layouts.

## 1.0.1

- Update the reviewed Vite, Vitest, Cloudflare, Wrangler and formatting toolchain dependencies.
- Pin audited transitive packages and verify the complete lifecycle-script allowlist.
- Add translated “Never” options for inactivity and background session locking while preserving strict seed, page-exit and BFCache protections.
- Read the displayed wallet version from `package.json` and link it to the matching FixedCoin GitHub release tag.
- Disable source maps explicitly in the Vite production build.

## 1.0.0

- Initial FixedCoin Web Wallet release, based on Nito Web Wallet 1.1.1.
- FixedCoin branding, official logo, amber theme and dedicated deployment templates.
- FixedCoin network parameters in the Rust/WASM core and transaction/address handling.
- Direct connection to FixedCoin ElectrumX and links to the FixedCoin explorer.
- FIX-specific email derivation compatible with the legacy 24-word FIX email wallet.
- Retain HD wallets, private-key import, UTXO management, multi-recipient payments, consolidation, RBF and nine languages.
- Apply cryptographic Worker isolation headers in the standalone server for local use without Nginx.

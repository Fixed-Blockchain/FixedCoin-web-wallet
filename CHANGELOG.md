# Changelog

## 1.2.5

- Keep the desktop navigation rail compact by removing its unnecessary viewport-height constraint.
- Place refresh and exit actions directly below the navigation while preserving the existing controls and responsive mobile layout.

## 1.2.4

- Show the balance breakdown only while funds are pending or mining rewards are immature.
- Expand the primary balance card across the dashboard when every fund is spendable.
- Preserve all wallet synchronization, spending, Electrum, session and Rust/WASM cryptographic behavior.

## 1.2.3

- Consolidate the wallet network state and current block height into the session card.
- Remove repeated synchronization badges and the redundant connection-status card from the home dashboard.
- Preserve all wallet synchronization, spending, Electrum, session and Rust/WASM cryptographic behavior.

## 1.2.2

- Replace the standalone spendable-balance card with a translated balance breakdown for spendable, pending and immature mining funds.
- Show the number of blocks until the next immature coinbase reward reaches maturity when applicable.
- Preserve all wallet synchronization, spending, Electrum and Rust/WASM cryptographic behavior.

## 1.2.1

- Remove the redundant UTXO metric from the home dashboard while preserving the dedicated UTXO workspace and navigation.
- Replace the oversized wallet-access identity panel with a compact security header and a denser responsive access console.
- Preserve all direct Electrum, session, recovery phrase, transaction and Rust/WASM cryptographic behavior.

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

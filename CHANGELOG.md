# Changelog

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

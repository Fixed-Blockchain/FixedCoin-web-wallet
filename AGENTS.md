# FixedCoin Web Wallet

- This project is the independent FixedCoin adaptation of the NEW Nito Web Wallet 1.1.1 at `D:/web wallet nito/nito-wallet-web`. Do not use the retired `wallet.nito.network-main` as the source application.
- Work only in `D:/Fix web wallet`; never modify the Nito checkout or Nito services.
- Preserve the React/Worker/Rust-WASM architecture, direct Electrum connection, Node standalone packaging, systemd and Nginx templates.
- Network reference and recovery contracts are in `docs/FIXEDCOIN.md`.
- Target repository (private): `Fixed-Blockchain/FixedCoin-web-wallet`. Prepare version 1.0.0 with one initial commit and tag v1.0.0 after local validation. Never push intermediate commits or import Nito Git history.
- Keep secrets, generated dependencies, builds, local reports and temporary work outside Git. Keep upstream license attribution.
- Production deployment and cleanup follow local validation. Do not modify the VPS during local development.
- Run the existing relevant checks; never update cryptographic fixtures or the WASM checksum merely to silence a failing test. Identify the exact network/version change and verify the expected result independently.

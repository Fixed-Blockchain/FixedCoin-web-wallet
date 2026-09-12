# FixedCoin network and recovery compatibility

This wallet adapts Nito Web Wallet 1.1.1 (source commit
`c613a5c3873781d439add795e23e111a127eaa0b`). Its upstream MIT notice is retained.
FixedCoin Web Wallet starts its own release history at 1.0.0.

## Network reference

Network parameters were checked against
[FixedCoin Core](https://github.com/Fixed-Blockchain/fixedcoin/tree/e67eddc3e06d11f5ff459690b093773b74c5b812),
specifically `src/kernel/chainparams.cpp`, `src/consensus/consensus.h` and
`src/policy/policy.h`.

| Parameter | FixedCoin mainnet |
| --- | --- |
| Bech32/Bech32m HRP | `fix` |
| P2PKH version | `0x01` |
| P2SH version | `0x00` |
| WIF version | `0x80` |
| Extended public/private versions | `0x0488b21e` / `0x0488ade4` |
| Genesis hash | `000008e19a0f9124269e897bdcff8ef981fa2d563431df80ca27bc4a1373efd6` |
| Coinbase consensus maturity | 100 blocks |
| Minimum relay fee | 1,000 satoshis/kB |
| Dust relay fee | 3,000 satoshis/kB |
| Browser Electrum endpoint | `wss://electrumx.fixedcoin.org:50004` |
| Transaction explorer | `https://explorer.fixedcoin.org/tx/` |

The wallet retains the upstream conservative coinbase policy: spending is
enabled at 101 confirmations. SegWit and Taproot are active on FixedCoin mainnet.
Both the TypeScript transaction layer and the Rust/WASM address generator use
the FixedCoin versions above. The Core node and ElectrumX are existing external
services; the web application requires no public Core RPC proxy or PHP API.

## Recovery

HD derivation retains coin type 0, BIP44/49/84/86, accounts 0 and 1, and both
external and change branches. Reference address checksums are re-encoded for
FixedCoin; the underlying key and script derivation remain unchanged.

Email access uses a normalized (trimmed, lowercase) email, a trimmed password,
PBKDF2-HMAC-SHA512 with 200,000 iterations, the salt `fix-mnemonic:<email>`, and
256 bits of entropy encoded as a 24-word BIP39 phrase. This matches the legacy
FIX 24-word email derivation. An old 12-word email wallet must be restored using
its original recovery phrase; it must not be represented as recovered by the
24-word email access mode. Recovery phrases and imported private keys are never
rewritten or stored by the application.

The email reference vector was calculated independently with Node's PBKDF2 and
BIP39, and its addresses with bitcoinjs-lib/BIP32 and the FixedCoin parameters.
These static vectors exercise the Rust/WASM implementation in the test suite.

The logo is the official `fix-256.png` asset from the pinned Core repository.

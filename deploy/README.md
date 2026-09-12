# Self-Hosted Deployment

`npm run build` creates an immutable standalone release in `dist/standalone`. The directory contains the Node.js server, public assets, runtime dependencies, and `ARTIFACTS.sha256`.

The FixedCoin templates in this directory use the following layout:

- public hostname: `web.wallet.fixedcoin.org`;
- private listener: `127.0.0.1:8787`;
- service account: `fixedcoin-wallet`;
- releases: `/var/fixedcoin-wallet-web/releases/<revision>`;
- active symlink: `/var/fixedcoin-wallet-web/current`.

Verify that the private listener port is available before installation. Keep
existing FixedCoin Core and ElectrumX services. The browser uses ElectrumX
directly; no PHP API or public Core RPC proxy is needed.

The standalone entry also applies Worker isolation headers when running locally
without Nginx. Keep this entry in the release instead of substituting Vinext's
default generated entry.

## Build and install

```bash
npm ci
npm run check
sudo install -d -o fixedcoin-wallet -g fixedcoin-wallet /var/fixedcoin-wallet-web/releases/<revision>
sudo cp -a dist/standalone/. /var/fixedcoin-wallet-web/releases/<revision>/
sudo ln -sfn /var/fixedcoin-wallet-web/releases/<revision> /var/fixedcoin-wallet-web/current
```

Verify `ARTIFACTS.sha256` before activating a release.

## TLS bootstrap

Install `nginx/fixedcoin-wallet.bootstrap.conf` only while obtaining the first ACME certificate. After the certificate exists, replace it with `nginx/fixedcoin-wallet.conf`, test the configuration, and reload Nginx.

## Service

Install `systemd/fixedcoin-wallet.service`, create the unprivileged `fixedcoin-wallet` account, then enable the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now fixedcoin-wallet.service
```

The final Nginx template restricts methods, response caching, framing, browser capabilities, and network destinations. Keep the application bound to the loopback interface.

Production uses a dedicated Node.js 22.23.2 runtime at `/opt/fixedcoin-wallet-node/bin/node`, leaving the shared system Node.js unchanged. The Nginx vhost supports the server's Nginx 1.18 and preserves its `/var/www/letsencrypt` ACME webroot.

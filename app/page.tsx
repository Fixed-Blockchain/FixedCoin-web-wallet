'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

import { WalletLanguageSelect } from '@/components/wallet-language-select';
import packageManifest from '@/package.json';
import { LanguageProvider, useI18n } from '@/src/i18n';
import { WalletAccessWorkspace } from './wallet-access-workspace';

const WALLET_VERSION = packageManifest.version;
const WALLET_VERSION_LABEL = `v${WALLET_VERSION}`;
const WALLET_RELEASE_URL = `https://github.com/Fixed-Blockchain/FixedCoin-web-wallet/releases/tag/${WALLET_VERSION_LABEL}`;

function FixedCoinBrand() {
  return (
    <div className="group/brand flex items-center gap-3 sm:gap-4">
      <Image
        alt="FixedCoin"
        className="size-12 object-contain drop-shadow-[0_0_18px_rgba(224,169,40,0.18)] transition-transform duration-300 group-hover/brand:-rotate-3 group-hover/brand:scale-105 motion-reduce:transition-none sm:size-14"
        height={56}
        preload
        src="/fixedcoin-logo.png"
        width={56}
      />
      <div className="border-l border-[#f2c95c]/45 pl-3 sm:pl-4">
        <p className="text-base font-black leading-none tracking-[0.2em] text-[#f2c95c] sm:text-lg">
          FIX
        </p>
        <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#d9e2e8]">
          Web Wallet
        </p>
      </div>
    </div>
  );
}

function WalletPage() {
  const { t } = useI18n();

  return (
    <main className="wallet-canvas flex min-h-dvh flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-[#46bfd1]/15 bg-[#080d13]/95 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <FixedCoinBrand />
          <div className="flex items-center gap-2">
            <WalletLanguageSelect id="header-wallet-language" />
            <div
              className="flex min-h-11 items-center gap-2 rounded-xl border border-[#36c98f]/20 bg-[#36c98f]/8 px-3 text-[11px] font-bold text-[#73e6b3]"
              title={t('app.ready')}
            >
              <span className="size-2 rounded-full bg-[#36c98f] shadow-[0_0_10px_rgba(54,201,143,0.6)]" />
              <span className="hidden sm:inline">{t('app.ready')}</span>
            </div>
          </div>
        </div>
      </header>

      <WalletAccessWorkspace />

      <footer className="wallet-footer mt-auto border-t border-[#46bfd1]/12 bg-[#080d13]/55 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-1 text-center text-sm font-semibold text-[#91a0ac]">
          <a
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 transition-colors hover:text-[#f2c95c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2c95c]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            href="https://github.com/Fixed-Blockchain/FixedCoin-web-wallet"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{t('footer.officialRepository')}</span>
            <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
          </a>
          <span aria-hidden="true">{'·'}</span>
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-xl px-3 transition-colors hover:text-[#f2c95c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2c95c]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            href={WALLET_RELEASE_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            {WALLET_VERSION_LABEL}
          </a>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <WalletPage />
    </LanguageProvider>
  );
}

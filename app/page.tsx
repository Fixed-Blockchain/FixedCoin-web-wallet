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
    <div className="group/brand flex items-center gap-4">
      <div className="wallet-brand-mark grid size-12 place-items-center border border-[#f2c95c]/22 bg-[#0b1219] sm:size-14">
        <Image
          alt="FixedCoin"
          className="size-10 object-contain drop-shadow-[0_0_22px_rgba(224,169,40,0.28)] transition-transform duration-300 group-hover/brand:-rotate-3 group-hover/brand:scale-105 motion-reduce:transition-none sm:size-12"
          height={48}
          preload
          src="/fixedcoin-logo.png"
          width={48}
        />
      </div>
      <div className="relative pl-4 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-gradient-to-b before:from-[#f2c95c] before:via-[#f2c95c]/35 before:to-transparent">
        <div className="flex items-center gap-2.5">
          <p className="text-lg font-black leading-none tracking-[0.24em] text-[#f2c95c] sm:text-xl">
            FIX
          </p>
          <span className="hidden h-px w-8 bg-gradient-to-r from-[#46bfd1]/70 to-transparent sm:block" />
        </div>
        <p className="mt-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#cbd6dc] sm:text-[10px]">
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
      <header className="wallet-command-header sticky top-0 z-50 border-b border-[#46bfd1]/15 bg-[#05090e]/93 shadow-[0_18px_55px_rgba(0,0,0,0.32)] backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-[1380px] items-center justify-between gap-3 px-4 py-2 sm:min-h-24 sm:px-7">
          <FixedCoinBrand />
          <div
            aria-hidden="true"
            className="hidden min-w-0 flex-1 items-center px-10 lg:flex"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-[#46bfd1]/28 via-[#46bfd1]/8 to-transparent" />
            <span className="mx-3 size-1.5 rotate-45 border border-[#46bfd1]/45" />
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#f2c95c]/30" />
          </div>
          <div className="flex items-center gap-2">
            <WalletLanguageSelect id="header-wallet-language" />
            <div
              className="flex min-h-11 items-center gap-2 border border-[#36c98f]/24 bg-[#36c98f]/8 px-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#7ce7b8] shadow-[inset_0_0_18px_rgba(54,201,143,0.04)] sm:px-4"
              title={t('app.ready')}
            >
              <span className="wallet-live-dot size-2 rounded-full bg-[#36c98f] shadow-[0_0_10px_rgba(54,201,143,0.6)]" />
              <span className="hidden sm:inline">{t('app.ready')}</span>
            </div>
          </div>
        </div>
      </header>

      <WalletAccessWorkspace />

      <footer className="wallet-footer relative mt-auto border-t border-[#46bfd1]/16 bg-[#05090e]/88 px-4 py-5 sm:px-6">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f2c95c]/55 to-transparent"
        />
        <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-center gap-1 text-center text-xs font-bold text-[#9aabb7]">
          <a
            className="inline-flex min-h-11 items-center justify-center gap-2 px-3 uppercase tracking-[0.08em] transition-colors hover:text-[#f2c95c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2c95c]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            href="https://github.com/Fixed-Blockchain/FixedCoin-web-wallet"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{t('footer.officialRepository')}</span>
            <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
          </a>
          <span aria-hidden="true">{'·'}</span>
          <a
            className="inline-flex min-h-11 items-center justify-center px-3 font-mono tracking-[0.08em] text-[#cbd6dc] transition-colors hover:text-[#f2c95c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2c95c]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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

'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { InfoTip } from '@/components/info-tip';
import { useI18n } from '@/src/i18n';
import { HD_ACCOUNT_TEMPLATES } from '@/src/domain/wallet-policy';
import type { ElectrumUtxo } from '@/src/network/electrum';
import type { WalletAddress } from '@/src/wallet/transparentScan';
import { fixedcoinTransactionExplorerUrl } from '@/src/network/explorer';
import { COINBASE_MATURITY_CONFIRMATIONS } from '@/src/wallet/coinbaseMaturity';
import { formatFixedCoinAmount } from '@/src/ui/formatFixedCoin';
import { sortedUtxos, utxoConfirmations, utxoPage } from '@/src/ui/utxoList';

export function WalletUtxoList({
  utxos,
  addresses,
  blockHeight,
}: {
  utxos: readonly ElectrumUtxo[];
  addresses: readonly Pick<WalletAddress, 'address' | 'scriptType'>[];
  blockHeight: number;
}) {
  const { language, t } = useI18n();
  const [requestedPage, setPage] = useState(1);
  const ordered = useMemo(() => sortedUtxos(utxos), [utxos]);
  const addressTypes = useMemo(
    () =>
      new Map(
        addresses.map(({ address, scriptType }) => [
          address,
          HD_ACCOUNT_TEMPLATES.find(
            (template) => template.scriptType === scriptType,
          )?.label,
        ]),
      ),
    [addresses],
  );
  const { page, pageCount, rows } = utxoPage(ordered, requestedPage);
  if (requestedPage !== page) setPage(page);
  const dateFormat = useMemo(
    () =>
      new Intl.DateTimeFormat(language, {
        dateStyle: 'medium',
        timeStyle: 'medium',
      }),
    [language],
  );

  return (
    <Card className="glass-panel subtle-shine overflow-visible border-cyan-200/[0.12] bg-transparent py-0 shadow-[0_28px_80px_rgba(0,0,0,0.24)]">
      <CardContent className="p-5 sm:p-7">
        <div className="mb-6 flex flex-wrap items-end gap-3 border-b border-cyan-200/[0.09] pb-5">
          <CardTitle className="text-xl font-black tracking-[-0.025em] text-white">
            {t('utxos.title')}
          </CardTitle>
          <InfoTip label={t('utxos.about')}>{t('utxos.help')}</InfoTip>
          <span className="ml-auto rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-3 py-1 font-mono text-sm font-black tabular-nums text-amber-100">
            {utxos.length}
          </span>
        </div>
        {rows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-cyan-200/[0.14] bg-[#071019]/45 px-5 py-12 text-center text-sm text-stone-400">
            {t('utxos.empty')}
          </p>
        ) : (
          <ul className="grid gap-3 xl:grid-cols-2">
            {rows.map((utxo) => {
              const confirmations = utxoConfirmations(utxo, blockHeight);
              const immature =
                utxo.isCoinbase === true &&
                confirmations > 0 &&
                confirmations < COINBASE_MATURITY_CONFIRMATIONS;
              const timestamp =
                utxo.height > 0 ? utxo.blockTime : utxo.firstSeenAt;
              return (
                <li
                  key={`${utxo.txid}:${utxo.vout}`}
                  className="group/utxo relative min-w-0 space-y-4 overflow-hidden rounded-2xl border border-cyan-200/[0.09] bg-[#09141e]/85 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-200/[0.18] hover:bg-[#0c1924] sm:p-5"
                >
                  <div
                    aria-hidden="true"
                    className={`absolute inset-y-5 left-0 w-px ${confirmations === 0 || immature ? 'bg-amber-300/70' : 'bg-emerald-300/60'}`}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-lg font-black tracking-tight text-white">
                      {formatFixedCoinAmount(utxo.valueSats)} FIX
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-bold ${confirmations === 0 || immature ? 'border-amber-300/20 bg-amber-300/[0.07] text-amber-200' : 'border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-200'}`}
                    >
                      {t(
                        confirmations === 0
                          ? 'utxos.pending'
                          : immature
                            ? 'utxos.immature'
                            : 'utxos.spendable',
                      )}
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 text-xs leading-5 text-stone-400">
                    <span>
                      {timestamp ? (
                        <>
                          {t(
                            utxo.height > 0
                              ? 'utxos.blockDate'
                              : 'utxos.firstSeen',
                          )}{' '}
                          <time
                            dateTime={new Date(timestamp * 1_000).toISOString()}
                          >
                            {dateFormat.format(timestamp * 1_000)}
                          </time>
                        </>
                      ) : (
                        t('utxos.dateUnavailable')
                      )}
                    </span>
                    <span className="tabular-nums">
                      {t('utxos.confirmations', { count: confirmations })}
                      {immature
                        ? ` · ${t('utxos.remaining', { count: Math.max(0, COINBASE_MATURITY_CONFIRMATIONS - confirmations) })}`
                        : ''}
                    </span>
                  </div>
                  <div className="space-y-2 rounded-xl border border-cyan-200/[0.08] bg-[#061019]/85 px-3.5 py-3">
                    <div className="flex items-center justify-between gap-2 text-xs text-stone-400">
                      <span>{t('utxos.address')}</span>
                      <span className="rounded-md bg-amber-300/[0.08] px-2 py-0.5 font-semibold text-amber-200">
                        {addressTypes.get(utxo.address) ??
                          t('utxos.unknownType')}
                      </span>
                    </div>
                    <p className="select-all break-all font-mono text-xs leading-5 text-stone-200">
                      {utxo.address}
                    </p>
                  </div>
                  <a
                    href={fixedcoinTransactionExplorerUrl(utxo.txid)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 max-w-full items-center gap-2 break-all rounded-lg font-mono text-sm text-amber-300 underline-offset-4 transition-colors hover:bg-amber-300/[0.06] hover:text-amber-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70"
                    aria-label={t('utxos.open', {
                      txid: utxo.txid,
                      index: utxo.vout,
                    })}
                  >
                    {`${utxo.txid.slice(0, 12)}…${utxo.txid.slice(-8)}:${utxo.vout}`}
                    <ExternalLink
                      aria-hidden="true"
                      className="size-3 shrink-0"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        )}
        {pageCount > 1 ? (
          <nav
            aria-label={t('utxos.pagination')}
            className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4"
          >
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={page === 1}
              aria-label={t('utxos.previous')}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft />
            </Button>
            <form
              className="flex flex-wrap items-center justify-center gap-2 text-sm"
              onSubmit={(event) => {
                event.preventDefault();
                const value = new FormData(event.currentTarget).get('page');
                setPage(utxoPage(ordered, Number(value)).page);
              }}
            >
              <label htmlFor="utxo-page" className="text-stone-400">
                {t('utxos.page')}
              </label>
              <input
                key={page}
                id="utxo-page"
                name="page"
                type="number"
                inputMode="numeric"
                min={1}
                max={pageCount}
                step={1}
                defaultValue={page}
                className="min-h-11 w-16 rounded-xl border border-cyan-200/15 bg-[#071019] px-2 text-center text-stone-100 outline-none transition focus-visible:border-amber-300/60 focus-visible:ring-4 focus-visible:ring-amber-300/10"
              />
              <span className="text-stone-400">{`/ ${pageCount}`}</span>
              <Button type="submit" size="sm" variant="outline">
                {t('utxos.go')}
              </Button>
            </form>
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={page === pageCount}
              aria-label={t('utxos.next')}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight />
            </Button>
          </nav>
        ) : null}
      </CardContent>
    </Card>
  );
}

const FIX_EXPLORER_TRANSACTION_URL =
  'https://explorer.fixedcoin.org/tx/';

export const fixedcoinTransactionExplorerUrl = (txid: string): string => {
  const normalized = txid.trim().toLowerCase();
  if (!/^[0-9a-f]{64}$/u.test(normalized)) {
    throw new Error(
      'A valid transaction id is required for the explorer link.',
    );
  }
  return `${FIX_EXPLORER_TRANSACTION_URL}${normalized}`;
};

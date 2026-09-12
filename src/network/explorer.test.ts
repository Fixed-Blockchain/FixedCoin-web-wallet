import { describe, expect, it } from 'vitest';

import { fixedcoinTransactionExplorerUrl } from './explorer';

describe('FIX explorer links', () => {
  it('builds a canonical HTTPS transaction link', () => {
    const txid = 'AB'.repeat(32);
    expect(fixedcoinTransactionExplorerUrl(txid)).toBe(
      `https://explorer.fixedcoin.org/tx/${txid.toLowerCase()}`,
    );
  });

  it('rejects malformed transaction identifiers', () => {
    expect(() => fixedcoinTransactionExplorerUrl('javascript:alert(1)')).toThrow();
  });
});

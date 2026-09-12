import { describe, expect, it } from 'vitest';

import { formatFixedCoinAmount } from './formatFixedCoin';

describe('French FIX amount formatting', () => {
  it('formats integer satoshis exactly without floating point conversion', () => {
    expect(formatFixedCoinAmount(123_456_789)).toBe('1,23456789');
    expect(formatFixedCoinAmount(BigInt(123_456_789_000_000))).toBe('1\u202f234\u202f567,89');
    expect(formatFixedCoinAmount(100_000_000, { minimumFractionDigits: 2 })).toBe('1,00');
  });
});

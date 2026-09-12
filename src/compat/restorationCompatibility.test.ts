import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, it } from 'vitest';

import { instantiateFixedCoinWasmCrypto, type FixedCoinWasmCrypto } from '../crypto/wasmAbi';
import { deriveEmailCredentialMnemonic } from './email-credentials';

const BIP39_RESTORATION_VECTOR =
  'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
const EMAIL_RESTORATION_VECTOR =
  'cage universe borrow churn embrace rigid grunt exercise drift tortoise scene tape panda delay dwarf myth fitness spatial brisk sustain toss door weasel panel';

type AddressRequest = Readonly<{
  path: string;
  scriptType: 'p2pkh' | 'p2sh-p2wpkh' | 'p2wpkh' | 'p2tr';
}>;

describe('BIP39 restoration compatibility', () => {
  let wasm: FixedCoinWasmCrypto;

  beforeAll(async () => {
    const bytes = await readFile(
      resolve(process.cwd(), 'public', 'wasm', 'fixedcoin_wallet_crypto_web.wasm'),
    );
    wasm = await instantiateFixedCoinWasmCrypto(bytes, (target) => target.fill(0x39));
  });

  const derive = (mnemonic: string, requests: readonly AddressRequest[]) =>
    wasm.invoke<Array<{ path: string; address: string }>>('deriveAddresses', {
      mnemonic,
      requests,
    });

  it('restores the 12-word vector across external, internal and deep paths', () => {
    const requests: AddressRequest[] = [
      { path: "m/44'/0'/0'/1/0", scriptType: 'p2pkh' },
      { path: "m/49'/0'/0'/1/0", scriptType: 'p2sh-p2wpkh' },
      { path: "m/84'/0'/0'/1/0", scriptType: 'p2wpkh' },
      { path: "m/86'/0'/0'/1/0", scriptType: 'p2tr' },
      { path: "m/44'/0'/1'/0/1", scriptType: 'p2pkh' },
      { path: "m/49'/0'/1'/0/1", scriptType: 'p2sh-p2wpkh' },
      { path: "m/84'/0'/1'/0/1", scriptType: 'p2wpkh' },
      { path: "m/86'/0'/1'/0/1", scriptType: 'p2tr' },
      { path: "m/84'/0'/0'/0/20", scriptType: 'p2wpkh' },
      { path: "m/84'/0'/0'/1/37", scriptType: 'p2wpkh' },
      { path: "m/84'/0'/1'/0/999", scriptType: 'p2wpkh' },
      { path: "m/84'/0'/1'/0/1000", scriptType: 'p2wpkh' },
      { path: "m/84'/0'/1'/0/9999", scriptType: 'p2wpkh' },
    ];

    expect(derive(BIP39_RESTORATION_VECTOR, requests).map(({ address }) => address)).toEqual([
      'hNu5MDga6bhubL8Wd4pyBMGHZ3pgFSXbZ',
      '13d4BCxJ8Zt6M3RqLoEegyndrRX2zqudHD',
      'fix1q8c6fshw2dlwun7ekn9qwf37cu2rn755unjqa0w',
      'fix1p3qkhfews2uk44qtvauqyr2ttdsw7svhkl9nkm9s9c3x4ax5h60wqylskpw',
      'fvkdWSBYR5tSiYKVSdVZcNbjhKfftqPHS',
      '1MfDU3yZwmsR9YhKZ2LZ7vhdSniQAzNoE',
      'fix1qx0tpa0ctsy5v8xewdkpf69hhtz5cw0rfxkdryt',
      'fix1pqfhqcv85tqvlzhxcdde06k5arfkyyz6tvf9x03v2mgy2w25qpmjsp97j2y',
      'fix1qy62dyq937vfjr5e8tj3ltx7zc6fw958tfxp6zw',
      'fix1qkzkg24m6j2gkwq4y5s0xhjmxtdvvzkwt2se8jr',
      'fix1qh242zj2v9tuwrtfdwthtc594yclukrjx0jj8qj',
      'fix1q2ym2c9tpt90jhs0x5fepk0v6ghnfsk7qz77n3t',
      'fix1qj0vycncf27q0478janvcexrltgp3lnau9l2dnh',
    ]);
  });

  it('restores a deterministic email wallet from its revealed 24-word BIP39 phrase', async () => {
    const derivedMnemonic = await deriveEmailCredentialMnemonic(
      '  Test.User+Legacy@Example.COM  ',
      '  Legacy-Test-Password-2026!  ',
    );
    expect(derivedMnemonic).toBe(EMAIL_RESTORATION_VECTOR);
    const requests: AddressRequest[] = [
      { path: "m/44'/0'/0'/0/0", scriptType: 'p2pkh' },
      { path: "m/49'/0'/0'/0/0", scriptType: 'p2sh-p2wpkh' },
      { path: "m/84'/0'/0'/0/0", scriptType: 'p2wpkh' },
      { path: "m/86'/0'/0'/0/0", scriptType: 'p2tr' },
    ];
    const emailAddresses = derive(derivedMnemonic, requests);
    const restoredFromSeedAddresses = derive(EMAIL_RESTORATION_VECTOR, requests);

    expect(emailAddresses.map(({ address }) => address)).toEqual([
      'bvy87APm3ZCu56cqvVYy8ZDcabCseEztd',
      '1P6DNppV6kGtpNVH7JbXepEBtPnQEcsKwC',
      'fix1qzzvddrfcurj0znf5a67tu6qz247tkujzx06hw2',
      'fix1pffk6ue4jelmq8fpsq27qdmzhgmvleww5gntunp804ry0he3tjqhqsltgwz',
    ]);
    expect(restoredFromSeedAddresses).toEqual(emailAddresses);
  });
});

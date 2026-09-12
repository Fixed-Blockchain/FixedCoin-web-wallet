export type ElectrumServer = Readonly<{
  host: string;
  port: number;
  protocol: 'wss';
  priority: number;
}>;

export const FIX_ELECTRUM_SERVERS: readonly ElectrumServer[] = [
  { host: 'electrumx.fixedcoin.org', port: 50004, protocol: 'wss', priority: 1 },
] as const;

export const FIX_ELECTRUM_WSS_ORIGINS = [
  'wss://electrumx.fixedcoin.org:50004',
] as const;

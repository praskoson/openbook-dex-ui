import Markets from './blast_markets.json';
import { PublicKey } from '@solana/web3.js';

export const MARKETS: Array<{
  address: PublicKey;
  name: string;
  programId: PublicKey;
  deprecated: boolean;
}> = Markets.map((market) => {
  return {
    address: new PublicKey(market.address),
    name: market.name,
    programId: new PublicKey(market.programId),
    deprecated: market.deprecated,
  };
});

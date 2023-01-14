import React, { Suspense, useMemo } from 'react';
import './App.less';
import { ConnectionProvider, useConnectionConfig } from './utils/connection';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { GlobalStyle } from './global_style';
import { Spin } from 'antd';
import ErrorBoundary from './components/ErrorBoundary';
import { Routes } from './routes';
import { PreferencesProvider } from './utils/preferences';
import { ReferrerProvider } from './utils/referrer';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  SolletWalletAdapter,
  LedgerWalletAdapter,
  SolflareWalletAdapter,
  PhantomWalletAdapter,
  BackpackWalletAdapter,
  GlowWalletAdapter,
  BraveWalletAdapter,
} from '@solana/wallet-adapter-wallets';

function AppImpl() {
  const { endpoint } = useConnectionConfig();
  const network = useMemo(() => endpoint as WalletAdapterNetwork, [endpoint]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new BackpackWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new GlowWalletAdapter(),
      new BraveWalletAdapter(),
    ],
    [network],
  );
  return (
    <ReferrerProvider>
      <WalletProvider autoConnect wallets={wallets}>
        <PreferencesProvider>
          <Suspense fallback={() => <Spin size="large" />}>
            <Routes />
          </Suspense>
        </PreferencesProvider>
      </WalletProvider>
    </ReferrerProvider>
  );
}

export default function App() {
  return (
    <Suspense fallback={() => <Spin size="large" />}>
      <GlobalStyle />
      <ErrorBoundary>
        <ConnectionProvider>
          <AppImpl />
        </ConnectionProvider>
      </ErrorBoundary>
    </Suspense>
  );
}

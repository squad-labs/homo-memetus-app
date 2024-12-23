"use client";
import React, { Fragment, ReactNode, useMemo } from "react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  MathWalletAdapter,
  TrustWalletAdapter,
  CoinbaseWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider as WalletAdapterProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletProvider from "@/states/partial/wallet/WalletProvider";

type Props = {
  children: ReactNode;
};

const Web3Provider = ({ children }: Props) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new MathWalletAdapter(),
      new TrustWalletAdapter(),
      new CoinbaseWalletAdapter(),
    ],
    [network]
  );
  const { autoConnect } = useWallet();

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletAdapterProvider wallets={wallets} autoConnect={autoConnect}>
        <WalletModalProvider>
          <WalletProvider
            network={network}
            endpoint={endpoint}
            wallets={wallets}
          >
            {children}
            <section id="modal-root" />
          </WalletProvider>
        </WalletModalProvider>
      </WalletAdapterProvider>
    </ConnectionProvider>
  );
};

export default Web3Provider;

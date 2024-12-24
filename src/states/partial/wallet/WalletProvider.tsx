"use client";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletContext } from "@/states/partial/wallet/WalletContext";
import { WalletAdapterNetwork, WalletName } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  MathWalletAdapter,
  TrustWalletAdapter,
  CoinbaseWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

type Props = {
  children: ReactNode;
  network: WalletAdapterNetwork;
  endpoint: string;
  wallets: (
    | PhantomWalletAdapter
    | SolflareWalletAdapter
    | MathWalletAdapter
    | TrustWalletAdapter
    | CoinbaseWalletAdapter
  )[];
};

const WalletProvider = ({ children, network, endpoint }: Props) => {
  const { connection: walletConnection } = useConnection();
  const [wallet, setWallet] = useState<WalletName | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const {
    wallet: connectedWallet,
    wallets,
    publicKey,
    disconnect,
    select,
    connect,
  } = useWallet();
  useEffect(() => {
    if (!walletConnection || !publicKey) {
      return;
    }

    walletConnection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    walletConnection.getAccountInfo(publicKey).then((info) => {
      if (info) {
        setBalance(info?.lamports / LAMPORTS_PER_SOL);
      }
    });
  }, [publicKey, walletConnection]);

  useEffect(() => {
    console.log(connectedWallet, wallet);
    if (connectedWallet && !wallet) {
      select(connectedWallet.adapter.name);
      connect();
      setWallet(connectedWallet?.adapter.name);
    }
    setAddress(publicKey?.toBase58()!);
  }, [publicKey, walletConnection, wallet]);

  const contextValue = useMemo(() => {
    return {
      network,
      endpoint,
      wallets,
      wallet,
      address,
      balance,
      connection: walletConnection,
      setWallet,
      setAddress,
      setBalance,
    };
  }, [network, endpoint, wallet, address, walletConnection, balance]);

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useConnect = () => {
  return useContext(WalletContext);
};

export default WalletProvider;

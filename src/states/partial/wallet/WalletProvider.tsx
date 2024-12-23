'use client';
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletContext } from '@/states/partial/wallet/WalletContext';
import { WalletAdapterNetwork, WalletName } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  MathWalletAdapter,
  TrustWalletAdapter,
  CoinbaseWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

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

const WalletProvider = ({ children, network, endpoint, wallets }: Props) => {
  const { connection: walletConnection } = useConnection();
  const [wallet, setWallet] = useState<WalletName | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [connection, setConnection] = useState<Connection | null>(
    walletConnection
  );
  const { publicKey, disconnect } = useWallet();

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      'confirmed'
    );

    connection.getAccountInfo(publicKey).then((info) => {
      if (info) {
        setBalance(info?.lamports / LAMPORTS_PER_SOL);
      }
    });
  }, [publicKey, connection]);

  useEffect(() => {
    setConnection(walletConnection);
    setAddress(publicKey?.toBase58()!);
  }, [publicKey, walletConnection]);

  const contextValue = useMemo(() => {
    return {
      network,
      endpoint,
      wallets,
      wallet,
      address,
      balance,
      connection,
      setWallet,
      setAddress,
      setBalance,
      setConnection,
    };
  }, [network, endpoint, wallet, address, connection, balance]);

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

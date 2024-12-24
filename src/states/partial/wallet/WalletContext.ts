import { WalletAdapterType } from "@/shared/types/etc/wallet";
import { WalletAdapterNetwork, WalletName } from "@solana/wallet-adapter-base";
import { Connection } from "@solana/web3.js";
import { Context, createContext, Dispatch, SetStateAction } from "react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  MathWalletAdapter,
  TrustWalletAdapter,
  CoinbaseWalletAdapter,
} from "@solana/wallet-adapter-wallets";

export type WalletContextShape = {
  network:
    | WalletAdapterNetwork.Devnet
    | WalletAdapterNetwork.Mainnet
    | WalletAdapterNetwork.Testnet
    | null;
  endpoint: string | null;
  wallets: (
    | PhantomWalletAdapter
    | SolflareWalletAdapter
    | MathWalletAdapter
    | TrustWalletAdapter
    | CoinbaseWalletAdapter
  )[];
  wallet: WalletName | null;
  setWallet: Dispatch<SetStateAction<WalletName | null>>;
  address: string | null;
  setAddress: Dispatch<SetStateAction<string | null>>;
  balance: number | null;
  setBalance: Dispatch<SetStateAction<number | null>>;
  connection: Connection | null;
};

const defaultValue: WalletContextShape = {
  network: null,
  endpoint: null,
  wallets: [],
  wallet: null,
  setWallet: () => {},
  address: null,
  balance: null,
  connection: null,
  setAddress: () => {},
  setBalance: () => {},
};

export const WalletContext: Context<WalletContextShape> =
  createContext<WalletContextShape>(defaultValue);

export type EthereumProvider = { request(...args: any): Promise<any> };

export declare global {
  interface Window {
    ethereum: EthereumProvider;
  }
}

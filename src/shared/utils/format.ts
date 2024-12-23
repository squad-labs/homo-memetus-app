export const getShortenAddr = (address: string, slice?: number) => {
  if (slice) {
    return `${address.slice(0, slice)}...${address.slice(-slice)}`;
  }
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

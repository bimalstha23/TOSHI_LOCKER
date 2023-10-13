import { ethers } from "ethers";

export const getBalance = async (
  rpcURl: string,
  account: string
): Promise<string> => {
  const customProvider = new ethers.providers.JsonRpcProvider(rpcURl);
  const balanceinWei = await customProvider.getBalance(account);
  const balance = ethers.utils.formatEther(balanceinWei);
  return balance;
};

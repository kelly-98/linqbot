import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import abi from "../utils/abi";
import { ethers } from "ethers";
const useApp = () => {
  const { account, chainId } = useWeb3React();

  const getStats = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL
    );

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );
    const decimals = Number(await contract.decimals());
    const info = await contract.getStats();
    const totalBurned = info[0];
    const totalBurnRewards = info[1];
    return {
      totalBurned: +ethers.utils.formatUnits(totalBurned, decimals),
      totalBurnRewards: +ethers.utils.formatUnits(totalBurnRewards, decimals),
    };
  }, [account, chainId]);

  const burnForEth = useCallback(async (amount) => {
    if (!account) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider.getSigner()
    );
    const decimals = Number(await contract.decimals());
    var tx = await contract.burnForEth(ethers.utils.parseUnits(amount, decimals));
    await tx.wait();
  }, [account, chainId]);

  return {
    getStats,
    burnForEth,
  };
};

export default useApp;

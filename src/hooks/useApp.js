import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import abi from "../utils/abi";
import { ethers } from "ethers";

const useApp = () => {
  const { account, chainId } = useWeb3React();

  const getTotalDividendsDistributed = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL
    );

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );

    const amount = await contract.getTotalDividendsDistributed();
    return +ethers.utils.formatUnits(amount, 18);
  }, [account, chainId]);

  const dividendTokenBalanceOf = useCallback(async () => {
    if (!account) {
      return 0;
    }

    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL
    );
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );

    // const dividendTrackerAddress = await contract.dividendTracker();

    const amount = await contract.withdrawableDividendOf(account);
    return +ethers.utils.formatUnits(amount, 18);
  }, [account, chainId]);

  const claim = useCallback(async () => {
    if (!account) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider.getSigner()
    );
    var tx = await contract.claim();
    await tx.wait();
  }, [account, chainId]);

  return {
    dividendTokenBalanceOf,
    getTotalDividendsDistributed,
    claim,
  };
};

export default useApp;

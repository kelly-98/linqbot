import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import abi from "../utils/abi";
import { ethers } from "ethers";
import useErc20 from "./useERC20";

const useApp = () => {
  const { account, chainId } = useWeb3React();
  const { approve } = useErc20();

  const getEndTime = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL
    );

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );

    const endTime = await contract.endTime();
    return Number(endTime);
  }, [account, chainId]);

  const getMinStakingDuration = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL
    );

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );

    const minStakingDuration = await contract.minStakingDuration();
    return Number(minStakingDuration);
  }, [account, chainId]);

  const getTotalStakedAmount = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL
    );

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );

    const totalStakedAmount = await contract.totalStakedAmount();
    return +ethers.utils.formatUnits(totalStakedAmount, "9");
  }, [account, chainId]);

  const stake = useCallback(
    async (amount) => {
      if (!account) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT,
        abi,
        provider.getSigner()
      );
      await approve(amount);
      var tx = await contract.stake(
        ethers.utils.parseUnits(amount.toString(), "9")
      );
      await tx.wait();
    },
    [account, chainId]
  );

  const unstake = useCallback(async () => {
    if (!account) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider.getSigner()
    );
    var tx = await contract.unstake();
    await tx.wait();
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

  const shill = useCallback(async () => {
    if (!account) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider.getSigner()
    );
    var tx = await contract.shill(account);
    await tx.wait();
  }, [account, chainId]);

  const getStakers = useCallback(async () => {
    if (!account) {
      return {
        stakedAmount: 0,
        claimed: false,
        shilled: false,
      };
    }
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL
    );
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );

    const stakers = await contract.stakers(account);
    return {
      stakedAmount: +ethers.utils.formatUnits(stakers.stakedAmount, "9"),
      claimed: stakers.claimed,
      shilled: stakers.shilled,
    };
  }, [account, chainId]);

  const getCalculateReward = useCallback(async () => {
    if (!account) return 0;
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_RPC_URL
      );
      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT,
        abi,
        provider
      );
      const reward = await contract.calculateReward(account);
      return +ethers.utils.formatEther(reward);
    } catch (error) {
      return 0;
    }
  }, [account, chainId]);

  return {
    getEndTime,
    getMinStakingDuration,
    getTotalStakedAmount,
    stake,
    unstake,
    claim,
    shill,
    getStakers,
    getCalculateReward,
  };
};

export default useApp;

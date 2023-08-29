import { useCallback } from "react";
import { ethers } from "ethers";
import erc20Abi from "../utils/erc20";
import { useWeb3React } from "@web3-react/core";

const useErc20 = () => {
  const tokenContractAddress = "0xFb596FAc783C2169973FF38F2139C1C0E5254B36";
  const { account, chainId } = useWeb3React();

  const balanceOf = useCallback(async () => {
    if (!account) return 0;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = new ethers.Contract(
      tokenContractAddress,
      erc20Abi,
      provider.getSigner()
    );
    const balance = await tokenContract.balanceOf(account);
    const decimals = await tokenContract.decimals();
    return +ethers.utils.formatUnits(balance, Number(decimals));
  }, [account, chainId]);

  const approve = useCallback(
    async (amount) => {
      if (!account) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const busdContract = new ethers.Contract(
        tokenContractAddress,
        erc20Abi,
        provider.getSigner()
      );
      const allow = await busdContract.allowance(
        account,
        process.env.REACT_APP_CONTRACT
      );
      const allowNumber = +ethers.utils.formatUnits(allow, 9);
      if (allowNumber < amount) {
        const txApprove = await busdContract.approve(
          process.env.REACT_APP_CONTRACT,
          "115792089237316195423570985008687907853269984665640564039457584007913129639935"
        );
        await txApprove.wait();
      }
    },
    [account, chainId]
  );

  const getETH = useCallback(async () => {
    if (!account) return 0;
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL
    );
    const balance = await provider.getBalance(account);
    return +ethers.utils.formatEther(balance);
  }, [account, chainId]);

  return {
    getETH,
    balanceOf,
    approve,
  };
};
export default useErc20;

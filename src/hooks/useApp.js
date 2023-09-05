import abi from "../utils/abi";
import { ethers } from "ethers";
import { useAccount, useNetwork } from "wagmi";
import { toast } from "react-hot-toast";
const useApp = () => {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();

  const getClaimableTokens = async () => {
    console.log("getClaimableTokens");
    if (!address || !isConnected) return 0;
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL
    );

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );
    const decimals = Number(await contract.decimals());
    const info = await contract.claimableTokens(address);
    return +ethers.utils.formatUnits(info, decimals);
  };

  const claimTokens = async () => {
    if (!address || !isConnected || chain?.unsupported) return;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT,
        abi,
        provider.getSigner()
      );
      var tx = await contract.claimTokens(address);
      await tx.wait();
      toast.success("Claim token successfully!");
    } catch (error) {
      toast.error(error.reason);
    }
  }

  return {
    getClaimableTokens,
    claimTokens,
  };
};

export default useApp;

import abi from "../utils/abi";
import { ethers } from "ethers";
const useApp = () => {
  const getNextRebase = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL
    );

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );

    const value = await contract.nextRebase();
    return value.toNumber() * 1000;
  };
  const getRebaseEndTime = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL
    );

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT,
      abi,
      provider
    );

    const value = await contract.rebaseEndTime();
    return value.toNumber() * 1000;
  };
  return {
    getNextRebase,
    getRebaseEndTime,
  };
};

export default useApp;

import { useEffect, useState } from "react";
import useApp from "../../hooks/useApp";
import { useAccount, useNetwork } from "wagmi";
// import useAnalysis from "../../hooks/useAnalysis";
import useErc20 from "../../hooks/useERC20";
import Countdown from "react-countdown";

import textStaking from "../../assets/image/text-staking.png";

import uni1 from "../../assets/image/uni-1.png";
import uni2 from "../../assets/image/uni-2.png";

const Completionist = () => <span>0d:0h:0m:0s</span>;

export default function Stake() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  // const { fetchData } = useAnalysis();
  const { getTotalSupply, getETH } = useErc20();
  const { getNextRebase, getRebaseEndTime } = useApp();

  const [availableRewards, setAvailableRewards] = useState(0);
  const [unavailableRewards, setUnavailableRewards] = useState(0);

  //State
  const [nextRebase, setNextRebase] = useState(0);
  const [rebaseEndTime, setRebaseEndTime] = useState(0);

  const [stakingReward, setStakingReward] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [analysis, setAnalysis] = useState({
    price: 0,
    liquidity: 0,
  });
  const getData = async () => {
    if (chain?.unsupported) return;
    // const data = await fetchData();
    // setAnalysis(data);
    const supply = await getTotalSupply();
    setTotalSupply(supply);
    const eth = await getETH("0x7919F2953c62796060Dc7e2001c9bE31D2C38918");
    setStakingReward(eth);
    const nextRebase = await getNextRebase();
    setNextRebase(nextRebase);
    const rebaseEndTime = await getRebaseEndTime();
    setRebaseEndTime(rebaseEndTime);
  };

  useEffect(() => {
    getData();
  }, [chain, address]);

  return (
    <div className="text-center py-16">
      <div className="bg-white/50 px-5 py-2 rounded-sm border-black border-[1px] text-black w-fit mx-auto">
        <span className="">0xBa4a299425A87c273EA0F945c8C1e9423e62D15F</span>
      </div>

      <div className="max-w-lg mx-auto my-8">
        <img src={textStaking} alt="" />
      </div>

      <div className="flex justify-center items-center">
        <span className="font-bold btn-primary px-4 py-2 uppercase rounded-md pr-8">
          total staked:
        </span>
        <span className="font-bold btn-primary px-10 py-2 block bg-black border-[1px] border-white rounded-md -ml-6">
          111111111111111
        </span>
      </div>

      <div className="box-shadow-custom-1 relative z-50 border-[1px] border-black bg-[#4a50f1] rounded-sm w-[350px] lg:w-[800px] mx-auto p-10 lg:px-8 px-5 pt-5 mt-10">
        <h2 className="font-bold text-2xl uppercase">stake</h2>
        <div className="grid grid-cols-1 gap-8 mt-8">
          <div className="border-white border-[1px] bg-black/80 p-5 rounded-md flex flex-col">
            <h3 className="font-bold h-[48px]">APY: 1000%</h3>
            <input
              value={availableRewards}
              className="block px-2 bg-black w-fit mx-auto min-w-fit lg:min-w-[300px] border-white border-[1px] rounded-md text-center font-bold py-1.5 my-8"
            />
            <button className="btn-primary px-5 py-2 rounded-md font-bold w-fit min-w-[150px] mx-auto">
              STAKING
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between py-10">
        <div className="max-w-[130px] lg:max-w-[190px]">
          <img src={uni1} alt="" />
        </div>
        <div className="max-w-[130px] lg:max-w-[190px]">
          <img src={uni2} alt="" />
        </div>
      </div>
    </div>
  );
}

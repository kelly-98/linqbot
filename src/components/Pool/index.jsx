import { useEffect, useState } from "react";
import useApp from "../../hooks/useApp";
import { useAccount, useNetwork } from "wagmi";
// import useAnalysis from "../../hooks/useAnalysis";
import useErc20 from "../../hooks/useERC20";
import Countdown from "react-countdown";

import textStaking from "../../assets/image/text-staking.png";

const Completionist = () => <span>0d:0h:0m:0s</span>;

export default function Pool() {
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

      <div className="box-shadow-custom-1 relative z-50 border-[1px] border-black bg-[#4a50f1] rounded-sm w-[350px] lg:w-[800px] mx-auto p-10 lg:px-8 px-5 pt-5">
        <h2 className="font-bold text-2xl">OVERVIEW</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="border-white border-[1px] bg-black/80 p-5 rounded-md flex flex-col">
            <h3 className="font-bold h-[48px]">AVAILABLE REWARDS:</h3>
            <input
              disabled
              value={availableRewards}
              className="block px-2 bg-black border-white border-[1px] rounded-md text-center font-bold py-1.5 my-8"
            />
            <button className="btn-primary px-5 py-2 rounded-md font-bold w-fit mx-auto">
              COLLECT REWARD
            </button>
          </div>
          <div className="border-white border-[1px] bg-black/80 p-5 rounded-md flex flex-col">
            <h3 className="font-bold uppercase h-[48px]">
              unstake status: <br /> unavailable
            </h3>
            <input
              disabled
              value={availableRewards}
              className="block px-2 bg-black border-white border-[1px] rounded-md text-center font-bold py-1.5 my-8"
            />
            <button className="btn-primary px-5 py-2 rounded-md font-bold w-fit mx-auto">
              UNSTAKE
            </button>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-14">
        <div className="border border-[#ededed] p-10 bg-black/70 rounded-2xl flex flex-col">
          <span className="btn px-8 justify-center items-center btn-primary font-semibold uppercase text-center py-2 rounded-full">
            Total Marketcap
          </span>
          <span className="text-gradient text-2xl lg:text-4xl font-bold block mt-12">
            ${(totalSupply * analysis.price).toFixed(2)}
          </span>
        </div>
        <div className="border border-[#ededed] p-10 bg-black/70 rounded-2xl flex flex-col">
          <span className="btn px-8 justify-center items-center btn-primary font-semibold uppercase text-center py-2 rounded-full">
            Price
          </span>
          <span className="text-gradient text-2xl lg:text-4xl font-bold block mt-12">
            ${analysis.price}
          </span>
        </div>
        <div className="border border-[#ededed] p-10 bg-black/70 rounded-2xl flex flex-col">
          <span className="btn px-8 justify-center items-center btn-primary font-semibold uppercase text-center py-2 rounded-full">
            Liquidity
          </span>
          <span className="text-gradient text-2xl lg:text-4xl font-bold block mt-12">
            ${analysis.liquidity}
          </span>
        </div>
        <div className="border border-[#ededed] p-10 bg-black/70 rounded-2xl flex flex-col">
          <span className="btn px-8 justify-center items-center btn-primary font-semibold uppercase text-center py-2 rounded-full">
            ROR
          </span>
          <span className="text-gradient text-2xl lg:text-4xl font-bold block mt-12">
            2100%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mt-20">
        <div className="border border-[#ededed] p-10 bg-black/70 rounded-2xl flex flex-col items-center">
          <span className="btn px-8 inline-flex w-fit justify-center items-center btn-primary font-semibold uppercase text-center py-2 rounded-full">
            Total Distributed
          </span>
          <span className="text-gradient text-2xl lg:text-4xl font-bold block mt-12">
            ${(totalSupply - 1e6).toFixed(2)} SCORPIO
          </span>
        </div>
        <div className="border border-[#ededed] p-10 bg-black/70 rounded-2xl flex flex-col items-center">
          <span className="btn px-8 inline-flex w-fit justify-center items-center btn-primary font-semibold uppercase text-center py-2 rounded-full">
            Staking Total Reward
          </span>
          <span className="text-gradient text-2xl lg:text-4xl font-bold block mt-12">
            ${stakingReward.toFixed(2)} ETH
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 mt-20">
        <div className="border border-[#ededed] p-10 bg-black/70 rounded-2xl flex flex-col items-center">
          <span className="btn px-8 inline-flex min-w-[200px] justify-center items-center btn-primary font-semibold uppercase text-center py-2 rounded-full">
            ROI
          </span>
          <span className="text-gradient text-2xl lg:text-4xl font-bold block mt-12">
            2000%
          </span>
        </div>
        <div className="border border-[#ededed] p-10 bg-black/70 rounded-2xl flex flex-col items-center">
          <span className="btn px-8 inline-flex min-w-[200px] justify-center items-center btn-primary font-semibold uppercase text-center py-2 rounded-full">
            Next Rebase
          </span>
          <span className="text-gradient text-2xl lg:text-4xl font-bold block mt-12">
            {nextRebase && (
              <Countdown date={nextRebase}>
                <Completionist />
              </Countdown>
            )}
          </span>
        </div>
        <div className="border border-[#ededed] p-10 bg-black/70 rounded-2xl flex flex-col items-center">
          <span className="btn px-8 inline-flex w-fit justify-center items-center btn-primary font-semibold uppercase text-center py-2 rounded-full">
            Rebase End Time
          </span>
          <span className="text-gradient text-2xl lg:text-4xl font-bold block mt-12">
            {rebaseEndTime && (
              <Countdown date={rebaseEndTime}>
                <Completionist />
              </Countdown>
            )}
          </span>
        </div>
      </div>

      <p className="mt-12 text-gradient font-bold text-xl">
        Revolutionizing Decentralized Finance with Innovation and Accessibility
      </p> */}
    </div>
  );
}

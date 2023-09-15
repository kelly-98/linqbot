import { useEffect, useState } from "react";
import useApp from "../../hooks/useApp";
import { useAccount, useNetwork } from "wagmi";
import useAnalysis from "../../hooks/useAnalysis";
import useErc20 from "../../hooks/useERC20";
import Countdown from "react-countdown";

const Completionist = () => <span>0d:0h:0m:0s</span>;

export default function Pool() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { fetchData } = useAnalysis();
  const { getTotalSupply, getETH } = useErc20();
  const { getNextRebase, getRebaseEndTime } = useApp();
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
    const data = await fetchData();
    setAnalysis(data);
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-14">
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
      </p>
    </div>
  );
}

import { useEffect, useState } from "react";
import useApp from "../../hooks/useApp";
import { useAccount, useNetwork } from "wagmi";
import useAnalysis from "../../hooks/useAnalysis";
import useErc20 from "../../hooks/useERC20";
import Countdown from "react-countdown";

const Completionist = () => <span>0d:0h:01m:0s</span>;

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
      <h1>Marketcap: ${(totalSupply * analysis.price).toFixed(2)}</h1>
      <h1>Price: ${analysis.price}</h1>
      <h1>Liquidity: ${analysis.liquidity}</h1>
      <h1>ROR: 2100%</h1>
      <h1>Total Distributed: {(totalSupply - 1e6).toFixed(2)}</h1>
      <h1>Staking Reward: {stakingReward.toFixed(2)}</h1>
      <h1>ROI: 2000%</h1>
      <h1>Next Rebase: {nextRebase}</h1>
      <h1>Rebase End Time: {rebaseEndTime}</h1>
    </div>
  );
}

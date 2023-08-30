import React, { useEffect, useState, useCallback } from "react";
import Countdown from "react-countdown";
import { toast } from "react-hot-toast";

// import PoolRightImg from "../../assets/image/eth-2.svg";

import useApp from "../../hooks/useApp";
import "./style.scss";
import { useWeb3React } from "@web3-react/core";
import useErc20 from "../../hooks/useERC20";

import gif2 from "../../assets/image/gif-2.gif";
import gif1 from "../../assets/image/gif-1.gif";

const Completionist = () => <span>You are good to go!</span>;

export default function Claim() {
  const { account, chainId, active } = useWeb3React();
  const { dividendTokenBalanceOf, getTotalDividendsDistributed, claim } =
    useApp();

  const [reload, setReload] = useState(Date.now());
  const [totalDividendsDistributed, setTotalDividendsDistributed] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);

  const getData = async () => {
    const dividendsDistributed = await getTotalDividendsDistributed();
    setTotalDividendsDistributed(Number(dividendsDistributed.toFixed(5)));
    const balance = await dividendTokenBalanceOf();
    setPendingBalance(Number(balance.toFixed(5)));
  };

  const onClaimClicked = async () => {
    if (!active) return;
    if (!account) return;
    try {
      await claim();
      setReload(Date.now());
      toast.success("Claim successfully");
    } catch (error) {
      if (error.code == 4001 || error.code == "ACTION_REJECTED")
        toast.error("User rejected the transaction");
    }
  };

  useEffect(() => {
    getData();
  }, [account, chainId, reload]);

  return (
    <section className="w-full py-5 flex justify-center items-center text-center">
      <div className="w-full">
        <div className="relative">
          <h3 className="relative z-10 text-4xl uppercase">Claim LP Rewards</h3>
          <div className="relative z-10 text-lg border-[1px] custom-shadow  my-10 border-[#9F68B2] bg-black/30 max-w-2xl mx-auto rounded-xl py-8 px-5 lg:py-12 lg:px-14">
            <div className="flex justify-between pb-8 border-b-[1px] border-white">
              <h3 className="lg:uppercase">Pending LP Rewards: </h3>
              <span>{pendingBalance}</span>
            </div>
            <div className="flex justify-between pt-8">
              <h3 className="lg:uppercase">Total LP Distributed: </h3>
              <span>{totalDividendsDistributed}</span>
            </div>
            <button
              className="mt-12 btn-primary py-4 rounded-md px-10 text-xl font-semibold uppercase"
              onClick={onClaimClicked}
            >
              LP claim
            </button>
          </div>
          <div className="max-w-[250px] mx-auto my-5">
            <img src={gif1} alt="" />
          </div>
          <div className="absolute z-0 max-w-[200px] -top-5 -rotate-[25deg]">
            <img className="" src={gif2} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

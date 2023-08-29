import React, { useEffect, useState, useCallback } from "react";
import Countdown from "react-countdown";
import { toast } from "react-hot-toast";

import windowBg from "../../assets/image/window.png";
import btn from "../../assets/image/btn.png";

// import PoolRightImg from "../../assets/image/eth-2.svg";

import useApp from "../../hooks/useApp";
import "./style.scss";
import { useWeb3React } from "@web3-react/core";
import useErc20 from "../../hooks/useERC20";

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

  // useEffect(() => {
  //   getData();
  // }, [account, chainId, reload]);

  return (
    <section className="relative">
      <img className="hidden lg:block" src={windowBg} alt="" />
      <span className="hidden lg:block absolute top-[2px] left-[50%] -translate-x-2/4">
        Claim LP
      </span>
      <div className="px-10 relative lg:absolute lg:top-12 w-full">
        <div className="py-3 text-center flex justify-center claim-border-bottom">
          <span className="text-xl font-title bg-[#C6C6C6] text-black px-5 py-2">
            Dividends Info
          </span>
        </div>

        <div className="py-2 text-center flex flex-col justify-center claim-border-bottom text-black">
          <span className="font-title">Dividends Holding</span>
          <span>...</span>
        </div>
        <div className="py-2 text-center flex flex-col justify-center claim-border-bottom text-black">
          <span className="font-title">$WLinq Holding</span>
          <span>...</span>
        </div>
        <div className="py-2 text-center flex flex-col justify-center claim-border-bottom text-black">
          <span className="font-title">Claimable</span>
          <span>...</span>
        </div>
        <div className="py-2 text-center flex flex-col justify-center claim-border-bottom text-black">
          <span className="font-title">Claimed</span>
          <span>...</span>
        </div>
        <div className="flex justify-center mt-3">
          <button
            className="relative w-40"
            // onClick={onClaimClicked}
          >
            <img className="" src={btn} alt="" />
            <span className="underline absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 text-black text-xl">
              Claim
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

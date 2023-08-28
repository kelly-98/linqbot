import React, { useEffect, useState, useCallback } from "react";
import Countdown from "react-countdown";
import { toast } from "react-hot-toast";

// import PoolRightImg from "../../assets/image/eth-2.svg";

// import Home from "../../assets/image/GIF.gif";

import useApp from "../../hooks/useApp";
import "./style.scss";
import { useWeb3React } from "@web3-react/core";
import useErc20 from "../../hooks/useERC20";

const Completionist = () => <span>You are good to go!</span>;

export default function Pool() {
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
      <div className="w-full text-black">
        <h2 className="text-3xl font-bold lg:text-5xl">
          Decentralized liquidity
        </h2>

        <p className="text-lg mt-5">
          Fostering a Hybrid Future: Pioneering the Blueprint for an
          Interconnected Tomorrow.
          <br />
          0x8b9a53321ee0f6aa1bea3a26a231cac6386ba777
        </p>

        <div className="bg-white my-10 max-w-xl mx-auto p-5 rounded-xl lg:px-8 lg:py-14">
          <h3 className="text-lg font-semibold uppercase">Claim LP Rewards</h3>

          <div className="flex mt-10  justify-between pb-8 border-b-[1px] border-[#6B7280]">
            <h3>Pending LP Rewards: </h3>
            <span>{pendingBalance}</span>
          </div>
          <div className="flex justify-between py-8 border-b-[1px] border-[#6B7280]">
            <h3>Total LP Distributed: </h3>
            <span>{totalDividendsDistributed}</span>
          </div>
          <div className="flex justify-start">
            <button
              className="btn-primary mt-12 py-3 px-5 text-xl font-semibold uppercase"
              onClick={onClaimClicked}>
              Claim
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useState, useCallback } from "react";
import Countdown from "react-countdown";
import { toast } from "react-hot-toast";

// import PoolRightImg from "../../assets/image/eth-2.svg";

import PoolBg from "../../assets/image/bg.svg";

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
    <section className="pool">
      <div className="pool-bg">
        <img src={PoolBg} alt="" />
      </div>
      <h4 className="text-center uppercase text-2xl font-bold text-[#00FFE0]">
        the road to profit
      </h4>
      <p className="max-w-3xl mx-auto relative mt-4 text-center">
        Stake your $LABS that you are holding in the staking system and earn
        passive income.
      </p>
      <div className="pool-wrapper mt-16">
        <div className="pool-left">
          <div className="row" style={{ flexDirection: "column" }}>
            <h4 className="sub-title font-bold">STAKING FARM</h4>
            <p>
              <h3>Pending LP Rewards: {pendingBalance}</h3>
            </p>
            <p>
              <h3>Total LP Distributed: {totalDividendsDistributed}</h3>
            </p>
            <button onClick={onClaimClicked}>Claim</button>
          </div>
        </div>
        <div className="pool-right flex flex-col justify-center">
          <h4 className="sub-title">HOW IT WORK</h4>
          <div className="pool-right-wrapper">
            {/* <div className="pool-right-img">
              <img src={PoolRightImg} alt="pool-right-img" />
            </div> */}
            <ul className="pool-right-content-list">
              <li className="pool-right-content-item">
                <div className="pool-circle">
                  <div className="pool-circle-inner"></div>
                </div>
                <p>Staking use $LABS token to stake</p>
              </li>
              <li className="pool-right-content-item">
                <div className="pool-circle">
                  <div className="pool-circle-inner"></div>
                </div>
                <p>
                  You need to shill the project with us and get a revenue share
                  from TAX
                </p>
              </li>
              <li className="pool-right-content-item">
                <div className="pool-circle">
                  <div className="pool-circle-inner"></div>
                </div>
                <p>
                  You need to deposit at least 10,000 $LABS to start staking and
                  get rewards
                </p>
              </li>
              <li className="pool-right-content-item">
                <div className="pool-circle">
                  <div className="pool-circle-inner"></div>
                </div>
                <p>
                  For each round, submit at least 3 post links to be eligible to
                  claim the reward
                </p>
              </li>
              <li className="pool-right-content-item">
                <div className="pool-circle">
                  <div className="pool-circle-inner"></div>
                </div>
                <p>
                  For each stake, you need to wait 1 hour for withdrawal your
                  tokens
                </p>
              </li>
            </ul>
            {/* <div className="pool-right-content-list-wrapper ">
              <ul className="pool-right-content-list">
                <li className="pool-right-content-item">
                  <div className="pool-circle">
                    <div className="pool-circle-inner"></div>
                  </div>
                  <p>Staking use $LABS token to stake</p>
                </li>
                <li className="pool-right-content-item">
                  <div className="pool-circle">
                    <div className="pool-circle-inner"></div>
                  </div>
                  <p>
                    You need to shill the project with us and get a revenue
                    share from TAX
                  </p>
                </li>
                <li className="pool-right-content-item">
                  <div className="pool-circle">
                    <div className="pool-circle-inner"></div>
                  </div>
                  <p>
                    You need to deposit at least 10,000 $LABS to start staking
                    and get rewards
                  </p>
                </li>
                <li className="pool-right-content-item">
                  <div className="pool-circle">
                    <div className="pool-circle-inner"></div>
                  </div>
                  <p>
                    For each round, submit at least 3 post links to be eligible
                    to claim the reward
                  </p>
                </li>
                <li className="pool-right-content-item">
                  <div className="pool-circle">
                    <div className="pool-circle-inner"></div>
                  </div>
                  <p>
                    For each stake, you need to wait 1 hour for withdrawal your
                    tokens
                  </p>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

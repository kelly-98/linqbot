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
  const { balanceOf } = useErc20();
  const {
    getTotalStakedAmount,
    getCalculateReward,
    getEndTime,
    stake,
    claim,
    unstake,
    getStakers,
    shill,
  } = useApp();

  const [reload, setReload] = useState(Date.now());
  const [depositValue, setDepositValue] = useState(1);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [totalStakedAmount, setTotalStakedAmount] = useState(0);
  const [reward, setReward] = useState(0);
  const [shilled, setShilled] = useState(false);
  const [endTime, setEndTime] = useState(0);
  const [yourStaked, setYourStaked] = useState(0);
  const [twValue1, setTwValue1] = useState("");
  const [twValue2, setTwValue2] = useState("");
  const [twValue3, setTwValue3] = useState("");

  const getData = async () => {
    //get twitter value from local storage and set to state
    const totalStakedAmount = await getTotalStakedAmount();
    setTotalStakedAmount(Number(totalStakedAmount.toFixed(2)));
    if (!account) return;
    var key = `twValue1`;
    var value = localStorage.getItem(key);
    setTwValue1(value);
    key = `twValue2`;
    value = localStorage.getItem(key);
    setTwValue2(value);
    key = `twValue3`;
    value = localStorage.getItem(key);
    setTwValue3(value);
    const balance = await balanceOf();
    setTokenBalance(Number(balance.toFixed(2)));
    const info = await getStakers(account);
    setYourStaked(Number(info.stakedAmount.toFixed(2)));
    setShilled(info.shilled);
    const reward = await getCalculateReward(account);
    setReward(Number(reward.toFixed(5)));
  };

  const onTweet1Submit = () => {
    if (!twValue1) return;
    var key = `twValue1`;
    //set to local storage
    localStorage.setItem(key, twValue1);
    toast.success("Tweet 1 submitted");
  };

  const onTweet2Submit = () => {
    if (!twValue2) return;
    var key = `twValue2`;
    //set to local storage
    localStorage.setItem(key, twValue2);
    toast.success("Tweet 2 submitted");
  };

  const onTweet3Submit = () => {
    if (!twValue3) return;
    var key = `twValue3`;
    //set to local storage
    localStorage.setItem(key, twValue3);
    toast.success("Tweet 3 submitted");
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

  const onWithdrawClicked = async () => {
    if (!active) return;
    if (!account) return;
    try {
      await unstake();
      setReload(Date.now());
      toast.success("Unstake successfully");
    } catch (error) {
      if (error.code == 4001 || error.code == "ACTION_REJECTED")
        toast.error("User rejected the transaction");
    }
  };

  const onConfirmYourPostClicked = async () => {
    if (!active) return;
    if (!account) return;
    if (!twValue1 || !twValue2 || !twValue3) return;
    try {
      await shill();
      setReload(Date.now());
      toast.success("Shill successfully");
    } catch (error) {
      if (error.code == 4001 || error.code == "ACTION_REJECTED")
        toast.error("User rejected the transaction");
    }
  };

  const onDepositClicked = async () => {
    if (!active) return;
    if (!account) return;
    if (!depositValue) return;
    try {
      await stake(depositValue);
      setReload(Date.now());
      toast.success("Stake successfully");
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
          <div className="row">
            <h4 className="sub-title font-bold">STAKING FARM</h4>
          </div>

          <div className="flex justify-between mt-5">
            <div className="flex flex-col">
              <span>Total Staked</span>
              <span>
                {totalStakedAmount} <span className="font-bold">$LABS</span>
              </span>
            </div>
            <div className="flex flex-col text-center">
              <span>End time</span>
              <span>
                <Countdown date={1692874800000}>
                  <Completionist />
                </Countdown>
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span>Balance</span>
              <span>
                {tokenBalance} <span className="font-bold">$LABS</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-stretch gap-5 lg:gap-10 mt-5 h-10">
            <div className="pool-input bg-[#3B3B90] flex-1 h-full px-4 rounded-lg">
              <input
                value={depositValue}
                type="number"
                onChange={(e) => {
                  if (+e.target.value >= 0) {
                    setDepositValue(e.target.value);
                  }
                }}
              />
              <div className="pool-input-btn-list">
                <button
                  onClick={() => {
                    setDepositValue(parseInt(tokenBalance));
                  }}
                >
                  MAX
                </button>
              </div>
            </div>
            <button
              className="bg-white text-black h-full px-5 py-1 rounded-md self-stretch"
              onClick={onDepositClicked}
            >
              Deposit
            </button>
          </div>

          <div className="flex justify-between mt-8">
            <div className="flex flex-col">
              <span>Your Staked</span>
              <span>
                {yourStaked} <span className="font-bold">$LABS</span>
              </span>
            </div>

            <div className="flex flex-col text-right">
              <span>Your Reward</span>
              <span>
                {reward} <span className="font-bold">ETH</span>
              </span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-gradient text-2xl font-bold text-center">
              Proof of Shilling Activity
            </h3>

            <div className="flex gap-5 lg:gap-10 h-10 mt-5">
              <input
                className="flex-1 bg-[#3B3B90] rounded-lg px-4"
                placeholder="Post link..."
                value={twValue1}
                onChange={(e) => {
                  setTwValue1(e.target.value);
                }}
              />
              <button
                className="bg-white text-black  h-full px-5 py-1 rounded-md self-stretch"
                onClick={onTweet1Submit}
              >
                Submit
              </button>
            </div>
            <div className="flex gap-5 lg:gap-10 h-10 mt-3">
              <input
                className="flex-1 bg-[#3B3B90] rounded-lg px-4"
                placeholder="Post link..."
                value={twValue2}
                onChange={(e) => {
                  setTwValue2(e.target.value);
                }}
              />
              <button
                className="bg-white text-black  h-full px-5 py-1 rounded-md self-stretch"
                onClick={onTweet2Submit}
              >
                Submit
              </button>
            </div>
            <div className="flex gap-5 lg:gap-10 h-10 mt-3">
              <input
                className="flex-1 bg-[#3B3B90] rounded-lg px-4"
                placeholder="Post link..."
                value={twValue3}
                onChange={(e) => {
                  setTwValue3(e.target.value);
                }}
              />
              <button
                className="bg-white text-black h-full px-5 py-1 rounded-md self-stretch"
                onClick={onTweet3Submit}
              >
                Submit
              </button>
            </div>

            {shilled ? (
              <button className="mt-8 uppercase bg-primary w-full px-5 py-2 rounded-md ">
                SHILLED
              </button>
            ) : (
              <button
                className="mt-8 uppercase bg-primary w-full px-5 py-2 rounded-md "
                onClick={onConfirmYourPostClicked}
              >
                CONFIRM YOUR POST
              </button>
            )}
            {shilled ? (
              <>
                <div className="grid grid-cols-2 gap-5 lg:gap-10 mt-5">
                  <button
                    className="uppercase bg-primary w-full px-5 py-2 rounded-md "
                    onClick={onClaimClicked}
                  >
                    Claim Reward
                  </button>
                  <button
                    className="uppercase bg-primary w-full px-5 py-2 rounded-md "
                    onClick={onWithdrawClicked}
                  >
                    Withdraw Tokens
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-5 lg:gap-10 mt-5">
                  <button className="uppercase bg-stone-300 w-full px-5 py-2 rounded-md ">
                    Shill first
                  </button>
                  <button className="uppercase bg-stone-300 w-full px-5 py-2 rounded-md ">
                    Shill first
                  </button>
                </div>
              </>
            )}
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

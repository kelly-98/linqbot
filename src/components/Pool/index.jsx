import React, { useEffect, useState, useCallback } from "react";
import Countdown from "react-countdown";
import { toast } from "react-hot-toast";

// import PoolRightImg from "../../assets/image/eth-2.svg";

import Home from "../../assets/image/GIF.gif";

import useApp from "../../hooks/useApp";
import "./style.scss";
import { useWeb3React } from "@web3-react/core";
import useErc20 from "../../hooks/useERC20";

export default function Pool() {
  const { account, chainId, active } = useWeb3React();
  const { burnForEth, getStats } = useApp();
  const { balanceOf } = useErc20();

  const [inputValue, setInputValue] = useState(0);

  const [reload, setReload] = useState(Date.now());
  const [balance, setBalance] = useState(0);
  const [stats, setStats] = useState({
    totalBurned: 0,
    totalBurnRewards: 0,
  });

  const getData = async () => {
    const stats = await getStats();
    setStats({
      totalBurned: Number(stats.totalBurned.toFixed(2)),
      totalBurnRewards: Number(stats.totalBurnRewards.toFixed(2)),
    });
    if (!account) return;
    const tokenBalance = await balanceOf();
    setBalance(Number(tokenBalance.toFixed(2)));
  };

  const onBurnClicked = async () => {
    if (!account) return;
    if (inputValue <= 0 && parseInt(inputValue) > balance) {
      toast.error("Invalid Token Value!");
      return;
    }
    try {
      await burnForEth(parseInt(inputValue));
      setReload(Date.now());
      toast.success("Burn successfully!");
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
        <h2 className="text-3xl font-bold lg:text-4xl">
          WELCOME TO $BLAZE BURNT
        </h2>

        <p className="text-lg">
          0x806BE8f7068604FC77bdd8B0d3b58E46b6282DC2
          <br />
          contact@blazeburnt.app
        </p>

        <div className="border-[1px] my-10 border-[#B94300] bg-black/70 max-w-4xl mx-auto p-5 rounded-xl lg:p-8">
          <div className="flex justify-between pb-8">
            <h3 className="text-xl font-bold">TokenBalance: </h3>
            <p className="flex gap-3">
              <span>{balance}</span> <span className="font-bold">$BLAZE</span>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="flex flex-col justify-between py-8 border-[1px] border-[#FF7A00] rounded-xl px-10">
              <h3 className="text-xl border-b-[1px] pb-3 mb-5">Total Burnt</h3>
              <p className="flex justify-between">
                <span>{stats.totalBurned ?? 0}</span>{" "}
                <span className="font-bold">$BLAZE</span>
              </p>
            </div>
            <div className="flex flex-col justify-between py-8 border-[1px] border-[#FF7A00] rounded-xl px-10">
              <h3 className="text-xl border-b-[1px] pb-3 mb-5">
                Total Burnt Rewards
              </h3>
              <p className="flex justify-between">
                <span>{stats.totalBurnRewards ?? 0}</span>{" "}
                <span className="font-bold">ETH</span>
              </p>
            </div>
          </div>
          <h3 className="my-8 text-3xl text-[#FF5C00] font-bold">
            Burn Tokens For ETH
          </h3>
          <div className="flex justify-center gap-5">
            <input
              className="px-3 py-2 text-black min-w-[220px] lg:min-w-[300px] rounded-md"
              placeholder="Amount of tokens...."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              type="number"
            />
            <button
              className="bg-white text-black px-4 rounded-md"
              onClick={() => {
                if (balance) {
                  setInputValue(balance);
                }
              }}>
              MAX
            </button>
          </div>
          <button
            className="mt-8 btn-primary py-3 text-xl font-semibold uppercase rounded-md px-5 text-white"
            onClick={onBurnClicked}>
            Burn To ETH
          </button>
        </div>
      </div>
    </section>
  );
}

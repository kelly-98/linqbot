import React, { useEffect, useState, useCallback } from "react";
import Countdown from "react-countdown";
import { toast } from "react-hot-toast";

// import PoolRightImg from "../../assets/image/eth-2.svg";

import Home from "../../assets/image/GIF.gif";

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

  // useEffect(() => {
  //   getData();
  // }, [account, chainId, reload]);

  return (
    <section className="w-full py-5 flex justify-center items-center text-center">
      <div className="w-full">
        <h2 className="text-3xl font-bold lg:text-5xl">
          LinqBot-Infused Empowerment
        </h2>
        <div className="max-w-[250px] mx-auto my-6">
          <img src={Home} alt="" />
        </div>
        <p className="text-lg">Forging a Connected Tomorrow and Beyond.</p>
        <ul className="flex flex-col justify-center gap-6 my-8 lg:flex-row">
          <a className="uppercase font-bold inline-flex justify-center items-center gap-2 border-[1px] border-[#9AF3FA] bg-[#73a5c233] py-3 px-5 rounded-xl">
            <span>Buy</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_4_149"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect y="3.05176e-05" width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_4_149)">
                <path
                  d="M12 15C12.8333 15 13.5417 14.7084 14.125 14.125C14.7083 13.5417 15 12.8334 15 12C15 11.1667 14.7083 10.4584 14.125 9.87503C13.5417 9.2917 12.8333 9.00003 12 9.00003C11.1667 9.00003 10.4583 9.2917 9.875 9.87503C9.29167 10.4584 9 11.1667 9 12C9 12.8334 9.29167 13.5417 9.875 14.125C10.4583 14.7084 11.1667 15 12 15ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6834 2 13.3834 2 12C2 10.6167 2.2625 9.3167 2.7875 8.10003C3.3125 6.88336 4.025 5.82503 4.925 4.92503C5.825 4.02503 6.88333 3.31253 8.1 2.78753C9.31667 2.26253 10.6167 2.00003 12 2.00003C13.3833 2.00003 14.6833 2.26253 15.9 2.78753C17.1167 3.31253 18.175 4.02503 19.075 4.92503C19.975 5.82503 20.6875 6.88336 21.2125 8.10003C21.7375 9.3167 22 10.6167 22 12C22 13.3834 21.7375 14.6834 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z"
                  fill="#D9D9D9"
                />
              </g>
            </svg>
          </a>
          <a className="uppercase font-bold inline-flex justify-center items-center gap-2 border-[1px] border-[#9AF3FA] bg-[#73a5c233] py-3 px-5 rounded-xl">
            <span>Chart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_4_185"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect y="3.05176e-05" width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_4_185)">
                <path
                  d="M7.4 16L10.45 12.95L12.45 14.95L16 11.425V13H18V8.00003H13V10H14.575L12.45 12.125L10.45 10.125L6 14.6L7.4 16ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0209 3 19.55 3 19V5.00003C3 4.45003 3.19583 3.9792 3.5875 3.58753C3.97917 3.19586 4.45 3.00003 5 3.00003H19C19.55 3.00003 20.0208 3.19586 20.4125 3.58753C20.8042 3.9792 21 4.45003 21 5.00003V19C21 19.55 20.8042 20.0209 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5Z"
                  fill="white"
                />
              </g>
            </svg>
          </a>
          <a
            href="https://t.me/Linq_App_Bot"
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase font-bold inline-flex justify-center items-center gap-2 border-[1px] border-[#9AF3FA] bg-[#73a5c233] py-3 px-5 rounded-xl"
          >
            <span>bot</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_4_191"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_4_191)">
                <path
                  d="M4 15C3.16667 15 2.45833 14.7083 1.875 14.125C1.29167 13.5417 1 12.8333 1 12C1 11.1667 1.29167 10.4583 1.875 9.875C2.45833 9.29167 3.16667 9 4 9V7C4 6.45 4.19583 5.97917 4.5875 5.5875C4.97917 5.19583 5.45 5 6 5H9C9 4.16667 9.29167 3.45833 9.875 2.875C10.4583 2.29167 11.1667 2 12 2C12.8333 2 13.5417 2.29167 14.125 2.875C14.7083 3.45833 15 4.16667 15 5H18C18.55 5 19.0208 5.19583 19.4125 5.5875C19.8042 5.97917 20 6.45 20 7V9C20.8333 9 21.5417 9.29167 22.125 9.875C22.7083 10.4583 23 11.1667 23 12C23 12.8333 22.7083 13.5417 22.125 14.125C21.5417 14.7083 20.8333 15 20 15V19C20 19.55 19.8042 20.0208 19.4125 20.4125C19.0208 20.8042 18.55 21 18 21H6C5.45 21 4.97917 20.8042 4.5875 20.4125C4.19583 20.0208 4 19.55 4 19V15ZM9 13C9.41667 13 9.77083 12.8542 10.0625 12.5625C10.3542 12.2708 10.5 11.9167 10.5 11.5C10.5 11.0833 10.3542 10.7292 10.0625 10.4375C9.77083 10.1458 9.41667 10 9 10C8.58333 10 8.22917 10.1458 7.9375 10.4375C7.64583 10.7292 7.5 11.0833 7.5 11.5C7.5 11.9167 7.64583 12.2708 7.9375 12.5625C8.22917 12.8542 8.58333 13 9 13ZM15 13C15.4167 13 15.7708 12.8542 16.0625 12.5625C16.3542 12.2708 16.5 11.9167 16.5 11.5C16.5 11.0833 16.3542 10.7292 16.0625 10.4375C15.7708 10.1458 15.4167 10 15 10C14.5833 10 14.2292 10.1458 13.9375 10.4375C13.6458 10.7292 13.5 11.0833 13.5 11.5C13.5 11.9167 13.6458 12.2708 13.9375 12.5625C14.2292 12.8542 14.5833 13 15 13ZM8 17H16V15H8V17Z"
                  fill="white"
                />
              </g>
            </svg>
          </a>
          <a
            className="uppercase font-bold inline-flex justify-center items-center gap-2 border-[1px] border-[#9AF3FA] bg-[#73a5c233] py-3 px-5 rounded-xl"
            href="https://linqbot.gitbook.io/docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>docs</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_4_116"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_4_116)">
                <path
                  d="M12 16L16 12L12 8L10.6 9.4L12.2 11H8V13H12.2L10.6 14.6L12 16ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z"
                  fill="white"
                />
              </g>
            </svg>
          </a>
        </ul>
        <h3 className="text-lg">Claim LP Rewards</h3>
        <div className="border-[1px] my-10 border-[#9AF3FA] max-w-2xl mx-auto p-5 rounded-xl lg:p-8">
          <div className="flex justify-between pb-8 border-b-[1px] border-white">
            <h3>Pending LP Rewards: </h3>
            <span>{pendingBalance}</span>
          </div>
          <div className="flex justify-between py-8">
            <h3>Total LP Distributed: </h3>
            <span>{totalDividendsDistributed}</span>
          </div>
          <button
            className="btn-primary py-3 text-xl font-semibold uppercase w-full rounded-full"
            // onClick={onClaimClicked}
          >
            Claim
          </button>
        </div>
      </div>
    </section>
  );
}

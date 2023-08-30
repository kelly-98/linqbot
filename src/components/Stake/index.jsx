import React, { useEffect, useState, useCallback } from "react";

// import PoolRightImg from "../../assets/image/eth-2.svg";
import stake from "../../assets/image/stake.png";

import gif1 from "../../assets/image/stake-1.gif";

export default function Stake() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="w-full py-5 flex justify-center items-center text-center">
      <div className="w-full">
        <div className="relative">
          <h3 className="relative z-10 text-4xl uppercase">7 day staking</h3>
          <div className="relative z-10 text-lg border-[1px] custom-shadow  my-10 border-[#9F68B2] bg-black/30 max-w-4xl mx-auto rounded-xl py-8 px-5 lg:py-12 lg:px-14">
            <div className="grid grid-cols-2 gap-10">
              <div className="justify-self-start lg:justify-self-center">
                <h4
                  className={`w-fit text-center cursor-pointer text-xl uppercase border-[#9F68B2] border-[1px] px-5 py-2 rounded-lg ${
                    activeTab === 0 ? "bg-[#9F68B2]" : ""
                  }`}
                  onClick={() => {
                    setActiveTab(0);
                  }}
                >
                  overview
                </h4>
              </div>
              <div className="justify-self-end lg:justify-self-center">
                <h4
                  className={`w-fit cursor-pointer text-xl uppercase border-[#9F68B2] border-[1px] px-5 py-2 rounded-lg ${
                    activeTab === 1 ? "bg-[#9F68B2]" : ""
                  }`}
                  onClick={() => {
                    setActiveTab(1);
                  }}
                >
                  stake
                </h4>
              </div>
            </div>
            {activeTab === 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 auto-rows-fr mt-10">
                <div className="py-5 rounded-lg px-6 lg:px-11 border-[1px] custom-shadow border-[#9F68B2]">
                  <h4 className="text-lg uppercase">available rewards:</h4>
                  <input
                    type="number"
                    defaultValue={0}
                    className="w-full rounded-lg border-[1px] mt-8 custom-shadow border-[#9F68B2] bg-black px-5 py-3 text-xl text-center"
                  />
                  <button
                    disabled
                    className="cursor-not-allowed opacity-50 w-full mt-8 btn-primary py-4 rounded-md px-5 text-lg font-semibold uppercase"
                  >
                    collect reward
                  </button>
                </div>
                <div className="w-full py-5 rounded-lg px-6 lg:px-11 border-[1px] custom-shadow border-[#9F68B2] flex flex-col justify-between flex-1">
                  <h4 className="text-lg uppercase">unstake status:</h4>
                  <span className="uppercase  mt-8">unavailable</span>
                  <button
                    disabled
                    className="cursor-not-allowed opacity-50 w-full mt-8 btn-primary py-4 rounded-md px-5 text-lg font-semibold uppercase"
                  >
                    unstake
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-10">
                <div className="max-w-sm mx-auto flex justify-center items-center">
                  <input
                    className="w-full rounded-lg border-[1px] custom-shadow border-[#9F68B2] border-r-0 rounded-tr-none rounded-br-none bg-black px-5 py-3 text-xl text-center"
                    type="number"
                    defaultValue={0}
                  />
                  <span className="inline-flex rounded-tr-lg rounded-br-lg h-full cursor-pointer border-[1px] border-[#9F68B2] bg-black py-3 text-xl px-3">
                    MAX
                  </span>
                </div>
                <button
                  disabled
                  className="cursor-not-allowed opacity-50 w-fit mt-8 btn-primary py-4 rounded-md px-10 text-lg font-semibold uppercase"
                >
                  stake
                </button>
              </div>
            )}
          </div>
          <div className="max-w-[250px] mx-auto my-5">
            <img src={gif1} alt="" />
          </div>
          <div className="absolute z-0 top-0 max-w-[250px] lg:z-20 lg:top-20 left-0 lg:-left-32">
            <img className="" src={stake} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

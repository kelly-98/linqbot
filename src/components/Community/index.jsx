import React from "react";
import swap from "../../assets/image/dogswap.svg";
import ds from "../../assets/image/ds.svg";
import dextools from "../../assets/image/dextools.svg";
import scout from "../../assets/image/scout.svg";
import cmc from "../../assets/image/cmc.svg";

import "./style.scss";

function Community() {
  return (
    <div className="pt-[100px] relative">
      <h3 className="text-gradient text-center text-2xl uppercase font-bold relative">
        Our trusted supporters
      </h3>
      <div className="relative grid max-w-[200px] mx-auto grid-cols-1 gap-5 mt-10 lg:grid-cols-5 lg:max-w-none">
        <div className="flex justify-center items-center">
          <img src={swap} alt="" />
        </div>
        <div className="flex justify-center items-center">
          <img src={scout} alt="" />
        </div>
        <div className="flex justify-center items-center">
          <img src={ds} alt="" />
        </div>
        <div className="flex justify-center items-center">
          <img src={dextools} alt="" />
        </div>
        <div className="flex justify-center items-center">
          <img src={cmc} alt="" />
        </div>
      </div>

      <div className="community bg-cover max-w-2xl mx-auto py-10 px-5 lg:p-10 rounded-xl flex flex-col justify-center items-center mt-[100px] relative z-50">
        <p className="text-2xl font-bold uppercase text-center ">
          Join the most vibrant community and become a part of us
        </p>
        <ul className="flex gap-5 mt-5 lg:mt-10">
          <li>
            <a
              href="https://twitter.com/WindowsLiquid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
          <li>
            <a
              href="https://t.me/WindowsLiquidity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl"
            >
              <i className="fa-brands fa-telegram"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Community;

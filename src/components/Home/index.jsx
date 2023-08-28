import React from "react";
import windowBg from "../../assets/image/window-2.png";

export default function Home() {
  return (
    <section className="relative">
      <img className="hidden lg:block" src={windowBg} alt="" />
      <span className="hidden lg:block absolute top-[2px] left-[50%] -translate-x-2/4">
        Home
      </span>
      <div className="px-10 relative text-center lg:text-left lg:absolute lg:top-20">
        <p className="text-black">
          Windows Liquidity serves as an embodiment of the relentless innovation
          driving the blockchain and DeFi ecosystems, offering inclusive avenues
          for everyone to engage, optimize their earnings, and play a part in
          shaping a more equitable financial terrain
        </p>
        <p className="text-black mt-8">
          <span className="font-bold font-title">Contract: </span>{" "}
          <span>0x000000000000000000000000000000000000000</span>
        </p>
        <a className="mt-8 block text-[#0038ff] underline">BUY LINK</a>
        <a className="block mt-3 text-[#0038ff] underline">CHART LINK</a>
      </div>
    </section>
  );
}

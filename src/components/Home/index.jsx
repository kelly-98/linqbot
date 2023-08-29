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
          <span>0xFb596FAc783C2169973FF38F2139C1C0E5254B36</span>
        </p>
        <p className="text-black mt-8">
          <span className="font-bold font-title">Email: </span>{" "}
          <span>contact@wlinq.com</span>
        </p>
        <a className="mt-8 block text-[#0038ff] underline" href="https://app.uniswap.org/#/tokens/ethereum/0xfb596fac783c2169973ff38f2139c1c0e5254b36">BUY LINK</a>
        <a className="block mt-3 text-[#0038ff] underline" href="https://www.dextools.io/app/en/ether/pair-explorer/0x901f40d2337977c13ae9477e569022fbecf443fc">CHART LINK</a>
      </div>
    </section>
  );
}

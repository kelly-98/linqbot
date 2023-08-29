import React, { useEffect, useState } from "react";

import windowBg from "../../assets/image/window-2.png";

export default function Analytics() {
  const [price, setPrice] = useState(0);
  const [liquidity, setLiquidity] = useState(0);
  useEffect(() => {
    fetch("https://api.wlinq.com/").then(async (res) => {
      const body = await res.json();
      setPrice(body.tokenPrice);
      setLiquidity(body.poolPrice);
    });
  }, []);
  return (
    <section className="relative">
      <img className="hidden lg:block" src={windowBg} alt="" />
      <span className="hidden lg:block absolute top-[2px] left-[50%] -translate-x-2/4">
        Analytics
      </span>
      <div className="px-10 relative lg:absolute lg:top-12 w-full">
        <div className="py-3 text-center flex justify-center claim-border-bottom">
          <span className="text-xl font-title bg-[#C6C6C6] text-black px-5 py-2">
            Analytics
          </span>
        </div>

        <div className="py-2 text-center flex flex-col justify-center claim-border-bottom text-black">
          <span className="font-title">$WLinq Price</span>
          <span>${price}</span>
        </div>
        <div className="py-2 text-center flex flex-col justify-center claim-border-bottom text-black">
          <span className="font-title">Liquidity</span>
          <span>${liquidity.toLocaleString()}</span>
        </div>
      </div>
    </section>
  );
}

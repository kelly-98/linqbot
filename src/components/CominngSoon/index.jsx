import React, { useEffect, useState, useCallback } from "react";

// import PoolRightImg from "../../assets/image/eth-2.svg";

import gif1 from "../../assets/image/gif-1.gif";

export default function ComingSoon() {
  return (
    <section className="w-full py-5 flex justify-center items-center text-center">
      <div className="w-full">
        <div className="relative">
          <h3 className="relative z-10 text-4xl uppercase">coming soon</h3>

          <div className="max-w-[250px] mx-auto my-5">
            <img src={gif1} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

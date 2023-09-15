import React from "react";
import logo2 from "../../assets/image/logo-2.png";
import comingsoon from "../../assets/image/comingsoon.png";

export default function Stake() {
  return (
    <div className="pb-5 flex flex-col justify-center items-center">
      <div className="max-w-md">
        <img src={comingsoon} alt="" />
      </div>
      <div className="max-w-xl">
        <img src={logo2} alt="" />
      </div>
    </div>
  );
}

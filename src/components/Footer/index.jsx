import React from "react";
import tg from "../../assets/image/tg.svg";
import tw from "../../assets/image/tw.svg";
import dt from "../../assets/image/dt.svg";
import ether from "../../assets/image/ether.svg";

import "./style.scss";

export default function Footer() {
  return (
    <div className="pb-5 flex gap-5 justify-center items-center">
      <a
        href="https://t.me/ElongateERC"
        target="_blank"
        rel="noopener noreferrer">
        <img src={tg} alt="" />
      </a>
      <a
        href="https://twitter.com/elongateerc20"
        target="_blank"
        rel="noopener noreferrer">
        <img src={tw} alt="" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <img src={dt} alt="" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <img src={ether} alt="" />
      </a>
    </div>
  );
}

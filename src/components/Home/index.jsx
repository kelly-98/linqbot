import React from "react";
import gif1 from "../../assets/image/gif-1.gif";
import ball from "../../assets/image/ball.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="mt-[180px] w-full min-h-screen py-5 flex flex-col gap-12 justify-center items-center text-center">
      <div className="relative min-w-[200px]">
        <img className="hidden max-w-xs lg:block" src={gif1} alt="" />
        <Link
          to="/claim"
          className="absolute -top-32 left-[50%] -translate-x-2/4 max-w-[150px] transition-all hover:scale-95 hover:opacity-75">
          <img src={ball} alt="" />
          <span className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 text-shadow uppercase">
            Lp Claim
          </span>
        </Link>
        <Link
          to="/analytics"
          className="absolute -bottom-48 left-[50%] -translate-x-2/4  max-w-[150px] transition-all hover:scale-95 hover:opacity-75">
          <img src={ball} alt="" />
          <span className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 text-shadow uppercase">
            Analytics
          </span>
        </Link>
        <a className="absolute -left-20 lg:-left-44 top-0 max-w-[130px] lg:max-w-[150px] transition-all hover:scale-95 hover:opacity-75">
          <img src={ball} alt="" />
          <span className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 text-shadow uppercase">
            Socials
          </span>
        </a>
        <Link
          to="/stake"
          className="absolute -right-20 lg:-right-44 top-0 max-w-[130px] lg:max-w-[150px] transition-all hover:scale-95 hover:opacity-75">
          <img src={ball} alt="" />
          <span className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 text-shadow uppercase">
            Lp staking
          </span>
        </Link>
        <a className="absolute -left-20 lg:-left-44 -bottom-10 max-w-[130px] lg:max-w-[150px] transition-all hover:scale-95 hover:opacity-75">
          <img src={ball} alt="" />
          <span className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 text-shadow uppercase">
            Buy $LINW
          </span>
        </a>
        <a
          href="https://www.dextools.io/app/en/ether/pair-explorer/0x353a43322534d1fe56bfc9b9aff34e78437bb9d5"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute -right-20 lg:-right-44 -bottom-10 max-w-[130px] lg:max-w-[150px] transition-all hover:scale-95 hover:opacity-75">
          <img src={ball} alt="" />
          <span className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 text-shadow uppercase">
            Chart
          </span>
        </a>
      </div>
      <h2 className="pt-[200px] text-4xl">DECENTRALIZED LIQUIDITY</h2>
      <div className="max-w-md flex flex-col gap-5">
        <a className="border-[1px] bg-black/30 border-[#9f68b2] rounded-lg py-4 px-5 transition-all hover:opacity-70 hover:scale-105">
          ABOUT
        </a>
        <a
          href="https://liquidwitch.gitbook.io/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="border-[1px] bg-black/30 border-[#9f68b2] rounded-lg py-4 px-5 transition-all hover:opacity-70 hover:scale-105">
          DOCS
        </a>
        <a className="border-[1px] bg-black/30 border-[#9f68b2] rounded-lg py-4 px-5 transition-all hover:opacity-70 hover:scale-105">
          CONTACT
        </a>
        <p className="my-5 text-xl">
          Empowering a Hybrid Future: Building a Connected Tomorrow.
        </p>
        <p>
          {" "}
          0x9894331c4adce8c746192f2cffdc0a6912145c83
          <br />
          contact@liquidwitch.com
        </p>
      </div>
    </section>
  );
}

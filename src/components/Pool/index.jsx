import { toast } from "react-hot-toast";

import { useEffect, useState } from "react";
import useApp from "../../hooks/useApp";
import { useAccount, useNetwork } from "wagmi";

import line from "../../assets/image/curve.png";
import bb from "../../assets/image/bb.png";
import Countdown from "react-countdown";

const Completionist = () => <span>You are good to go!</span>;

export default function Pool() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [reload, setReload] = useState(Date.now());
  const [claimableTokens, setClaimableTokens] = useState(0);
  const { claimTokens, getClaimableTokens } = useApp();
  const claimButtonClicked = async () => {
    await claimTokens();
    setReload(Date.now());
  };

  const getData = async () => {
    if (chain?.unsupported) return;
    const data = await getClaimableTokens();
    setClaimableTokens(data);
  };

  // useEffect(() => {
  //   getData();
  // }, [reload, chain, address]);

  return (
    <div className="text-center py-16">
      <h2 className="text-2xl lg:text-5xl font-bold">
        Claim your tokens from TAX <br />
        via Boost Smart Contract
      </h2>
      <div className="max-w-xs mx-auto">
        <img src={line} alt="" />
      </div>
      <div className="bg-white mt-16 rounded-2xl text-black px-12 py-16 flex justify-between font-bold">
        <span>Token Available: </span>
        <span>{claimableTokens} $BOOST</span>
      </div>
      <button
        className="btn mt-10 justify-center btn-primary font-semibold uppercase text-center rounded px-10 py-4"
        // onClick={claimButtonClicked}
      >
        Claim
      </button>

      <div className="mt-16">
        <h4 className="font-semibold">VERIFIED SMART CONTRACT ADDRESS </h4>
        <Countdown
          className="font-bold text-4xl mt-3 block"
          date={new Date(2023, 8, 6, 12, 30)}
        >
          <Completionist />
        </Countdown>
      </div>

      <ul className="mt-[100px] flex flex-col gap-4">
        <li className="text-left flex gap-2">
          <div className="flex-shrink-0">
            <img className="w-8" src={bb} alt="" />
          </div>
          <span className="leading-6">
            Users who bought Boost Coin within the initial hour of its launch
            faced a tax ranging from 30% to 5%, based on their acquisition time
            within that hour.
          </span>
        </li>
        <li className="text-left flex gap-2">
          <div className="flex-shrink-0">
            <img className="w-8" src={bb} alt="" />
          </div>
          <span className="leading-6">
            If you fall into this category and haven't sold or transferred any
            of your tokens, you are entitled to claim 100% of the taxed tokens.
          </span>
        </li>
        <li className="text-left flex gap-2">
          <div className="flex-shrink-0">
            <img className="w-8" src={bb} alt="" />
          </div>
          <span className="leading-6">
            For those who bought during the first hour and then sold or
            transferred tokens, there’s still a chance to claim 75% of your
            taxed tokens. To be eligible, your wallet balance must match or
            exceed your initial one-hour acquisition. If your balance falls
            short, you can purchase additional tokens during the claim period to
            seize this opportunity.
          </span>
        </li>
        <li className="text-left flex gap-2">
          <div className="flex-shrink-0">
            <img className="w-8" src={bb} alt="" />
          </div>
          <span className="leading-6">
            In order to claim your tokens, please connect your wallet and click
            the ‘claim’ button below. If the button is absent, it means there
            are no tokens available for you to claim.
          </span>
        </li>
      </ul>
    </div>
  );
}

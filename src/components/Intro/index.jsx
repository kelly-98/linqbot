import React from "react";
import icon from "../../assets/image/header-icon.svg";
// import IntroMainImg from "../../assets/image/logo.png";
import "./style.scss";

export default function Intro() {
  return (
    <section className="intro flex-col-reverse lg:flex-row">
      <div className="intro-left">
        <div className="intro-left-content">
          <h3 className="uppercase text-6xl font-bold intro-gradient-title lg:text-9xl">
            SHIBARIUM
          </h3>
          <div className="flex gap-5">
            <h3 className="uppercase text-6xl font-bold lg:text-9xl">LABS</h3>
            <div>
              <img src={icon} alt="" />
            </div>
          </div>

          <p className="my-8 max-w-xl">
            Sharing revenue from TAX on Shibarium through the flexible staking
            system in Shibarium Labs.
          </p>
        </div>
        <div className="intro-left-btn-list">
          <a
            className="btn btn-small bg-white text-black"
            rel="noopener noreferrer"
            href="#"
            target="_blank"
          >
            Buy $LABS
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-small btn-primary"
          >
            Tax Wallet
          </a>
        </div>
      </div>
      <div className="intro-right">
        <div className="intro-right-wrapper">
          {/* <img className="intro-img-bg" src={IntroBgImg} alt="intro-img" /> */}
          {/* <div className="intro-img-main"> */}
          {/* <img className="intro-animation" src={IntroMainImg} alt="intro-img" /> */}
          {/* </div> */}
        </div>
      </div>
    </section>
  );
}

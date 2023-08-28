import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";

import HeaderLogo from "../../assets/image/small-logo.png";
import Logo from "../../assets/image/logo.png";
import useAuth from "../../hooks/useAuth";
import { setupNetwork, switchNetwork } from "../../wallet/ethereum";
// import BSCMiner from "../../assets/docs/BSCMiner-WPP.pdf";

import "./style.scss";
import { toast } from "react-hot-toast";
import useErc20 from "../../hooks/useERC20";
import { useEffect } from "react";

function Modal({ children, shown, close }) {
  return shown ? (
    <div
      className="modal-backdrop"
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}
    >
      <div
        className="modal-content px-6 py-6 text-center flex flex-col justify-between items-center"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <button
          className="modal-custom-close transition-all hover:scale-110"
          onClick={close}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  ) : null;
}

export default function Header() {
  const { login, logout } = useAuth();
  const { account, active, chainId } = useWeb3React();
  const { getETH } = useErc20();

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [eth, setEth] = useState(0);

  const [isCopy, setIsCopy] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const connectButtonClicked = async () => {
    if (active) {
      if (chainId !== Number(process.env.REACT_APP_CHAIN_ID)) {
        // await setupNetwork();
        await switchNetwork(process.env.REACT_APP_CHAIN_ID_HEX);
      } else {
        openModal();
      }
    } else {
      login();
    }
  };
  useEffect(() => {
    setInterval(() => {
      getETH().then((res) => {
        setEth(Number(res.toFixed(4)));
      });
    }, 5000);
  }, []);
  const accountEllipsis = account
    ? `${account.substring(0, 5)}...${account.substring(account.length - 4)}`
    : null;
  return (
    <header className="header flex-col gap-5 lg:flex-row">
      <div className="header-left">
        <div className="header-logo">
          <img src={HeaderLogo} alt="header-logo" />
        </div>
        <ul className="header-menu">
          <li className="header-menu-item">
            <a
              className="header-menu-link"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Staking
            </a>
          </li>
          <li className="header-menu-item">
            <a
              className="header-menu-link"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              How It Works
            </a>
          </li>
          <li className="header-menu-item">
            <a
              className="header-menu-link"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contract
            </a>
          </li>
          <div class="load-icon loading">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </ul>
      </div>
      <button
        // onClick={connectButtonClicked}
        className="btn btn-primary font-semibold"
      >
        {(function () {
          if (active) {
            return chainId !== Number(process.env.REACT_APP_CHAIN_ID)
              ? "Switch network"
              : accountEllipsis;
          } else {
            return "Connect Wallet";
          }
        })()}
      </button>

      <Modal
        shown={modalIsOpen}
        close={() => {
          setIsOpen(false);
        }}
      >
        <div className="">
          <div className="w-20 mx-auto">
            <img src={Logo} alt="" />
          </div>
          <h2 className="text-xl font-bold mt-4 mb-1">{accountEllipsis}</h2>
          <h2 className="font-bold">
            {eth} <span>ETH</span>
          </h2>
        </div>
        <div className="flex gap-10 mt-5">
          <div className="flex flex-col">
            <i
              className={`${
                isCopy ? "fa-solid fa-check" : "fa-regular fa-copy"
              } cursor-pointer mb-3 text-xl transition-all hover:scale-110`}
              onClick={() => {
                if (!isCopy) {
                  navigator.clipboard.writeText(account);
                  setIsCopy(true);
                  setTimeout(() => {
                    setIsCopy(false);
                  }, 2000);
                }
              }}
            ></i>
            <span>{isCopy ? "Copied!" : "Copy Address"}</span>
          </div>
          <div
            className="flex flex-col"
            onClick={() => {
              closeModal();
              logout();
            }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket cursor-pointer mb-3 text-xl transition-all hover:scale-110"></i>
            <span>Disconnect</span>
          </div>
        </div>
      </Modal>
    </header>
  );
}

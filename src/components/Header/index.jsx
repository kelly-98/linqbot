import React, { useState } from "react";
import HeaderLogo from "../../assets/image/small-logo.png";
import Logo from "../../assets/image/logo.png";
import useErc20 from "../../hooks/useERC20";
import { useEffect } from "react";

import "./style.scss";
import { NavLink } from "react-router-dom";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

function Modal({ children, shown, close }) {
  return shown ? (
    <div
      className="modal-backdrop"
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}>
      <div
        className="modal-content px-6 py-6 text-center flex flex-col justify-between items-center"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}>
        <button
          className="modal-custom-close transition-all hover:scale-110"
          onClick={close}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  ) : null;
}

export default function Header() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchNetwork } = useSwitchNetwork();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  const { data: ethBalance } = useBalance({
    address: address,
    enabled: !chain?.unsupported,
    watch: true,
  });

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    if (chain?.unsupported) {
      return;
    }
  }, [isConnected, address]);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const connectButtonClicked = async () => {
    if (isConnected) {
      if (chain?.unsupported) {
        // await setupNetwork();
        await switchNetwork(1);
      } else {
        openModal();
      }
    } else {
      await connect({ connector: connectors[0] });
    }
  };

  const accountEllipsis = address
    ? `${address.substring(0, 5)}...${address.substring(address.length - 4)}`
    : null;
  return (
    <header className="w-full flex item-center justify-between py-4 px-16 bg-black/40 flex-col gap-5 border-b border-b-[#797979] lg:flex-row">
      <div className="header-logo max-w-xs mx-auto lg:mx-0">
        <img src={HeaderLogo} alt="header-logo" />
      </div>
      <ul className="flex items-center text-xl lg:text-2xl justify-center gap-8 lg:gap-16 lg:px-10">
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active font-black" : "link-normal font-light"
          }
          to="/">
          Analytics
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active font-black" : "link-normal font-light"
          }
          to="/stake">
          Staking
        </NavLink>

        {/* <div class="load-icon loading">
          <span></span>
          <span></span>
          <span></span>
        </div> */}
      </ul>
      <div className="flex justify-center items-center">
        <button
          onClick={connectButtonClicked}
          className="btn px-8 justify-center items-center btn-primary font-semibold uppercase text-center py-3 rounded-full h-fit">
          {(function () {
            if (isConnected) {
              return chain?.unsupported ? "Switch network" : accountEllipsis;
            } else {
              return "Connect Wallet";
            }
          })()}
        </button>
      </div>

      <Modal
        shown={modalIsOpen}
        close={() => {
          setIsOpen(false);
        }}>
        <div className="">
          <div className="w-32 lg:w-36 rounded-full overflow-hidden mx-auto">
            <img src={Logo} alt="" />
          </div>
          <h2 className="text-xl font-bold mt-4 mb-1">{accountEllipsis}</h2>
          <h2 className="font-bold">
            {Number(Number(ethBalance?.formatted ?? "0").toFixed(5)) ?? 0}{" "}
            <span>ETH</span>
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
                  navigator.clipboard.writeText(address);
                  setIsCopy(true);
                  setTimeout(() => {
                    setIsCopy(false);
                  }, 3000);
                }
              }}></i>
            <span>{isCopy ? "Copied!" : "Copy Address"}</span>
          </div>
          <div
            className="flex flex-col"
            onClick={() => {
              closeModal();
              disconnect();
            }}>
            <i className="fa-solid fa-arrow-right-from-bracket cursor-pointer mb-3 text-xl transition-all hover:scale-110"></i>
            <span>Disconnect</span>
          </div>
        </div>
      </Modal>
    </header>
  );
}

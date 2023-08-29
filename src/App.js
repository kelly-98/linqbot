import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Claim from "./components/Claim";
import About from "./components/About";
import Home from "./components/Home";
import homeIcon from "./assets/image/home.png";
import claimIcon from "./assets/image/claim.png";
import analytics from "./assets/image/analytics.png";
import doc from "./assets/image/doc.png";
import folder from "./assets/image/folder.png";
import start from "./assets/image/start.png";
import connect from "./assets/image/connect.png";
import disconnect from "./assets/image/disconnect.png";
import clock from "./assets/image/clock.png";
import calc from "./assets/image/calc.png";
import "./common.scss";
import Analytics from "./components/Analytics";

import useAuth from "./hooks/useAuth";
import { useWeb3React } from "@web3-react/core";

import { switchNetwork } from "./wallet/ethereum";

function App() {
  const { login, logout } = useAuth();
  const { account, active, chainId } = useWeb3React();

  const connectButtonClicked = async () => {
    if (active) {
      if (chainId !== Number(process.env.REACT_APP_CHAIN_ID)) {
        // await setupNetwork();
        await switchNetwork(process.env.REACT_APP_CHAIN_ID_HEX);
      }
    } else {
      login();
    }
  };
  const accountEllipsis = account
    ? `${account.substring(0, 5)}...${account.substring(account.length - 4)}`
    : null;
  return (
    <div className="app min-h-screen relative" lang="en-US">
      <Router>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 relative gap-10 z-10 pt-10 px-10 flex flex-col lg:flex-row">
            <div className="w-full grid grid-cols-3 lg:w-fit lg:grid-cols-1">
              <Link
                to="/"
                className="text-center inline-flex flex-col items-center justify-center gap-4"
              >
                <img className="w-14" src={homeIcon} alt="" />
                <span>Home</span>
              </Link>
              <Link
                to="/claim"
                className="text-center inline-flex flex-col items-center justify-center gap-4"
              >
                <img className="w-14" src={claimIcon} alt="" />
                <span>Claim LP</span>
              </Link>
              <Link
                to="/analytics"
                className="text-center inline-flex flex-col items-center justify-center gap-4"
              >
                <img className="w-14" src={analytics} alt="" />
                <span>Analytics</span>
              </Link>
              <Link
                to="https://windowsliquidity.gitbook.io/docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center inline-flex flex-col items-center justify-center gap-4"
              >
                <img className="w-14" src={doc} alt="" />
                <span>Documents</span>
              </Link>
              <Link
                to="https://t.me/WindowsLiquidity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center inline-flex flex-col items-center justify-center gap-4"
              >
                <img className="w-14" src={folder} alt="" />
                <span>Telegram</span>
              </Link>
              <Link
                to="https://twitter.com/WindowsLiquid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center inline-flex flex-col items-center justify-center gap-4"
              >
                <img className="w-14" src={folder} alt="" />
                <span>Twitter</span>
              </Link>
            </div>
            <div className="w-full flex justify-center items-center lg:w-[90%]">
              <div className="flex justify-center items-center max-w-5xl">
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
                <Routes>
                  <Route path="/claim" element={<Claim />} />
                </Routes>
                <Routes>
                  <Route path="/analytics" element={<Analytics />} />
                </Routes>
              </div>
            </div>
          </div>
          <div className="bg-[#c3c3c3] p-2">
            <div className="flex gap-2 lg:gap-5">
              <a>
                <img className="h-10 lg:h-14" src={start} alt="" />
              </a>
              {/* connect add class => btn-connect  px-5 in button */}
              <button
                className={`flex items-center ${
                  active ? "btn-connect  px-5" : ""
                }`}
                onClick={connectButtonClicked}
              >
                {(function () {
                  if (active) {
                    return chainId !== Number(process.env.REACT_APP_CHAIN_ID)
                      ? "Switch network"
                      : accountEllipsis;
                  } else {
                    return (
                      <img className="h-10 lg:h-14" src={connect} alt="" />
                    );
                  }
                })()}
                {/* 0x99999 */}
              </button>
              <button>
                <img className="h-10 lg:h-14" src={disconnect} alt="" />
              </button>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

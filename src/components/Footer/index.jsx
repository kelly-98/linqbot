import React from "react";
import Logo from "../../assets/image/small-logo.png";

import "./style.scss";

export default function Footer() {
  return (
    <div className="footer-full">
      <div className="container">
        <footer className="footer">
          <div className="footer-left">
            <div className="footer-logo">
              <img src={Logo} alt="footer-logo" />
            </div>
          </div>
          <div className="footer-right">
            <ul className="footer-socials">
              <li>
                <a
                  href="https://twitter.com/ShibariumLabsTG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/ShibariumLabsTG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className="fa-brands fa-telegram"></i>
                </a>
              </li>
            </ul>
            <ul className="footer-links">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Staking
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Contract
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <div className="footer-line"></div>
        <span className="copyright center">
          2023 ® Shibarium Labs - All rights reserved
        </span>
      </div>
    </div>
  );
}

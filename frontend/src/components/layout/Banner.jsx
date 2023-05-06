import React, { useState, useEffect } from "react";
import Typed from "react-typed";
import { Link } from "react-router-dom";
import { RiMagicFill } from "react-icons/ri";
import { IoStorefront } from "react-icons/io5";
import "../../pages/Home/Featureproduct.css";
import "../../pages/Home/Home.css";

const Banner = () => {

  // set up the options object
  const options = {
    strings: [
            "Bakery on light speed",
            "Experience the real fluffy",
            "Unlock the baker in you",
            "Sweet treats in your belly"
        ],
    typeSpeed: 50,
    backSpeed: 50,
    // backDelay: 2000,
    loop: true,
    // showCursor: true,
    // cursorChar: "|",
    // smartBackspace: true,
    // cursorBlinking: true,
    // you can also set a custom blinking rate in ms
    // cursorBlinkSpeed: 500
  };

  return (
    <>
      <div className="postbox">
        <div className="gallery">
          <img src="/assets/doodlebg.png" alt="train" />
          <div className="headerTxt">
            <h1 className="headerH1 mb-0">
              <Typed {...options} />
            </h1>
            <p className="headerP">One delightful bite deserves another...</p>
            <div className="homeBtns">
              <Link to={`/shop`} className="shopBtn homeCtaBtn">
                Shop <IoStorefront />
              </Link>
              <Link to={`/cookbook`} className="cookbookBtn homeCtaBtn">
                Cookbook <RiMagicFill />
              </Link>
            </div>
            <div className="mousebox">
              <div id="mouse-scroll">
                <div className="mouse">
                  <div className="mouse-in"></div>
                </div>
                <div>
                  <span className="down-arrow-1"></span>
                  <span className="down-arrow-2"></span>
                  <span className="down-arrow-3"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;

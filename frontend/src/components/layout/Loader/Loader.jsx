import React from "react";
// import Typed from "react-typed";
import "./Loader.css";
const Loader = () => {
  // set up the options object
  // const options = {
  //   strings: [
  //           "Loading..."
  //       ],
  //   typeSpeed: 50,
  //   backSpeed: 30,
    // backDelay: 5000,
    // loop: true,
    // showCursor: true,
    // cursorChar: "|",
    // smartBackspace: true,
    // cursorBlinking: true,
    // you can also set a custom blinking rate in ms
    // cursorBlinkSpeed: 500
  // };
  return (
    <div className="loaderBG">
      {/* <span><Typed {...options} /></span> */}
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
    </div>
  );
};

export default Loader;

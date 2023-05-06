import React from "react";

const Smallbanner = () => {
  return (
    <div className="associatesSection">
    <h2 style={{textAlign: 'center', fontSize: '30px', color: 'grey', marginTop: '30px'}}>Associates</h2>
    <div className="associatesBox">
      <p className="associatesTalk">Our cutting-edge technology enables instant order placement, multiple payment options, and efficient discount management, thanks to our trusted partners - Flutterwave, Google, and Bolt. With our quality assurance and proven track record of timely deliveries and maximum protection, you can trust us to ensure your food arrives safely.</p>
      <div className="featureWtext">
      <div id="feature" className="">
        <div className="fe__box">
          <img src="/assets/features/flutterwave.jpeg" alt="" />
        </div>

        <div className="fe__box">
          <img src="/assets/features/bolt.PNG" alt="" />
        </div>

        <div className="fe__box">
          <img src="/assets/features/google.jpeg" alt="" />
        </div>
      </div>
      </div>
      <p className="joinOurCom">Join our community of satisfied customers who have given us a 5-star rating across all platforms.</p>
    </div>
    </div>
  );
};

export default Smallbanner;

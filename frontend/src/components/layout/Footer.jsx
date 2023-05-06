import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
        <footer className="footer">
          <div className="waves">
            <div className="wave" id="wave1"></div>
            <div className="wave" id="wave2"></div>
            <div className="wave" id="wave3"></div>
            <div className="wave" id="wave4"></div>
          </div>
          
          <p>© Copyright 2021 Belly Cake - All Rights Reserved</p>
        </footer>
    </>
  );
};

export default Footer;

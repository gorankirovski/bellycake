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

          <ul className="menu">
            <li className="menu__item">
              <Link
                className="menu__link"
                to="/"
                style={{ textDecoration: "none" }}
              >
                Home
              </Link>
            </li>
            <li className="menu__item">
              <Link
                className="menu__link"
                to="/shop"
                style={{ textDecoration: "none" }}
              >
                Our Shop
              </Link>
            </li>

            <li className="menu__item">
              <a
                className="menu__link"
                href="https://github.com/anupam6335"
                target='_blank'
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                Github
              </a>
            </li>
          </ul>
          <p style={{ opacity: "0.75" }}>Made with 🤍 by Anupam Debnath</p>
          <p>This is a project not a real website</p>
        </footer>
    </>
  );
};

export default Footer;

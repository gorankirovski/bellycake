import "./Header.css";
import { Link } from "react-router-dom";
import { User, Search } from "../../allComponents";
import { useDispatch, useSelector } from "react-redux";
import { IoBagHandle } from "react-icons/io5";
import { RiMagicFill } from "react-icons/ri";
import { IoStorefront } from "react-icons/io5";
// import { ScrollToTop } from "../Loader/scroll";

const Header = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector(state => state.cart)
  
  return (
    <header className="header">
      <div className="scontainer">
        <div className="logo">
          <Link to="/" className="logoTxt">
            <img
              src="/assets/colorlogo.png"
              alt="Belly Cake"
              className="logoImg"
            />
            <h4>Belly Cake</h4>
          </Link>
        </div>
        <div className="account">
          <Link to="/shop" className="navIcons forshop forPhone">
            <div className="iconcard">
              <IoStorefront className="cardIcon" />
            </div>
          </Link>
          <Link to="/cookbook" className="navIcons forcook forPhone">
            <div className="iconcard">
              <RiMagicFill className="cardIcon" />
            </div>
          </Link>
          <Link to="/shop" className="navIcons forshop forPc">
            <div className="iconcard">
            Shop &nbsp; <IoStorefront className="cardIcon" />
            </div>
          </Link>
          <Link to="/cookbook" className="navIcons forcook forPc">
            <div className="iconcard">
            Cookbook &nbsp; <RiMagicFill className="cardIcon" />
            </div>
          </Link>
          <Search />
          <Link to="/cart" style={{ color: 'white'}}>
            <div className="iconShopcard">
              <IoBagHandle className="cardIcon cartIcon" />
              {cartItems.length === 0 ? '' : <span className="flexCenter cartCounter">{cartItems.length}</span>}
            </div>
          </Link>
          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;

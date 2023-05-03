import "./Header.css";
import { Link } from "react-router-dom";
import { User, Loader, Search } from "../../allComponents";
import { useDispatch, useSelector } from "react-redux";
import { IoBagHandle } from "react-icons/io5";
import { RiMagicFill } from "react-icons/ri";
import { IoStorefront } from "react-icons/io5";

const Header = () => {

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector(state => state.cart)
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <header className="header">
          <div className="scontainer">
            <div className="logo">
              <Link to="/" className="logoTxt">
                <img
                  src="/assets/colorlogo.png"
                  alt="Belly Cake"
                  style={{ height: "40px", width: "40px" }}
                /> Belly Cake
              </Link>
            </div>
            <div className="account">
              <Link to="/shop" className="navIcons forshop">
                <div className="card">
                  <IoStorefront className="cardIcon" />
                </div>
              </Link>
              <Link to="/cookbook" className="navIcons forcook">
                <div className="card">
                  <RiMagicFill className="cardIcon" />
                </div>
              </Link>
              <Search />
              <Link to="/cart" style={{ color: 'white'}}>
                <div className="card">
                  <IoBagHandle className="cardIcon" />
                  {cartItems.length === 0 ? '' : <span className="flexCenter">{cartItems.length}</span>}
                  
                </div>
              </Link>
              <User />
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;

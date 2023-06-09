import { useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { BsPersonFillGear } from "react-icons/bs";
import { BsFillBagCheckFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { MdSpaceDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userActions";
import { toast } from "react-hot-toast";
import "../Header/Header.css";

const User = () => {
  let loginUser = false;
  const [profileOpen, setProfileOpen] = useState(false);

  const close = () => {
    setProfileOpen(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    if (user.role === "admin") {
    console.log(`%c Welcome your Majesty!`, 'color: green')
    } else {
      console.log(`%c ⏳Loading...`, 'color: green')
    }
    loginUser = true;
  }
  const logoutHandler = () => {
    dispatch(logout());
    toast.success('Logged out successfully', {
      className: "myToast",
    });
    // Remove the token from the cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/login')
  };
  return (
    <>
      <div className="profile">
        {loginUser ? (
          <>
            <button
              className="img navImage"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img
                src={user.avatar && user.avatar.url}
                alt={user && user.name}
              />
            </button>

            {profileOpen && (
              <div className="openProfile boxItems" onClick={close}>
                <div className="image">
                  <Link to="/me">
                    <div className="img navImage">
                      <img
                        src={user.avatar && user.avatar.url}
                        alt={user && user.name}
                      />
                    </div>
                  </Link>
                  <div className="text">
                    <h4>{user.name}</h4>
                    <label style={{color: 'green'}}>
                      {user && user.role === "admin"
                        ? "Admin"
                        : "Customer"}
                    </label>
                  </div>
                </div>
                <Link to="/me">
                  <button className="box">
                    <BsPersonFillGear className="icon" />
                    <h4>My Account</h4>
                  </button>
                </Link>


                {user && user.role !== "admin" ? (
                  <Link to="/orders/me">
                    <button className="box">
                      <BsFillBagCheckFill className="icon" />
                      <h4>My Order</h4>
                    </button>
                  </Link>
                ) : (
                  <Link to="/dashboard">
                    <button className="box">
                      <MdSpaceDashboard className="icon" />
                      <h4>Dashboard</h4>
                    </button>
                  </Link>
                )}
                <Link to="/">
                  <button className="box" onClick={logoutHandler}>
                    <BiLogOut className="icon" />
                    <h4>Log Out</h4>
                  </button>
                </Link>
              </div>
            )}
          </>
        ) : (
          !loading && (
            <>
            <Link to="/login" className="loginSignup mb-0">
            <h4 className="accountIconTxt mb-0">My Account</h4>
            <span className="accountIcon"><IoPersonCircleSharp /></span>
            </Link>
            </>
          )
        )}
      </div>
    </>
  );
};

export default User;

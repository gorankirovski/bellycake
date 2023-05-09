import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { MetaData, Loader } from "../../../allComponents";

import "./Profile.css";
const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="profilePageBox">
          <MetaData title={`${user.name}-profile`} />
          <h2 className="profileTitle">My Profile</h2>
          <div className="profileBox">

            <div className="profileInfoSide">
              <div className="avatarBorder">
              <div className="avatar__profile">
                <img src={user.avatar?.url} alt={user.name} />
              </div>
              </div>
              <div className="profileDetailsTxt">
                <p><b>Full Name:</b>&nbsp;{user.name}</p>
                <p><b>Email Address:</b>&nbsp;{user.email}</p>
                <div className="changingEditBtns">
                  <Link
                    to="/me/update"
                    id="edit_profile"
                    className="btns"
                  >
                    Edit Profile
                  </Link>
                  {user.role !== "admin" && (
                    <Link to="/orders/me" className="btns">
                      My Orders
                    </Link>
                  )}
                </div>
                <p><b>Joined On:</b>&nbsp;{String(user.createdAt).substring(0, 10)}</p>
              </div>
              <div className="changingBtns">
                <Link
                  to="/password/update"
                  className="btns"
                >
                  Change Password
                </Link>
              </div>
            </div>


          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

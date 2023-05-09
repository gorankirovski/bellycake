import "../Login/Login.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../../../allComponents";

import { FaUserCircle } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../../../constants/userConstants";
import { toast } from "react-hot-toast";
import imageCompression from 'browser-image-compression';

const Updateprofile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toast.error(error, {
        className: "myToast",
      });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("profile updated successfully", {
        className: "myToast",
      });
      dispatch(loadUser());
      navigate("/me");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, toast, navigate, error, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  const onChange = async (e) => {
    const options = {
      maxSizeMB: 0.02,
      maxWidthOrHeight: 800
    }
    const compressedFile = await imageCompression(e.target.files[0], options);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(compressedFile);
  };
  
  return (
    <>
      <MetaData title={"Update Profile"} />
      <div className="profile__box">
        <div className="LOGIN_BOX">
          <form
            className="login register Update_BOX"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h2><FaUserCircle className="icon" /> Hi, {user?.name} </h2>
            <p className="">Edit your Profile</p>
            <label style={{ textAlign: "center", fontWeight: "bold" }}>
              {user.role === "admin" ? "( Admin )" : ""}
            </label>
            <div className="form-group">
              <input
                type="name"
                id="name_field"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email_field"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group avatar_div">
              <div className="d-flex align-items-center">
                <div className="avatarBorder">
                  <div className="avatar__profile">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                      style={{ width: "100px" }}
                    />
                  </div>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="assets/userAvatar/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose your profile pic
                  </label>
                </div>
              </div>
            </div>

            <input
              type="submit"
              value="Update"
              disabled={loading ? true : false}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Updateprofile;

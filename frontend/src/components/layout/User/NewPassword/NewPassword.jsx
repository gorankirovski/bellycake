import React, { useState, useEffect } from "react";

import {MetaData} from "../../../allComponents";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../../../actions/userActions";
import { RiLockPasswordLine } from "react-icons/ri";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      toast(`${error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "Dark",
      });
      dispatch(clearErrors());
    }

    if (success) {
      toast(`Password updated successfully`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "Dark",
      });
      navigate("/login");
    }
  }, [dispatch, toast, error, success, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(params.token, formData));
  };

  return (
    <>
      <MetaData title={"New Password Reset"} />

        <div className="LOGIN_BOX" >
          <form
            className="login"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <p><RiLockPasswordLine className="icon" /> Reset Your Password </p>

            <div className="form-group">
              <input
                type="password"
                id="password_field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="confirm_password_field"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Set New Password"
            />
          </form>
        </div>
    </>
  );
};

export default NewPassword;

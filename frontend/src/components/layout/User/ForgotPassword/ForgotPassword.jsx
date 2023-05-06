import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../../../allComponents";

import { MdPassword } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../../../../actions/userActions";

import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );
  useEffect(() => {
      if (error) {
        toast.error(error, {
        className: "myToast",
      });
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message, {
        className: "myToast",
      });
    }
  }, [dispatch, toast, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotPassword(formData));
  };
  return (
    <>
      <MetaData title={"Change Password"} />
        <div className="LOGIN_BOX">
          <form
            className="login"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
          <p> Forgot Your Password &nbsp;<MdPassword className="icon" /></p>
            <div className="form-group">
              <input
                type="email"
                id="email_field"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Send Email"
              disabled={loading ? true : false}
            />
          </form>
        </div>
    </>
  );
};

export default ForgotPassword;

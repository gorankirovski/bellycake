import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../../../allComponents";

import { RiLockPasswordLine } from "react-icons/ri";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../../../constants/userConstants";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.user);
  useEffect(() => {
    
    if (error) {
      toast.error(error, {
        className: "myToast",
      });
      dispatch(clearErrors());
    }
    
    if (isUpdated) {
      toast.success("Password updated successfully", {
        className: "myToast",
      });

      navigate("/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, toast, error, navigate, isUpdated]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);

    dispatch(updatePassword(formData));
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
            <p><RiLockPasswordLine className="icon" /> Update Your Password </p>
            <div className="form-group">
              <input
                type={showPassword ? "text" : "password"}
                id="old_password_field"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group withPassword">
              <input
                type={showPassword ? "text" : "password"}
                id="new_password_field"
                className="borderlessPwd"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={toggleShowPassword} className="showPassword">
                {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </button>
            </div>

            <input
              type="submit"
              value="Change"
              disabled={loading ? true : false}
            />
          </form>
        </div>
    </>
  );
};

export default UpdatePassword;

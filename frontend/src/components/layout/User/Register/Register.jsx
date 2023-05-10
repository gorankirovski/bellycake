import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Loader, MetaData } from "../../../allComponents";

import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../../../actions/userActions";

import { toast } from "react-hot-toast";
import imageCompression from 'browser-image-compression';

import "../Login/Login.css";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/assets/userAvatar/maleuser.png"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error(error, {
        className: "myToast",
      });
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, toast, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);
    dispatch(register(formData));
  };
  
  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  const onChange = async (e) => {
    if (e.target.name === "avatar") {
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
    } else {
      if (e.target.name === "name") {
        const inputValue = e.target.value;
        const titleCaseValue = toTitleCase(inputValue);
        setUser({ ...user, name: titleCaseValue});
      } else {
      setUser({ ...user, [e.target.name]: e.target.value });
      }
    }
  };

  return (
    <>
      <MetaData title={"Register User"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="LOGIN_BOX Register_BOX">
          <form
            className="login register"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h2>Hi , Stranger</h2>
            <p>Setup your account to start enjoying discounts and freebies.</p>

            <div className="form-group">
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                placeholder="Name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
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
              value="Create an Account"
              disabled={loading ? true : false}
            />
            <div className="links registerLink">
              <div></div>
              <Link
                to="/login"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                click here to login
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;

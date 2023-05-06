import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Loader, MetaData } from "../../../allComponents";

import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../../../actions/userActions";

import { toast } from "react-hot-toast";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
    
  const redirect = location.search ? '/shipping' : '/'
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      toast.error(error, {
        className: "myToast",
      });
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated,toast, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(email, " -- ", password);
    dispatch(login(email, password));
  };
  return (
    <>
      <MetaData title={"Login"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="LOGIN_BOX">
            <form className="login " onSubmit={submitHandler}>
              <p>Please log in to continue</p>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="submit" value="Log In" />
              <div className="links">
                <Link to="/password/forgot" >Forgot Password?</Link>

                <Link to="/register">Don't have an Account</Link>
              </div> 
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Login;

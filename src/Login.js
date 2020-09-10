import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "./axios";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, dispatch] = useStateValue();

  const history = useHistory();

  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        dispatch({ type: actionTypes.SET_USER, user: response.data });
        localStorage.setItem("user_info", JSON.stringify(response.data));
        history.push({
          pathname: "/dashboard",
        });
      })
      .catch((err) => {
        console.log(err.message);
        if (err.response.status == 403) {
          alert("Invalid Credentials");
        }
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Covid-19 Tracker</h2>
        <form className="ui form">
          <div className="field">
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="ui button" type="submit" onClick={handleSignIn}>
            Sign In
          </button>
        </form>

        <div className="login__signUpLink">
          <Link to="/signUp">Don't have account? Sign Up</Link>
        </div>
        <div className="login__continueLink">
          <Link to="/dashboard">Continue without login</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

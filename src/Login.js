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
        email: "abc123@gmail.com",
        password: "abc",
      })
      .then((response) => {
        dispatch({ type: actionTypes.SET_USER, user: response.data });
        // localStorage.setItem("user", response.data);
        history.push("/dashboard");
      })
      .catch((err) => console.log(err.message));
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
              value="abc123@gmail.com"
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value="abc"
            />
          </div>
          <button
            className="ui button"
            variant="primary"
            type="submit"
            onClick={handleSignIn}
          >
            {" "}
            Sign In
          </button>
        </form>

        <Link className="login__signUpLink" to="/signUp">
          Don't have account? Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;

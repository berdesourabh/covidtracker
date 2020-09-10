import React, { useState, useEffect } from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Header() {
  const history = useHistory();
  const [{ user }] = useStateValue();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const data = () => {
    let user_data = localStorage.getItem("user_info");

    if (user_data) {
      let userObj = JSON.parse(user_data);
      setIsLoggedIn(true);
      setUserData(userObj);
    } else {
      setIsLoggedIn(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("user_info");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://www.un.org/sites/un2.un.org/files/covid19_response_icon.svg"
          alt="covid-19"
          onClick={() => history.push("/dashboard")}
        />
        <p>Covid-19 Tracker</p>
      </div>
      <div className="header__right">
        {isLoggedIn ? (
          <>
            <div className="header__rightUsername">
              {userData.firstName?.concat(" ").concat(userData.lastName)}
            </div>
            <div
              className="ui button"
              onClick={() => history.push("/patients")}
            >
              My Patients
            </div>
            <div className="ui button " onClick={logout}>
              Logout
            </div>
          </>
        ) : (
          <div
            className="ui button header__rightOption"
            onClick={() => history.push("/login")}
          >
            Login
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

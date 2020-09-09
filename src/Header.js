import React from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Header() {
  const history = useHistory();
  const [{ user }] = useStateValue();

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
        <div className="header__info">
          {/* {user.userName ? ( */}
          <div className="header__info__option">
            <div
              className="ui button"
              onClick={() => history.push("/patients")}
            >
              My Patients
            </div>
            <p>Sourabh Berde</p>

            {/* <h4>{user?.userName}</h4> */}
          </div>
          {/* ) : ( */}
          {/* <div className="ui button" onClick={() => history.push("/login")}>
              Login
            </div> */}
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

export default Header;

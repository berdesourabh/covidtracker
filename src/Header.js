import React from "react";
import "./Header.css";
import { Avatar } from "@material-ui/core";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://www.un.org/sites/un2.un.org/files/covid19_response_icon.svg"
          alt="facebook"
        />
      </div>
      <div className="header__right">
        <div className="header__info">
          <Avatar />
          <h4>sourabhberde</h4>
        </div>
      </div>
    </div>
  );
}

export default Header;

import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

const Modal = (props) => {
  const history = useHistory();

  return ReactDOM.createPortal(
    <div
      onClick={() => history.push("/login")}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.header}</div>
        <div className="content">{props.content}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;

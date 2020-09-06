import React from "react";
import "./SidebarRow.css";
import { Dropdown } from "semantic-ui-react";

function SidebarRow({ title, placeholder, options }) {
  return (
    <div className="sidebarRow">
      <h4>{title}</h4>
      <Dropdown placeholder={placeholder} options={options} selection />
    </div>
  );
}

export default SidebarRow;

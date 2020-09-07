import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarRow from "./SidebarRow";

function Sidebar({ title, filterData, selectedValue }) {
  return (
    <div className="sidebar">
      <h3>Filters</h3>
      <SidebarRow
        title={title}
        placeholder={title}
        options={filterData}
        value={selectedValue}
      />
    </div>
  );
}

export default Sidebar;

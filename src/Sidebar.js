import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarRow from "./SidebarRow";

function Sidebar({
  countryData,
  countryValue,
  stateData,
  stateValue,
  cityData,
}) {
  return (
    <div className="sidebar">
      <h3>Filters</h3>
      <SidebarRow
        title="Country"
        placeholder="Country"
        options={countryData}
        value={countryValue}
      />
      <SidebarRow
        title="State"
        placeholder="State"
        options={stateData}
        value={stateValue}
      />
      <SidebarRow title="City" placeholder="City" options={cityData} />
    </div>
  );
}

export default Sidebar;

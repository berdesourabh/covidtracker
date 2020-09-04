import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarRow from "./SidebarRow";
import axios from "./axios";

function Sidebar() {
  const [countriesFilterData, setCountriesFilterData] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await axios.get("/countries").then((response) => {
        const countries = response.data.map((country) => ({
          key: country.name,
          text: country.name,
          value: country.name,
        }));
        setCountriesFilterData(countries);
      });
    };
    getCountriesData();
  }, []);
  return (
    <div className="sidebar">
      <h3>Filters</h3>
      <SidebarRow
        title="Country"
        placeholder="Country"
        options={countriesFilterData}
      />
      <SidebarRow title="State" placeholder="State" />
      <SidebarRow title="City" placeholder="City" />
    </div>
  );
}

export default Sidebar;

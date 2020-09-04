import React from "react";
import "./CountryReport.css";
import Table from "./Table";
import Sidebar from "./Sidebar";

function Report() {
  return (
    <div className="countryReport">
      <Sidebar />
      <Table region="Country" />
    </div>
  );
}

export default Report;

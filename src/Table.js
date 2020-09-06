import React, { useState, useEffect } from "react";
import "./Table.css";

function Table({ region, data }) {
  return (
    <div className="table">
      <table className="ui large teal table">
        <thead>
          <tr>
            <th>{region}</th>
            <th>Cases</th>
            <th>Recovered</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>{data()}</tbody>
      </table>
    </div>
  );
}

export default Table;

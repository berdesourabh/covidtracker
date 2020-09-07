import React, { useState } from "react";
import "./SidebarRow.css";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function SidebarRow({ title, placeholder, options }) {
  const [value, setValue] = useState("");
  const [state, dispatch] = useStateValue();

  const handleChange = (e) => {
    if ("Country" === title) {
      dispatch({
        type: actionTypes.COUNTRY_FILTER,
        countryFilter: e.target.value,
      });
    } else if ("State" === title) {
      dispatch({
        type: actionTypes.STATE_FILTER,
        stateFilter: e.target.value,
      });
    } else {
      dispatch({
        type: actionTypes.CITY_FILTER,
        cityFilter: e.target.value,
      });
    }
  };
  return (
    <div className="sidebarRow">
      <h4>{title}</h4>
      <select
        name={title}
        multiple=""
        className="ui fluid dropdown"
        onChange={handleChange}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.key} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SidebarRow;

{
  /* <div class="ui visible inverted left vertical sidebar menu">
        <h4>{title}</h4>
        <select
          name={title}
          multiple=""
          className="ui fluid dropdown"
          onChange={handleChange}
        >
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt.key} value={opt.value}>
              {opt.text}
            </option>
          ))}
        </select>
      </div> */
}

import React, { useState, useEffect } from "react";
import BreadCrumbs from "./BreadCrumbs";
import "./PatientList.css";
import axios from "./axios";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";

function PatientList() {
  const [result, setResult] = useState([]);
  const history = useHistory();

  const fetch = () => {
    let user_data = localStorage.getItem("user_info");
    let uname = "";
    let token = "";
    if (user_data) {
      let userObj = JSON.parse(user_data);

      uname = userObj.userName;
      token = userObj.jwtToken;
    } else {
      history.push("/dashboard");
    }

    axios
      .get(`/patients/physician/${uname}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setResult(response.data);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="patientList">
      <BreadCrumbs />
      <div className="patientList__button">
        <h2>My Patients</h2>
        <div
          className="ui button"
          onClick={() => history.push("/patients/add")}
        >
          Add Patient
        </div>
      </div>
      <div>
        <table className="ui table">
          <thead>
            <tr className="center aligned">
              <th>First Name</th>
              <th>Last Name</th>
              <th>E-mail address</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Corona Positive</th>
              <th>Report Status</th>
              <th>Recovered</th>
            </tr>
          </thead>
          <tbody>
            {result.map((row) => (
              <tr
                key={row.patientId}
                className="center aligned"
                onClick={() => history.push(`/patients/edit/${row.patientId}`)}
              >
                <td>{row.user.firstName}</td>
                <td>{row.user.lastName}</td>
                <td>{row.user.email}</td>
                <td>{row.user.country}</td>
                <td>{row.user.state}</td>
                <td>{row.user.city}</td>
                <td>{row.coronaPositive === "Y" ? "Yes" : "No"}</td>
                <td>{row.reportStatus}</td>
                <td>{row.recovered === "Y" ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientList;

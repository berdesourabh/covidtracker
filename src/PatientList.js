import React, { useState, useEffect } from "react";
import BreadCrumbs from "./BreadCrumbs";
import "./PatientList.css";
import axios from "./axios";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";

function PatientList() {

  const[result,setResult] = useState([]);

  const history = useHistory();

  const fetch = () => {

    //let data = localStorage.getItem('user_data');
   // const[{userName}] = data;

   let userName = 'abc2@gmail.com';

    axios.get(`/patients/physician/${userName}`)
         .then((response) => {
            setResult(response.data);

         })
  }

  useEffect(() => {
    fetch();
  },[]);


  return (
    <div className="patientList">
      <BreadCrumbs />
      <div className="patientList__button">
        <h2>My Patients</h2>
        <div className="ui button">Add Patient</div>
      </div>
      <div>
        <table className="ui table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>E-mail address</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Corona Positive</th>
              <th>Report Status</th>
              <th>Recovered</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {result.map((row) => (
              <tr key={row.patientId}>
                <td>{row.user.firstName}</td>
                <td>{row.user.lastName}</td>
                <td>{row.user.email}</td>
                <td>{row.user.country}</td>
                <td>{row.user.state}</td>
                <td>{row.user.city}</td>
                <td>{row.coronaPositive}</td>
                <td>{row.reportStatus}</td>
                <td>{row.recovered}</td>
                <td>
                  <Link                    
                    color="inherit"
                    onClick={() => history.push(`/patients/edit/${row.patientId}`) }
                    style={{ textDecoration: "none" }}
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientList;

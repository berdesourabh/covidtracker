import React from "react";
import BreadCrumbs from "./BreadCrumbs";
import "./PatientList.css";

function PatientList() {
  return (
    <div className="patientList">
      <BreadCrumbs />
      <div className="patientList__button">
        <h2>My Patients</h2>
        <div className="ui button">Add Patient</div>
      </div>
      <div>
        <table class="ui table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>E-mail address</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Report Status</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Lilki</td>
              <td>September 14, 2013</td>
              <td>jhlilk22@yahoo.com</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientList;

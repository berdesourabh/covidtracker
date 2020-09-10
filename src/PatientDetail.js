import React, { useState } from "react";
import axios from "./axios";
import "./PatientDetail.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function PatientDetail() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [countryState, setCountryState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [physicianId, setPhysicianId] = useState("");
  
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    let user_data = localStorage.getItem("user_info");

    let uname="";
    let token = "";
    if (user_data) {
      let userObj = JSON.parse(user_data);
     
      uname = userObj.userName;
      token = userObj.jwtToken;

    }

    axios
      .post("/patient", {
        email: emailAddress,
        firstName: firstName,
        lastName: lastName,
        country: country,
        state: countryState,
        city: city,
        physicianId: uname

      },{headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      }})
      .then((response) => {
        history.push("/patients");
      })
      .catch((err) => console.log(err.message));
  };

 

  return (
    <div className="patientDetail">
      <div className="patientDetail__header">
        <h1>Add Patient</h1>
      </div>
      <div className="patientDetail__form">
        <div className="patientDetail__info">
          <form className="ui form">
            <div className="two fields">
              <div className="five wide field">
                <label>First Name</label>
                <input
                  className="patientDetail__info__input"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  md="6"
                />
              </div>
              <div className="five wide field">
                <label>Last Name</label>
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
            </div>
            <div className="two fields">
              <div className="five wide field">
                <label>Email Address</label>
                <input
                  type="email"
                  onChange={(e) => setEmailAddress(e.target.value)}
                  value={emailAddress}
                />
              </div>
              <div className="five wide field">
                <label>Phone Number</label>
                <input
                  type="text"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                />
              </div>
            </div>
            <div className="six wide field">
              <label>Address</label>
              <textarea
                rows="2"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              ></textarea>
            </div>
            <div className="two fields">
              <div className="five wide field">
                <label>Country</label>
                <input
                  type="text"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                />
              </div>
              <div className="five wide field">
                <label>State</label>
                <input
                  type="text"
                  onChange={(e) => setCountryState(e.target.value)}
                  value={countryState}
                />
              </div>
            </div>
            <div className="two fields">
              <div className="five wide field">
                <label>City</label>
                <input
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
              </div>
              <div className="two wide field">
                <label>Zip</label>
                <input
                  type="text"
                  onChange={(e) => setZip(e.target.value)}
                  value={zip}
                />
              </div>
            </div>
            <div className="ui button" type="submit" onClick={handleSubmit}>
              Submit
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PatientDetail;

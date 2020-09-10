import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./PatientDetail.css";
import { useParams, useHistory } from "react-router-dom";

function EditPatient() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [isPositive, setIsPositive] = useState("Select");
  const [reportStatus, setReportStatus] = useState("");
  const [country, setCountry] = useState("");
  const [countryState, setCountryState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [patientId, setPatientId] = useState(0);
  const [physicianId, setPhysicianId] = useState("");
  const [recovered, setRecovered] = useState("");
  const [dead, setDead] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    let user_data = localStorage.getItem("user_info");
    let token = "";
    if (user_data) {
      let userObj = JSON.parse(user_data);
      token = userObj.jwtToken;
    } else {
      history.push("/dashboard");
    }

    axios
      .get(`/patients/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { user } = response.data;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmailAddress(user.email);
        setCountry(user.country);
        setCity(user.city);
        setCountryState(user.state);
        setIsPositive(response.data.coronaPositive);
        setReportStatus(response.data.reportStatus);
        setPatientId(response.data.patientId);
        setPhysicianId(response.data.physicianId);
        setRecovered(response.data.recovered);
        setDead(response.data.dead);
      })
      .catch((err) => console.log(err.message));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    let user_data = localStorage.getItem("user_info");
    let token = "";
    if (user_data) {
      let userObj = JSON.parse(user_data);
      token = userObj.jwtToken;
    }

    axios
      .put(
        "/patient",
        {
          user: {
            email: emailAddress,
            firstName: firstName,
            lastName: lastName,
            country: country,
            state: countryState,
            city: city,
          },
          patientId: patientId,
          reportStatus: reportStatus,
          coronaPositive: isPositive,
          physicianId: physicianId,
          recovered: recovered,
          dead: dead,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        history.push("/patients");
      })
      .catch((err) => console.log(err.message));
  };

  const handleRecovered = (e) => {
    setRecovered(e.target.value);
    setIsPositive(e.target.value === "Y" ? "N" : "Y");
  };

  return (
    <div className="patientDetail">
      <div className="patientDetail__header">
        <h1>Edit Patient</h1>
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
                <div>
                  <label>Dead</label>
                  <select
                    value={dead}
                    onChange={(e) => setDead(e.target.value)}
                  >
                    <option>Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="two fields">
              <div className="five wide field">
                <label>Corona Positive</label>
                <select
                  value={isPositive}
                  onChange={(e) => setIsPositive(e.target.value)}
                >
                  <option>Select</option>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>
              <div className="five wide field">
                <label>Report Status</label>
                <input
                  value={reportStatus}
                  onChange={(e) => setReportStatus(e.target.value)}
                />
              </div>
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
              <div className="five wide field">
                <label>Recovered</label>
                <select value={recovered} onChange={handleRecovered}>
                  <option>Select</option>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>
            </div>

            <div className="ui button" type="submit" onClick={handleSubmit}>
              Submit
            </div>
            <div
              className="ui button"
              type="submit"
              onClick={() => history.push("/patients")}
            >
              Cancel
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPatient;

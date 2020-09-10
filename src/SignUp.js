import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import axios from "./axios";
import "./SignUp.css";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [countryState, setCountryState] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, dispatch] = useStateValue();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password does not match");
      return;
    }
    axios
      .post("/user/register", {
        email: emailAddress,
        firstName: firstName,
        lastName: lastName,
        country: country,
        state: countryState,
        city: city,
        password: password,
      })
      .then((response) => {
        dispatch({ type: actionTypes.ADD_USER, user: response.data });
        history.push("/signUp/success");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="signup">
      <div className="signup__header">
        <img
          src="https://www.un.org/sites/un2.un.org/files/covid19_response_icon.svg"
          alt="covid-19 tracker"
        />
        <h1>Covid-19 Tracker</h1>
      </div>
      <div className="signup__form">
        <form className="ui form">
          <div className="two fields">
            <div className="five wide field">
              <label>First Name</label>
              <input
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
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="five wide field">
              <label>Confirm Password</label>
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
          </div>
          <div className="two fields">
            <div className="five wide field">
              <label>Country</label>
              <select
                className="ui fluid dropdown"
                as="select"
                defaultValue="Choose..."
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option>Choose...</option>
                <option>India</option>
              </select>
            </div>
            <div className="five wide field">
              <label>State</label>
              <select
                className="ui fluid dropdown"
                value={countryState}
                onChange={(e) => setCountryState(e.target.value)}
              >
                <option>Choose...</option>
                <option>Maharashtra</option>
              </select>
            </div>
          </div>
          <div className="two fields">
            <div className="five wide field">
              <label>City</label>
              <input />
            </div>
            <div className="two wide field">
              <label>Zip</label>
              <input />
            </div>
          </div>
          <div className="ui button" type="submit" onClick={handleSubmit}>
            Submit
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

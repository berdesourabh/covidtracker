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
  const [isDoctor, setIsDoctor] = useState(false);
  const [state, dispatch] = useStateValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/user/register", {
        email: emailAddress,
        firstName: firstName,
        lastName: lastName,
        country: country,
        state: countryState,
        city: city,
        password: "sb",
      })
      .then((response) => {
        dispatch({ type: actionTypes.ADD_USER, user: response.data });
        // history.push("/dashboard");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="signup">
      <form className="ui form">
        <div className="two fields">
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              md="6"
            />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>Email Address</label>
            <input
              type="email"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
            />
          </div>
          <div className="field">
            <label>Phone Number</label>
            <input
              type="text"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </div>
        </div>
        <div className="field">
          <label>Address</label>
          <input
            rows="3"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="1234 Main St"
          />
        </div>
        <div className="field">
          <label>Address 2</label>
          <input placeholder="Apartment, studio, or floor" />
        </div>
        <div className="four fields">
          <div className="field" controlId="formGridState">
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
          <div className="field">
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
          <div className="field">
            <label>City</label>
            <input />
          </div>
          <div className="field">
            <label>Zip</label>
            <input />
          </div>
        </div>
        <div className="field">
          <div class="ui checkbox">
            <input
              type="checkbox"
              checked={isDoctor}
              onChange={() => setIsDoctor(true)}
            />
            <label>I am a Doctor</label>
          </div>
          {isDoctor && (
            <div className="field">
              <label>First Name</label>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                md="6"
              />
            </div>
          )}
        </div>
        <div className="ui button" type="submit" onClick={handleSubmit}>
          Submit
        </div>
      </form>
    </div>
  );
}

export default SignUp;

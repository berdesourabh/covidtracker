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
    <div className="userDetail">
      <CardHeader title="Add User details" />
      <CardContent className="userDetail__container">
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <label className="userDetail__required">*</label>
              <Form.Control
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                md="6"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <label className="userDetail__required">*</label>
              <Form.Control
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Email Address</Form.Label>
              <label className="userDetail__required">*</label>
              <Form.Control
                type="email"
                onChange={(e) => setEmailAddress(e.target.value)}
                value={emailAddress}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Phone Number</Form.Label>
              <label className="userDetail__required">*</label>
              <Form.Control
                type="text"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              rows="3"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="1234 Main St"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option>Choose...</option>
                <option>India</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                value={countryState}
                onChange={(e) => setCountryState(e.target.value)}
              >
                <option>Choose...</option>
                <option>Maharashtra</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="formGridCity"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </CardContent>
    </div>
  );
}

export default SignUp;

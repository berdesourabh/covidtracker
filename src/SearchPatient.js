import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./SignUp.css";
import axios from "./axios";
import { Search, Grid, Header, Segment, Label } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const resultRenderer = ({ email, firstName, lastName }) => (
  <div>
    Email:
    <Label content={email} /> FirstName: <Label content={firstName} />
    <br />
    LastName: <Label content={lastName} />
  </div>
);

resultRenderer.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

function SearchPatient(props) {
  const initialState = {
    loading: false,
    results: [],
    value: "",
  };
  const { email, firstName, lastName, verificationCode } = props;
  const [userData, setUserData] = useState([]);
  const [state, setState] = useState(initialState);
  const { loading, results, value } = state;
  const timeoutRef = React.useRef();
  const [coronaPositive, setCoronaPositive] = useState("N");
  const [symptoms, setSymptoms] = useState([]);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/patient", {
        user: { email: value },
        coronaPositive: coronaPositive,
        symptoms: symptoms,
      })
      .then((response) => {
        history.push("/dashboard");
      })
      .catch((err) => console.log(err.message));
  };

  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    setState({ ...state, loading: true, value: data.value });
    console.log(state);
    timeoutRef.current = setTimeout(() => {
      axios
        .get(`/user/${data.value}`)
        .then((response) => {
          console.log(e);

          let output = [];

          if (data.value.length === 0) {
            setState({ initialState });
          }

          setState({ ...state, value: data.value, results: response.data });
        })
        .catch((error) => {
          setState({ initialState });
        });
    }, 300);
  }, []);

  const resultSelect = (e, data) => {
    setState({ ...state, value: data.result.email });
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

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
              <label>Email</label>
              <Grid>
                <Grid.Column width={15}>
                  <Search
                    loading={loading}
                    onResultSelect={resultSelect}
                    onSearchChange={handleSearchChange}
                    resultRenderer={resultRenderer}
                    results={results}
                    value={value}
                    placeholder="Search By Patient Name"
                  />
                </Grid.Column>
              </Grid>
            </div>
            <div className="five wide field">
              <label>Corona Positive(Y/N)</label>
              <input
                type="text"
                onChange={(e) => setCoronaPositive(e.target.value)}
                value={coronaPositive}
              />
            </div>
          </div>

          <div className="two fields">
            <div className="five wide field">
              <label>Symptoms</label>
              <input
                type="text"
                onChange={(e) => setSymptoms(e.target.value)}
                value={symptoms}
              />
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
export default SearchPatient;

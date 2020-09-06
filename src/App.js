import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import CountryReport from "./CountryReport";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from "react-router-dom";
import StateReport from "./StateReport";
import CityReport from "./CityReport";
import Login from "./Login";
import SignUp from "./SignUp";
import Reports from "./Reports";

function App() {
  return (
    <div className="app">
      <Router>
        <Route render={() => <Redirect to={{ pathname: "/dashboard" }} />} />
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signUp">
          <SignUp />
        </Route>
        <div className="app__body">
          <Header />
          <Switch>
            <Route exact path="/dashboard">
              <Reports />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

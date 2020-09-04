import React from "react";
import "./App.css";
import Header from "./Header";
import CountryReport from "./CountryReport";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StateReport from "./StateReport";
import CityReport from "./CityReport";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="app__body">
          <Header />
          <Switch>
            <Route exact path="/dashboard">
              <CountryReport />
            </Route>
          </Switch>
          <Switch>
            <Route exact path="/dashboard/:country">
              <StateReport />
            </Route>
          </Switch>
          <Switch>
            <Route exact path="/dashboard/:country/:state">
              <CityReport />
            </Route>
          </Switch>
        </div>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signUp">
          <SignUp />
        </Route>
      </Router>
    </div>
  );
}

export default App;

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
import Login from "./Login";
import SignUp from "./SignUp";
import Reports from "./Reports";

function App() {
  return (
    <div className="app">
      <Router>
        <Route exact path="/">
          <Redirect to="/dashboard" /> />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signUp">
          <SignUp />
        </Route>
        <div className="app__body">
          <Switch>
            <Route exact path="/dashboard">
              <Header />
              <Reports />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

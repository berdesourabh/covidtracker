import React from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CountryReport from "./CountryReport";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Route exact path="/dashboard">
          <Header />
          <div className="app__body">
            <CountryReport />
          </div>
        </Route>
      </Router>
    </div>
  );
}

export default App;

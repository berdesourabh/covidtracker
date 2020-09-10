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
import PatientDetail from "./PatientDetail";
import BreadCrumbs from "./BreadCrumbs";
import PatientList from "./PatientList";
import TablePaginationDemo from "./TablePaginationDemo";
import EditPatient from "./EditPatient";
import { useHistory } from "react-router-dom";
import Modal from "./Modal";

function App() {
  const history = useHistory();
  return (
    <div className="app">
      <Router>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signUp">
          <SignUp />
        </Route>
        <Route exact path="/signUp/success">
          <Modal
            header="Success!"
            content="Verification email has been sent!"
          />
        </Route>
        <div className="app__body">
          <Switch>
            <Route exact path="/dashboard">
              <Header />
              <BreadCrumbs />
              <Reports />
            </Route>
            <Route exact path="/patients">
              <Header />
              <PatientList />
            </Route>
            <Route exact path="/pagination">
              <TablePaginationDemo />
            </Route>
            <Route exact path="/patients/add">
              <Header />
              <PatientDetail />
            </Route>
            <Route exact path="/patients/edit/:id">
              <Header />
              <EditPatient />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router-dom";
import "./BreadCrumbs.css";

const BreadCrumbs = ({ history, location }) => {
  const { pathname, search } = location;
  let values = [];
  let x = search.slice(1);
  if (x != "") {
    x = decodeURIComponent(x);
    let params = x.split("&");

    params.map((param) => {
      values.push(param.split("=")[1]);
    });
    console.log(values);
  }
  return (
    <div className="breadcrumbs">
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <button className="breadcrumbs__linkButton">
          <Link
            className="breadcrumbs__link"
            color="inherit"
            onClick={() => history.push("/dashboard")}
            style={{ textDecoration: "none" }}
          >
            Dashboard
          </Link>
        </button>
        {values.map((val, index) => {
          const routeTo = x.slice(0, x.indexOf(val) + val.length);
          return (
            <button className="breadcrumbs__linkButton">
              <Link
                color="inherit"
                className="breadcrumbs__link"
                onClick={() => {
                  history.push(`/dashboard?${routeTo}`);
                }}
              >
                {val}
              </Link>
            </button>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default withRouter(BreadCrumbs);

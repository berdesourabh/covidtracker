import React, { useEffect, useState } from "react";
import CityReport from "./CityReport";
import StateReport from "./StateReport";
import { useLocation } from "react-router-dom";
import CountryReport from "./CountryReport";

function Reports() {
  const [country, setCountry] = useState("");
  const [countryState, setCountryState] = useState("");
  let location = useLocation();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  useEffect(() => {
    setCountry(query.get("country"));
    setCountryState(query.get("state"));
  }, [location]);

  const showReport = () => {
    if (countryState && country) {
      return <CityReport country={country} state={countryState} />;
    } else if (country) {
      return <StateReport country={country} />;
    }
    return <CountryReport />;
  };
  return <div>{showReport()}</div>;
}

export default Reports;

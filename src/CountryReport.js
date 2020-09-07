import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./CountryReport.css";
import Table from "./Table";
import Sidebar from "./Sidebar";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";

function CountryReport() {
  const [countryData, setCountryData] = useState([]);
  const [countriesFilterData, setCountriesFilterData] = useState([]);
  const [{ user, countryFilter }] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/dashboard/patients", {
        params: {
          country: "All",
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user?.jwtToken}`,
        },
      });
      if (countryFilter) {
        let data = response.data.countryReports.filter(
          (report) => report.name === countryFilter
        );
        setCountryData(data);
      } else {
        setCountryData(response.data.countryReports);
      }
    }
    fetchData();
  }, [countryFilter]);

  useEffect(() => {
    const getCountriesData = async () => {
      await axios.get("/countries").then((response) => {
        const countries = response.data.map((country) => ({
          key: country.name,
          text: country.name,
          value: country.name,
        }));
        setCountriesFilterData(countries);
      });
    };
    getCountriesData();
  }, []);

  const onCountryClick = (countryName) => {
    history.push({
      pathname: "/dashboard",
      search: `country=${countryName}`,
    });
  };

  const returnCountryData = () => {
    return countryData.map((country) => (
      <tr key={country.name} onClick={() => onCountryClick(country.name)}>
        <td>{country.name}</td>
        <td>{country.coronaData.coronaCases}</td>
        <td>{country.coronaData.totalRecovered}</td>
        <td>{country.coronaData.totalDeaths}</td>
      </tr>
    ));
  };

  return (
    <div className="countryReport">
      <Sidebar title="Country" filterData={countriesFilterData} />
      <Table
        region="Country"
        data={returnCountryData}
        onRegionClick={onCountryClick}
        isCountry
      />
    </div>
  );
}

export default CountryReport;

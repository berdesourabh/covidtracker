import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Table from "./Table";
import axios from "./axios";
import "./CityReport.css";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";

function CityReport({ country, state }) {
  const [cityFilterData, setCityFilterData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [{ user, cityFilter }] = useStateValue();

  useEffect(() => {
    async function fetchcityData() {
      const response = await axios.get("/dashboard/patients", {
        params: {
          country: `${country}`,
          state: `${state}`,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user?.jwtToken}`,
        },
      });
      if (cityFilter) {
        let data = response.data.countryReports[0].stateReports[0].cityReports.filter(
          (report) => report.cityName === cityFilter
        );
        setCityData(data);
      } else {
        setCityData(
          response.data.countryReports[0].stateReports[0].cityReports
        );
      }
    }
    fetchcityData();
  }, [cityFilter]);

  useEffect(() => {
    const getCityFilterData = async () => {
      await axios.get(`/cities/${country}/${state}`).then((response) => {
        const cities = response.data.map((city) => ({
          key: city.name,
          text: city.name,
          value: city.name,
        }));
        setCityFilterData(cities);
      });
    };
    getCityFilterData();
  }, []);

  const returnCityData = () => {
    return cityData.map((city) => (
      <tr key={city.cityName}>
        <td>{city.cityName}</td>
        <td>{city.coronaData.coronaCases}</td>
        <td>{city.coronaData.totalRecovered}</td>
        <td>{city.coronaData.totalDeaths}</td>
      </tr>
    ));
  };
  return (
    <div className="cityReport">
      <Sidebar title="City" filterData={cityFilterData} />
      <Table region="City" data={returnCityData} />
    </div>
  );
}

export default CityReport;

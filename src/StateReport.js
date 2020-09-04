import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Table from "./Table";
import axios from "./axios";
import "./StateReport.css";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";

function StateReport() {
  const [stateFilterData, setStateFilterData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [{ user }] = useStateValue();
  const { country } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchStateData() {
      const response = await axios.get("/dashboard/patients", {
        params: {
          country: `${country}`,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user?.jwtToken}`,
        },
      });
      setStateData(response.data.countryReports[0].stateReports);
    }
    fetchStateData();
  }, []);

  useEffect(() => {
    const getStateFilterData = async () => {
      await axios.get(`/states/${country}`).then((response) => {
        const states = response.data.map((state) => ({
          key: state.name,
          text: state.name,
          value: state.name,
        }));
        setStateFilterData(states);
      });
    };
    getStateFilterData();
  }, []);

  const onStateClick = (stateName) => {
    history.push(`/dashboard/${country}/${stateName}`);
  };

  const returnStateData = () => {
    return stateData.map((state) => (
      <tr key={state.name} onClick={() => onStateClick(state.name)}>
        <td>{state.name}</td>
        <td>{state.coronaData.coronaCases}</td>
        <td>{state.coronaData.totalRecovered}</td>
        <td>{state.coronaData.totalDeaths}</td>
      </tr>
    ));
  };
  return (
    <div className="stateReport">
      <Sidebar stateData={stateFilterData} countryValue={country} />
      <Table
        region="State"
        data={returnStateData}
        onRegionClick={onStateClick}
      />
    </div>
  );
}

export default StateReport;

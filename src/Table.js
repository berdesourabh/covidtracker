import React, { useState, useEffect } from "react";
import "./Table.css";
import axios from "./axios";
import { useStateValue } from "./StateProvider";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
// import { useLocation } from "react-router-dom";
// import * as QueryString from "query-string";

function TableData({ region }) {
  const [{ user }] = useStateValue();
  const [data, setData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [open, setOpen] = useState(false);
  //   const location = useLocation();
  //   const params = QueryString.parse(location.search);

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
      setData(response.data.countryReports);
    }
    fetchData();
  }, []);

  function ShowRow({ row }) {
    return (
      <React.Fragment>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="right">{row.name}</TableCell>
          <TableCell align="right">{row.coronaData?.coronaCases}</TableCell>
          <TableCell align="right">{row.coronaData?.totalRecovered}</TableCell>
          <TableCell align="right">{row.coronaData?.totalDeaths}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  State Data
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>State</TableCell>
                      <TableCell>Cases</TableCell>
                      <TableCell>Recovered</TableCell>
                      <TableCell>Deaths</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        123
                      </TableCell>
                      <TableCell>123</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>333</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <div className="table">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">{region}</TableCell>
              <TableCell align="right">Cases</TableCell>
              <TableCell align="right">Recovered</TableCell>
              <TableCell align="right">Deaths</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((country) => (
              <ShowRow key={country.name} row={country} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableData;

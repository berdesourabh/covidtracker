import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import axios from "./axios";
const useStyles = makeStyles({
  table: {
    minWidth: 800
  },
  cell:{
    'font-weight': 'bold'
    
  },
  
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function SimpleTable() {
  const classes = useStyles();
  
  const [res, setRes] = useState({}); 
  const [page, setPage] = React.useState(0);
  const [rows,setRows] = useState([]);
  const [count,setCount] = useState(0);
  let   [pageNumber,setPageNumber] = useState(0);
  const [pageSize,setPageSize] = useState(10);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [done,setDone] = useState(false);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    let x= event.target.value;
    setPageSize({x});
    apiData({pageNumber});
  };

  function apiData() {
    axios
      .get("/patients/pagination", {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRows(response.data.objects);
        setCount(response.data.total);
        setRes(response);
        setDone(true);
        setPage(pageNumber);

      })
      .catch((error) => console.log(error));
  }
useEffect(() => 
{
apiData();
setPage(pageNumber);
setDone(true);
}, [page]);
const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

return(
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>First Name</TableCell>
            <TableCell className={classes.cell} align="right">
              Last Name
            </TableCell>
            <TableCell className={classes.cell} align="right">
              E-mail address
            </TableCell>
            <TableCell className={classes.cell} align="right">
              Country
            </TableCell>
            <TableCell className={classes.cell} align="right">
              State
            </TableCell>
            <TableCell className={classes.cell} align="right">
              City
            </TableCell>
            <TableCell className={classes.cell} align="right">
              Report Status
            </TableCell>
            <TableCell className={classes.cell} align="right">
              Operations
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          
          res ?rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={row.patientId}>
                <TableCell component="th" scope="row">
                  {row.user.firstName}Hellllo
                </TableCell>
                <TableCell align="right">{row.user.lastName}</TableCell>
                <TableCell align="right">{row.user.email}</TableCell>
                <TableCell align="right">{row.user.country}</TableCell>
                <TableCell align="right">{row.user.state}</TableCell>
                <TableCell align="right">{row.user.city}</TableCell>
                <TableCell align="right">{row.reportStatus}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            )):<div >loading</div>}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={8} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
)
          
  


  

  
  
}

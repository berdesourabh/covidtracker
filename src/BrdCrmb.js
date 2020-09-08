import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';

 const  Brdcrmb = props => {

    console.log(props);

    const {history,location} = props;
    const {pathname,search} = location;
    let values = [];
    let x  = search.slice(1);
    if(x!= ''){
    x= decodeURIComponent(x);
    let params = x.split("&");
    
    params.map((param) => { values.push(param.split("=")[1])});
    console.log(values);
    }
    return (
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit"onClick = {() => history.push("/dashboard")}>Dashboard</Link>
           {values.map((val,index)=> {

               const routeTo = x.slice(0,x.indexOf(val)+val.length);
           return <Link onClick={()=> {
            console.log(`/dashboard?${routeTo}`);   
            history.push(`/dashboard?${routeTo}`)}}>{val}</Link>
           })} 
          
         
        </Breadcrumbs>
      </div>
    );
}

export default withRouter(Brdcrmb);

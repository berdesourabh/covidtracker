import axios from "axios";

const instance = axios.create({
  // baseURL: "http://cvd-env.eba-fjqwkwrn.us-east-1.elasticbeanstalk.com",
  baseURL: "http://localhost:5000",
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance;

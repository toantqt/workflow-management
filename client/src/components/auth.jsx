import jwt_decode from "jwt-decode";
import { date } from "@hapi/joi";
export const isLoggedIn = () => {
  const token = localStorage.getItem("userToken");
  //const token = localStorage.userToken;
  console.log("test last time");
  //console.log(token); // true !token
  if (token != null) {
    const tokenJSON = JSON.parse(localStorage.userToken);
    //const refreshToken = tokenJSON.refreshToken;
    const accessToken = tokenJSON.accessToken;
    // const decoded = jwt_decode(refreshToken);
    const decoded = jwt_decode(accessToken);
    //console.log(new Date());
    //console.log(Date.now());
    //console.log(decoded);
    // console.log(new Date(decoded.iat));
    console.log(decoded);
    if (!decoded.data.isActive) {
      localStorage.clear();
      alert("tài khoản chưa được xác thực");
      return false;
      //return window.location.reload();
    }
    //console.log(new Date(decoded.exp) * 1000);
    // console.log(decoded.exp * 1000);
    if (Date.now() > new Date(decoded.exp) * 1000) {
      localStorage.clear();
      return false;
    }
  }

  return !!token; //false
};
export const checkLock = () => {
  const token = localStorage.userToken;
  const decoded = jwt_decode(token);
  //console.log(decoded);
  const lock = decoded.data.deletedAt;
  if (lock === false) {
    return true;
  }
  return false;
};
// import React, { Component } from "react";

// class isLoggedIn extends Component {
//   render() {
//     return <div></div>;
//   }
// }

// export default isLoggedIn;

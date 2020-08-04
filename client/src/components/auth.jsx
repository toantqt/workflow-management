import jwt_decode from "jwt-decode";
export const isLoggedIn = () => {
  const token = localStorage.getItem("userToken");
  return !!token;
};
export const checkLock = () => {
  const token = localStorage.userToken;
  const decoded = jwt_decode(token);
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

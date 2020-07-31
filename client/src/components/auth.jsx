// export const isLoggedIn = () => {
//   const token = localStorage.getItem("userToken");
//   if (token !== null) {
//     return true;
//   }
//   return false;
// };
export const isLoggedIn = () => {
  const token = localStorage.getItem("userToken");
  return !!token;
};
// import React, { Component } from "react";

// class isLoggedIn extends Component {
//   render() {
//     return <div></div>;
//   }
// }

// export default isLoggedIn;

import React from "react";
import "./components/login-register/login.component.css";
import LoginComponent from "./components/login-register/login.component";
import RegisterComponent from "./components/login-register/register.component";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import HomeComponent from "./components/home/home.component";
import EditProfileComponent from "./components/profile/editProfile.component";

function App() {
  return (
    <Router>
      <div>
        <Route path="/edit-profile" component={EditProfileComponent}></Route>
        <Route path="/login" component={LoginComponent}></Route>
        <Route path="/register" component={RegisterComponent}></Route>
        <Route path="/home" component={HomeComponent}></Route>
      </div>
    </Router>
    // <div className="app">
    //   <LoginComponent />
    //   <RegisterComponent />
    // </div>
  );
}
export default App;

import React from "react";
import "./components/login-register/login.component.css";
import LoginComponent from "./components/login-register/login.component";
import RegisterComponent from "./components/login-register/register.component";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import HomeComponent from "./components/home/home.component";
import EditProfileComponent from "./components/profile/editProfile.component";
import ButtonAppBar from "./components/navbar/appBar.component";
import { isLoggedIn } from "./components/auth.jsx";
//import { Redirect } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Route path="/edit-profile" component={EditProfileComponent}></Route> */}
        <Route
          path="/edit-profile"
          render={() =>
            isLoggedIn() ? <EditProfileComponent /> : <Redirect to="/login" />
          }
        ></Route>

        <Route
          path="/login"
          render={() =>
            isLoggedIn() ? <Redirect to="/" /> : <LoginComponent />
          }
        ></Route>
        <Route
          path="/register"
          render={() =>
            isLoggedIn() ? <Redirect to="/" /> : <RegisterComponent />
          }
        ></Route>
        <Route
          path="/"
          render={() =>
            isLoggedIn() ? <HomeComponent /> : <Redirect to="/login" />
          }
        ></Route>
      </div>
    </BrowserRouter>
  );
}
export default App;

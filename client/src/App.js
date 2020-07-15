import React from "react";
import "./components/login-register/login.component.css";
import LoginComponent from "./components/login-register/login.component";
import RegisterComponent from "./components/login-register/register.component";
import { Route, BrowserRouter } from "react-router-dom";
import HomeComponent from "./components/home/home.component";
import EditProfileComponent from "./components/profile/editProfile.component";
import ButtonAppBar from "./components/bar/appBar.component";
import { isLoggedIn } from "./components/auth.jsx";
import { Redirect } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={LoginComponent} />
        <Route path="/edit-profile" component={EditProfileComponent}></Route>
        <Route
          path="/login"
          component={() =>
            isLoggedIn() ? <Redirect to="/home" /> : <LoginComponent />
          }
        ></Route>
        <Route path="/register" component={RegisterComponent}></Route>
        <Route
          path="/home"
          render={() =>
            isLoggedIn() ? <HomeComponent /> : <Redirect to="/login" />
          }
        ></Route>
      </div>
    </BrowserRouter>
    // <div className="app">
    //   <LoginComponent />
    //   <RegisterComponent />
    // </div>
  );
}
export default App;

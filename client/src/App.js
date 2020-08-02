import React from "react";
import "./components/login-register/login.component.css";
import LoginComponent from "./components/login-register/login.component";
import RegisterComponent from "./components/login-register/register.component";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import HomeComponent from "./components/home/home.component";
import EditProfileComponent from "./components/profile/editProfile.component";
import ButtonAppBar from "./components/navbar/appBar.component";
import { isLoggedIn } from "./components/auth.jsx";
import PrivateRoomComponent from "./components/room/private-room.component";
import ListTaskComponent from "./components/list-task/list-task.component";
import ManageComponent from "./components/manage/manage.component";
import ProfileStaffComponent from "./components/profile-staff/profile-staff.component";
import ProfileRoomComponent from "./components/profile-room/profile-room.component";
import OverviewComponent from "./components/overview/overview.component";
//import { Redirect } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Route path="/edit-profile" component={EditProfileComponent}></Route> */}

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
          exact
          path="/"
          render={() =>
            isLoggedIn() ? <HomeComponent /> : <Redirect to="/login" />
          }
        ></Route>
        <Route
          path="/edit-profile/"
          render={() =>
            isLoggedIn() ? <EditProfileComponent /> : <Redirect to="/login" />
          }
        ></Route>

        <Route
          path="/room/:id"
          render={({ match }) =>
            isLoggedIn() ? (
              <PrivateRoomComponent id={match.params.id} />
            ) : (
              <Redirect to="/login" />
            )
          }
        ></Route>

        <Route
          path="/task/:id"
          render={({ match }) =>
            isLoggedIn() ? (
              <ListTaskComponent id={match.params.id} />
            ) : (
              <Redirect to="/login" />
            )
          }
        ></Route>

        <Route
          path="/manage/"
          render={() =>
            isLoggedIn() ? <ManageComponent /> : <Redirect to="/login" />
          }
        ></Route>

        <Route
          path="/manage/overview"
          render={() =>
            isLoggedIn() ? <OverviewComponent /> : <Redirect to="/login" />
          }
        ></Route>

        <Route
          path="/manage/profile"
          render={() =>
            isLoggedIn() ? <ProfileStaffComponent /> : <Redirect to="/login" />
          }
        ></Route>
        <Route
          path="/manage/room"
          render={() =>
            isLoggedIn() ? <ProfileRoomComponent /> : <Redirect to="/login" />
          }
        ></Route>
      </div>
    </BrowserRouter>
  );
}
export default App;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AppBarComponent from "../navbar/appBar.component";
import SidebarComponent from "../sidebar/sidebar.component";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",

      accessToken: "",
      role: "",
    };
  }
  componentDidMount() {
    const token = localStorage.userToken;
    const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(token);
    this.setState({
      username: decoded.data.username,
      email: decoded.data.email,
      role: decoded.data.role,
      accessToken: accessToken,
    });
  }

  //handle logout click
  handleLogout = () => {
    localStorage.clear();
  };

  render() {
    return (
      <div>
        <AppBarComponent username={this.state.username} />
        <SidebarComponent data={this.state} />
      </div>
    );
  }
}

export default HomeComponent;

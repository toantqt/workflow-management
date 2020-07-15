import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AppBarComponent from "../bar/appBar.component";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",

      accessToken: "",
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
      accessToken: accessToken,
    });
  }

  //handle logout click
  handleLogout = () => {
    localStorage.clear();
  };

  //console.log(this.state);

  render() {
    return (
      <div>
        <AppBarComponent username={this.state.username} />
        <h1>Hello {this.state.username}</h1>
        <Link className="logout" onClick={this.handleLogout} to="/login">
          Logout
        </Link>
        <Link
          className="edit-profile"
          to={`/edit-profile/email=${this.state.username}`}
        >
          Edit Profile
        </Link>
      </div>
    );
  }
}

export default HomeComponent;

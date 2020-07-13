import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
    };
  }
  componentDidMount() {
    const token = localStorage.userToken;
    const decoded = jwt_decode(token);
    this.setState({
      username: decoded.data.username,
      email: decoded.data.email,
    });
  }

  //handle logout click
  handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  render() {
    return (
      <div>
        <h1>Hello {this.state.username}</h1>
        <Link className="logout" onClick={this.handleLogout}>
          Logout
        </Link>
      </div>
    );
  }
}

export default HomeComponent;

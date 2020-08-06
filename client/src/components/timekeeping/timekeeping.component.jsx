import React, { Component } from "react";
import AppBarComponent from "../navbar/appBar.component";
import jwt_decode from "jwt-decode";

class TimekeepingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }
  componentDidMount() {
    const token = localStorage.userToken;
    const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(token);
    this.setState({
      username: decoded.data.username,
      accessToken: accessToken,
    });
  }
  render() {
    return (
      <div>
        <AppBarComponent username={this.state.username} />
      </div>
    );
  }
}

export default TimekeepingComponent;

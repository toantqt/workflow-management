import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import AppBarComponent from "../navbar/appBar.component";
import AllTasksComponent from "./all-tasks.component";
class TaskStatisticsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
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
      accessToken: accessToken,
    });
  }

  render() {
    return (
      <div>
        <AppBarComponent username={this.state.username} />
        <AllTasksComponent accessToken={this.state.accessToken} />
      </div>
    );
  }
}

export default TaskStatisticsComponent;

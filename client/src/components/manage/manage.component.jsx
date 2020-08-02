import React, { Component } from "react";
import AppBarComponent from "../navbar/appBar.component";
import jwt_decode from "jwt-decode";

import SidebarManageComponent from "../sidebar-manager/sidebar-manage.component";

class ManageComponent extends Component {
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
        <div className="row" style={{ margin: "0 auto" }}>
          <SidebarManageComponent />
        </div>
      </div>
    );
  }
}

export default ManageComponent;

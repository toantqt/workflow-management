import React, { Component } from "react";
import AppBarComponent from "../navbar/appBar.component";
import jwt_decode from "jwt-decode";
import { getDataRoom } from "./roomFunction";

class PrivateRoomComponent extends Component {
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
    });
    let id = this.props.id;
    getDataRoom(accessToken, id)
      .then((res) => {
        this.setState({
          name: res.data.nameRoom,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <AppBarComponent username={this.state.username} />
        <h1>hello {this.state.name}</h1>
      </div>
    );
  }
}

export default PrivateRoomComponent;

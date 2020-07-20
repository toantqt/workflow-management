import React, { Component } from "react";
//import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AppBarComponent from "../navbar/appBar.component";
import SidebarComponent from "../sidebar/sidebar.component";
import RoomComponent from "../home-room/room.component";
import RoomModal from "../add-room/roomModal";
import FooterComponent from "../footer/footer.component";
import { getListRoom } from "./homeFunction";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",

      accessToken: "",
      role: "",
      room: [],
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

    //get list room
    getListRoom(accessToken).then((res) => {
      const room = res.data.getRoom;

      room.forEach((element) => {
        this.setState({
          room: [
            ...this.state.room,
            { id: element._id, name: element.nameRoom },
          ],
        });
      });
    });
  }

  //handle logout click
  handleLogout = () => {
    localStorage.clear();
  };

  render() {
    return (
      <div>
        <RoomModal />
        <AppBarComponent username={this.state.username} />
        <div className="row" style={{ margin: "0 auto " }}>
          <SidebarComponent data={this.state} />
          <RoomComponent data={this.state} />
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default HomeComponent;

import React, { Component } from "react";
//import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AppBarComponent from "../navbar/appBar.component";
import SidebarComponent from "../sidebar/sidebar.component";
import RoomComponent from "../home-room/room.component";
import RoomModal from "../add-room/roomModal";
import FooterComponent from "../footer/footer.component";
import HomeBoardComponent from "../home-board/home-board.component";
import { getListRoom, getRoomOfUser, getBoardUser } from "./homeFunction";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      idUser: "",
      accessToken: "",
      role: "",
      room: [],
      roomUser: [],
      boardUser: [],
    };
  }
  componentDidMount() {
    const token = localStorage.userToken;
    const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(token);

    //get list room
    getListRoom(accessToken)
      .then(async (res) => {
        const room = res.data.getRoom;
        await this.setState({
          username: decoded.data.username,
          email: decoded.data.email,
          role: decoded.data.role,
          accessToken: accessToken,
          idUser: decoded.data._id,
        });
        if (this.state.role === "staff") {
          getRoomOfUser(accessToken, this.state.idUser)
            .then((res) => {
              res.data.forEach(async (e) => {
                await this.setState({
                  roomUser: [
                    ...this.state.roomUser,
                    { id: e._id, name: e.nameRoom, deletedAt: e.deletedAt },
                  ],
                });

                this.state.roomUser.forEach(async (e) => {
                  const data = {
                    idUser: this.state.idUser,
                    roomId: e.id,
                  };
                  await getBoardUser(accessToken, data)
                    .then((res) => {
                      if (res.data.length !== 0) {
                        res.data.forEach(async (e) => {
                          await this.setState({
                            boardUser: [...this.state.boardUser, e],
                          });
                        });
                      }

                      //console.log(this.state.boardUser);
                    })
                    .catch((error) => {
                      //console.log(error);
                    });
                });
              });
            })
            .catch((error) => {
              //console.log(error);
            });
          //console.log(this.state);
        } else {
          room.forEach((element) => {
            this.setState({
              room: [
                ...this.state.room,
                {
                  id: element._id,
                  name: element.nameRoom,
                  deletedAt: element.deletedAt,
                },
              ],
            });
          });
        }

        //get room id
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  //handle logout click
  handleLogout = () => {
    localStorage.clear();
  };
  render() {
    if (this.state.role === "staff") {
      return (
        <div>
          <RoomModal />
          <AppBarComponent username={this.state.username} />
          <div className="row" style={{ margin: "0 auto " }}>
            <SidebarComponent data={this.state} />
            <div className="col-9">
              <RoomComponent data={this.state} />
              <HomeBoardComponent data={this.state} />
            </div>
          </div>
          <FooterComponent />
        </div>
      );
    } else {
      return (
        <div>
          <RoomModal />
          <AppBarComponent username={this.state.username} />
          <div className="row" style={{ margin: "0 auto " }}>
            <SidebarComponent data={this.state} />
            <div className="col-9">
              <RoomComponent data={this.state} />
            </div>
          </div>
          <FooterComponent />
        </div>
      );
    }
  }
}

export default HomeComponent;

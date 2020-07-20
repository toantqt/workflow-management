import React, { Component } from "react";
import AppBarComponent from "../navbar/appBar.component";
import RoomSidebarComponent from "../roomSidebar/room-sidebar.component";
import TaskComponent from "../task/task.component";
import jwt_decode from "jwt-decode";
import { getDataRoom } from "./roomFunction";

class PrivateRoomComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      nameRoom: "",
      members: [],
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
      .then(async (res) => {
        console.log(res);
        let arrMembers = res.inforMember;
        //console.log(arrMembers);
        await arrMembers.forEach(async (e) => {
          // console.log(e);
          await this.setState({
            members: [...this.state.members, { e }],
            nameRoom: res.data.nameRoom,
            ownerId: res.data.ownerId,
          });
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    let listMember = this.state.members.map((element, index) => {
      return <li key={index}>{element.e.username}</li>;
    });
    return (
      <div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <AppBarComponent username={this.state.username} />
        <div className="row" style={{ margin: "0 auto " }}>
          <RoomSidebarComponent data={this.state} />
          <TaskComponent />
        </div>
      </div>
    );
  }
}

export default PrivateRoomComponent;

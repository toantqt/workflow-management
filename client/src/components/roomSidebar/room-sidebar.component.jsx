import React, { Component } from "react";
import { rmeUserInRoom } from "./roomsidebarFunction";
// import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
class RoomSidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: "",
      idUserOnl: "",
      idUserRm: "",
    };
    // console.log(this.props.data);
  }
  componentDidMount = async () => {
    const token = localStorage.userToken;
    const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(token);

    await this.setState({
      idUserOnl: decoded.data._id,
      accessToken: accessToken,
    });
    //console.log(this.state);
  };

  changeValueRemove = async (e) => {
    e.preventDefault();

    //console.log(e.target);
    this.setState({
      idUserRm: e.target.id,
    });
  };
  removeUserInRoom = (e) => {
    e.preventDefault();
    //console.log(this.props.data);
    if (this.state.idUserOnl === this.props.data.ownerId) {
      //console.log(e.target);
      let inforRoom = {
        idUserOnl: this.state.idUserOnl,
        idRoom: this.props.data.roomId,
        idUserRm: this.state.idUserRm,
      };
      // console.log(inforRoom);
      rmeUserInRoom(this.state.accessToken, inforRoom).then((res) => {
        console.log("done");
      });
    } else {
      alert("ban khong phai addmin");
      console.log("ban la nguoi dung bt thoi");
    }
  };

  render() {
    //console.log("rneder " + this.props.data.ownerId);
    const adduser = [1].map((e) => {
      return this.state.idUserOnl === this.props.data.ownerId ? (
        <li
          className="nav-item"
          data-toggle="modal"
          data-target="#addMemberModal"
        >
          <a href="#addroom" className="nav-link">
            <i className="fas fa-plus" aria-hidden="true"></i>
            Add User
          </a>
        </li>
      ) : null;
    });

    const listMember = this.props.data.members.map((member, index) => {
      if (member.e._id === this.props.data.ownerId) {
        return (
          <li className="nav-item" key={index} style={{ marginTop: "15px" }}>
            <a className="nav-link">
              <i className="fas fa-user-shield"></i>
              {member.e.username}
            </a>
          </li>
        );
      } else {
        return (
          <li className="nav-item" key={index} style={{ marginTop: "15px" }}>
            <a
              className="nav-link"
              id={member.e._id}
              // onClick={this.removeUserInRoom}
              data-target="#removeuser"
              data-toggle="modal"
              onClick={this.changeValueRemove}
            >
              <i className="fa fa-pencil" aria-hidden="true"></i>
              {member.e.username}
            </a>
          </li>
        );
      }
    });

    return (
      <div className="col-3">
        <div
          class="modal fade"
          id="removeuser"

          // tabindex="-1"
          // role="dialog"
          // aria-labelledby="mySmallModalLabel"
          // aria-hidden="true"
        >
          <div class="modal-dialog ">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Are you sure to delete "abc"</h4>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  // id={target.id}
                  onClick={this.removeUserInRoom}
                  data-dismiss="modal"
                >
                  Yes
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  id="modal-btn-no"
                  data-dismiss="modal"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          id="sidebar-main"
          className="sidebar sidebar-default sidebar-separate sidebar-fixed"
        >
          <div className="sidebar-content">
            <div className="sidebar-category sidebar-default">
              <div className="sidebar-user">
                <div className="category-content">
                  <h6 style={{ fontSize: "20px" }}>
                    {this.props.data.nameRoom}
                  </h6>
                </div>
              </div>
            </div>

            <div className="sidebar-category sidebar-default">
              <div className="category-title">
                <span style={{ fontSize: "15px" }}>Members</span>
              </div>
              <div className="category-content">
                <ul id="fruits-nav" className="nav flex-column">
                  <li className="nav-item">
                    <a
                      href="#other-fruits"
                      className="nav-link"
                      data-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="other-fruits"
                    >
                      <i className="fas fa-layer-group" aria-hidden="true"></i>
                      List Member
                    </a>
                    <ul id="other-fruits" className="flex-column collapse">
                      {listMember}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="sidebar-category sidebar-default">
              <div className="category-title">
                <span style={{ fontSize: "15px" }}>Other</span>
              </div>
              <div className="category-content">
                <ul id="sidebar-editable-nav" className="nav flex-column">
                  <li
                    className="nav-item"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <a href="#addroom" className="nav-link">
                      <i className="fas fa-plus" aria-hidden="true"></i>
                      Add Task
                    </a>
                  </li>
                  {adduser}
                  {/* <li
                    className="nav-item"
                    data-toggle="modal"
                    data-target="#addMemberModal"
                    style={{ display: this.state.display }}
                  >
                    <a href="#addroom" className="nav-link">
                      <i className="fas fa-plus" aria-hidden="true"></i>
                      Add User
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomSidebarComponent;

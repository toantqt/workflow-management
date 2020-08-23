import React, { Component } from "react";
import { rmeUserInRoom } from "./roomsidebarFunction";
// import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Image } from "cloudinary-react";
import "./room-sidebar.component.css";
class RoomSidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: "",
      idUserOnl: "",
      idUserRm: "",
      username: "",
      fullname: "",
      profile: "",
      email: "",
      role: "",
      remove: false,
    };
    //console.log(this.props.data);
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

    console.log(this.state);
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
      //console.log(inforRoom);
      rmeUserInRoom(this.state.accessToken, inforRoom).then((res) => {
        //console.log("done");
      });
    } else {
      alert("ban khong phai addmin");
      //console.log("ban la nguoi dung bt thoi");
    }
  };
  showProfile = async (event) => {
    event.preventDefault();
    //console.log(this.props.data);
    this.props.data.members.forEach(async (element) => {
      if (event.target.id === element.e._id) {
        //console.log(element.e);
        //console.log(element.e.profile);
        await this.setState({
          username: element.e.username,
          fullname: element.e.fullName,
          profile: element.e.profile,
          email: element.e.email,
          role: element.e.role,
        });
      }
    });
    //console.log(this.state);
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
    let lisMembers;
    if (this.state.idUserOnl === this.props.data.ownerId) {
      lisMembers = this.props.data.members.map((member, index) => {
        if (member.e._id === this.props.data.ownerId) {
          return (
            <li className="nav-item" key={index} style={{ marginTop: "15px" }}>
              <div class="dropright">
                <a className="nav-link" data-toggle="dropdown">
                  <i
                    className="fas fa-user-shield"
                    style={{ paddingRight: "10px" }}
                  ></i>
                  {member.e.username}
                </a>
                <ul class="dropdown-menu" style={{ height: "30px" }}>
                  <li>
                    <a
                      href="#"
                      className="nav-link"
                      data-toggle="modal"
                      // data-target={"#" + member.e._id}
                      data-target="#showProfile"
                      id={member.e._id}
                      onClick={this.showProfile}
                    >
                      <i class="fa fa-info"></i>
                      Xem Profile
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          );
        } else {
          return (
            <li className="nav-item" key={index} style={{ marginTop: "15px" }}>
              <div className="dropright">
                <a className="nav-link" data-toggle="dropdown">
                  <i
                    className="fa fa-pencil"
                    style={{ paddingRight: "10px" }}
                  ></i>
                  <span>&nbsp;</span>
                  {member.e.username}
                </a>
                <ul className="dropdown-menu" style={{ height: "60px" }}>
                  <li>
                    <a
                      href="#"
                      className="nav-link"
                      data-toggle="modal"
                      // data-target={"#" + member.e._id}
                      data-target="#showProfile"
                      id={member.e._id}
                      onClick={this.showProfile}
                    >
                      <i class="fa fa-info"></i>
                      Xem Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="nav-link"
                      id={member.e._id}
                      data-target="#removeuser"
                      data-toggle="modal"
                      onClick={this.changeValueRemove}
                    >
                      <i class="fa fa-minus"></i>
                      Xoa
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          );
        }
      });
    } else {
      lisMembers = this.props.data.members.map((member, index) => {
        if (member.e._id === this.props.data.ownerId) {
          return (
            <li className="nav-item" key={index} style={{ marginTop: "15px" }}>
              <div class="dropright">
                <a className="nav-link" data-toggle="dropdown">
                  <i
                    className="fas fa-user-shield"
                    style={{ paddingRight: "10px" }}
                  ></i>
                  {member.e.username}
                </a>
                <ul class="dropdown-menu" style={{ height: "30px" }}>
                  <li>
                    <a
                      href="#"
                      className="nav-link"
                      data-toggle="modal"
                      // data-target={"#" + member.e._id}
                      data-target="#showProfile"
                      id={member.e._id}
                      onClick={this.showProfile}
                    >
                      <i class="fa fa-info"></i>
                      Xem Profile
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          );
        } else {
          return (
            <li className="nav-item" key={index} style={{ marginTop: "15px" }}>
              <div class="dropright">
                <a className="nav-link" data-toggle="dropdown">
                  <i
                    className="fa fa-pencil"
                    style={{ paddingRight: "10px" }}
                  ></i>
                  {member.e.username}
                </a>
                <ul class="dropdown-menu" style={{ height: "30px" }}>
                  <li>
                    <a
                      href="#"
                      className="nav-link"
                      data-toggle="modal"
                      // data-target={"#" + member.e._id}
                      data-target="#showProfile"
                      id={member.e._id}
                      onClick={this.showProfile}
                    >
                      <i class="fa fa-info"></i>
                      Xem Profile
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          );
        }
      });
    }

    return (
      <div className="col-3">
        <div class="modal fade" id="removeuser">
          <div class="modal-dialog ">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Are you sure to delete user</h4>
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
                    <ul id="other-fruits" className="flex-column collapse ">
                      {lisMembers}
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

        {/* {this.state.showModal ? ( */}
        <div
          class="modal fade"
          // id={this.state.idModal}
          id="showProfile"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content" style={{ height: "400px" }}>
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Thông tin nhân viên
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
              <div class="modal-body">
                <div className="row">
                  <div class="col-4">
                    <Image
                      id="avatar"
                      cloudName="phathuynh"
                      publicId={this.state.profile.avatar}
                      height="150px"
                      width="150px"
                      borderRadius="100%"
                    />
                  </div>
                  <div class="col-8">
                    <h3>{this.state.role}</h3>
                    <table class="table">
                      <tr>
                        <th>Ten</th>
                        <td>{this.state.username}</td>
                      </tr>
                      <tr>
                        <th>Ho ten day du</th>
                        <td>{this.state.fullname}</td>
                      </tr>
                      <tr>
                        <th>giới tính</th>
                        <td>{this.state.profile.gender}</td>
                      </tr>
                    </table>
                  </div>
                </div>

                <h3>Thong tin lien lac</h3>
                <table class="table">
                  <tr>
                    <th>Email</th>
                    <td>{this.state.email}</td>
                  </tr>
                  <tr>
                    <th>địa chỉ nhà</th>
                    <td>{this.state.profile.address}</td>
                  </tr>
                </table>
              </div>
              {/* <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div> */}
            </div>
          </div>
        </div>
        {/* ) : null} */}
      </div>
    );
  }
}

export default RoomSidebarComponent;

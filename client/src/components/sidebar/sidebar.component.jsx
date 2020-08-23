import React, { Component } from "react";
import "./sidebar.component.css";
import AddComponent from "../add-room/add.component";
import Timekeepping from "../timekeeping/timekeeping.component";
import { Link } from "react-router-dom";

class SidebarComponent extends Component {
  checkRole = () => {
    const role = this.props.data.role;
    if (role === "admin") {
      return true;
    }
    return false;
  };
  render() {
    //console.log(this.props.data);
    //list room user
    const listRoomUser = this.props.data.roomUser.map((room, index) => {
      if (!room.deletedAt) {
        return (
          <li className="nav-item" key={index} style={{ marginTop: "15px" }}>
            <Link className="nav-link" to={`/room/${room.id}`}>
              <i className="fa fa-pencil" aria-hidden="true"></i>
              {room.name}
            </Link>
          </li>
        );
      }
    });

    //list room
    const listRoom = this.props.data.room.map((room, index) => {
      if (!room.deletedAt) {
        return (
          <li className="nav-item" key={index} style={{ marginTop: "15px" }}>
            <Link className="nav-link" to={`/room/${room.id}`}>
              <i className="fa fa-pencil" aria-hidden="true"></i>
              {room.name}
            </Link>
          </li>
        );
      }
    });

    if (this.checkRole()) {
      return (
        <div className="col-3">
          <div
            id="sidebar-main"
            className="sidebar sidebar-default sidebar-separate sidebar-fixed"
          >
            <div className="sidebar-content">
              <div className="sidebar-category sidebar-default">
                <div className="sidebar-user">
                  <div className="category-content">
                    <h6 style={{ fontSize: "20px" }}>
                      {this.props.data.username}
                    </h6>
                    <small>{this.props.data.role}</small>
                  </div>
                </div>
              </div>

              <div className="sidebar-category sidebar-default">
                <div className="category-title">
                  <span style={{ fontSize: "15px" }}>Room</span>
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
                        <i
                          className="fas fa-layer-group"
                          aria-hidden="true"
                        ></i>
                        List Room
                      </a>
                      <ul id="other-fruits" className="flex-column collapse">
                        {listRoom}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <AddComponent />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-3">
          <div
            id="sidebar-main"
            className="sidebar sidebar-default sidebar-separate sidebar-fixed"
          >
            <div className="sidebar-content">
              <div className="sidebar-category sidebar-default">
                <div className="sidebar-user">
                  <div className="category-content">
                    <h6 style={{ fontSize: "20px" }}>
                      {this.props.data.username}
                    </h6>
                    <small>{this.props.data.role}</small>
                  </div>
                </div>
              </div>

              <div className="sidebar-category sidebar-default">
                <div className="category-title">
                  <span style={{ fontSize: "15px" }}>Room</span>
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
                        <i
                          className="fas fa-layer-group"
                          aria-hidden="true"
                        ></i>
                        List Room
                      </a>
                      <ul id="other-fruits" className="flex-column collapse">
                        {listRoomUser}
                      </ul>
                    </li>

                    <li className="nav-item">
                      {/* <Link className="nav-link" to="/timekeepping"> */}

                      <Link
                        role="button"
                        aria-expanded="false"
                        className="nav-link"
                        to="/timekeeping"
                      >
                        <i
                          className="fa fa-calendar mr-4"
                          aria-hidden="true"
                        ></i>
                        Timekeepping
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SidebarComponent;

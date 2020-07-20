import React, { Component } from "react";
import { Link } from "react-router-dom";
class RoomSidebarComponent extends Component {
  render() {
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
            <a className="nav-link">
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

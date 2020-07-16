import React, { Component } from "react";
import "./sidebar.component.css";
import AddComponent from "../add-room/add.component";

class SidebarComponent extends Component {
  checkRole = () => {
    const role = this.props.data.role;
    if (role === "admin") {
      return true;
    }
    return false;
  };
  render() {
    if (this.checkRole()) {
      return (
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
                      <i class="fas fa-layer-group" aria-hidden="true"></i>
                      List Room
                    </a>
                    <ul id="other-fruits" className="flex-column collapse">
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                          Room 1
                        </a>
                      </li>
                      <li className="nav-item ">
                        <a href="#" className="nav-link">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                          Room 2
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <AddComponent />
          </div>
        </div>
      );
    } else {
      return (
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
                      <i class="fas fa-layer-group" aria-hidden="true"></i>
                      List Room
                    </a>
                    <ul id="other-fruits" className="flex-column collapse">
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                          Room 1
                        </a>
                      </li>
                      <li className="nav-item ">
                        <a href="#" className="nav-link">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                          Room 2
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SidebarComponent;

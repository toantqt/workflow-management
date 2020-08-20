import React, { Component } from "react";
import "../sidebar/sidebar.component.css";
import { Link } from "react-router-dom";
class SidebarManageComponent extends Component {
  render() {
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
                  <Link
                    to="/manage/overview"
                    className="nav-link"
                    style={{
                      fontSize: "20px",
                      marginTop: "10px",
                      marginBottom: "10px",
                      color: "inherit",
                      fontFamily: "inherit",
                      fontWeight: "500",
                      lineHeight: "1.1",
                    }}
                  >
                    Employee Profile
                  </Link>
                </div>
              </div>
            </div>

            <div className="sidebar-category sidebar-default">
              <div className="category-title">
                <span style={{ fontSize: "15px" }}>Manage</span>
              </div>
              <div className="category-content">
                <ul id="fruits-nav" className="nav flex-column">
                  <li className="nav-item">
                    <a
                      href="#staff"
                      className="nav-link"
                      data-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="other-fruits"
                    >
                      <i class="far fa-address-card" aria-hidden="true"></i>
                      Profile
                    </a>
                    <ul id="staff" className="flex-column collapse">
                      <li className="nav-item" style={{ marginTop: "15px" }}>
                        <Link to="/manage/profile" className="nav-link">
                          <i class="fas fa-user"></i>
                          Staff
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="category-content">
                <ul id="sidebar-editable-nav" className="nav flex-column">
                  <li className="nav-item">
                    <Link to="/manage/room" className="nav-link">
                      <i class="fas fa-layer-group"></i>
                      Room
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/manage/staffworktime" className="nav-link">
                      <i class="fas fa-layer-group"></i>
                      StaffWorkTime
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/manage/editsalary" className="nav-link">
                      <i class="fas fa-layer-group"></i>
                      EditSalary
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

export default SidebarManageComponent;

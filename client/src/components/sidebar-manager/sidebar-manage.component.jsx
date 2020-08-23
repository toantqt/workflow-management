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
                <ul id="sidebar-editable-nav" className="nav flex-column">
                  <li className="nav-item">
                    <Link to="/manage/profile" className="nav-link">
                      <i class="far fa-address-card" aria-hidden="true"></i>
                      Employee Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/manage/room" className="nav-link">
                      <i class="fas fa-layer-group"></i>
                      Room
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/manage/staffworktime" className="nav-link">
                      <i class="fas fa-business-time" aria-hidden="true"></i>
                      StaffWorkTime
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/manage/editsalary" className="nav-link">
                      <i class="fas fa-money-check-alt" aria-hidden="true"></i>
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

import React, { Component } from "react";
import "../sidebar/sidebar.component.css";
import { Link } from "react-router-dom";
class AddComponent extends Component {
  render() {
    return (
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
                Add Room
              </a>
            </li>
          </ul>
        </div>
        <div className="category-content">
          <ul id="fruits-nav" className="nav flex-column">
            <li className="nav-item">
              <a
                href="#manage"
                className="nav-link"
                data-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="manage"
              >
                <i class="fas fa-user-cog" aria-hidden="true"></i>
                Manage
              </a>
              <ul id="manage" className="flex-column collapse">
                <li className="nav-item" style={{ marginTop: "15px" }}>
                  <Link className="nav-link" to={"/manage/overview"}>
                    <i class="far fa-address-card" aria-hidden="true"></i>
                    Employee Profile
                  </Link>
                </li>
                <li className="nav-item" style={{ marginTop: "15px" }}>
                  <Link className="nav-link" to={"/tasks"}>
                    <i class="fas fa-tasks" aria-hidden="true"></i>
                    Task Statistics
                  </Link>
                </li>

                <li className="nav-item" style={{ marginTop: "15px" }}>
                  <Link className="nav-link" to={"/manage/staffworktime"}>
                    <i class="fas fa-business-time" aria-hidden="true"></i>
                    Infor Staff Work Time
                  </Link>
                </li>
                <li className="nav-item" style={{ marginTop: "15px" }}>
                  <Link className="nav-link" to={"/manage/editsalary"}>
                    <i class="fas fa-money-check-alt" aria-hidden="true"></i>
                    Edit Salary
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AddComponent;

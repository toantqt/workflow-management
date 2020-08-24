import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./appBar.component.css";
class AppBarComponent extends Component {
  //handle logout click
  handleLogout = () => {
    localStorage.clear();
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <button type="button" className="btn btn-success btn-float ">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <i className="fas fa-home"></i>
                  </Link>
                </button>
              </li>
              &nbsp;
              <li className="nav-item ">
                <button
                  type="button"
                  className="btn btn-labeled btn-success dropdown-toggle"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="btn-label">
                    <i className="fas fa-tasks"></i>
                  </span>
                  Project
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                  style={{ width: "300px", height: "400px" }}
                >
                  <input
                    className="form-control mr-sm-2 mt-3 ml-5"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{ width: "80%" }}
                  />
                </div>
              </li>
              <li className="nav-item dropdown"></li>
              <li className="nav-item"></li>
            </ul>
            <div
              className="navbar-right collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav " style={{ marginRight: "-15px" }}>
                <li className="nav-item">
                  <button type="button" className="btn btn-success btn-float ">
                    <i className="far fa-bell"></i>
                  </button>
                </li>
                &nbsp;
                <li className="nav-item ">
                  <button
                    type="button"
                    className="btn btn-labeled btn-success dropdown-toggle"
                    id="dropdownMenu3"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="btn-label">{this.props.username}</span>
                  </button>
                  <div className="dropdown-menu dropdown-primary">
                    <Link
                      className="edit-profile dropdown-item"
                      to={`/edit-profile/email=${this.props.username}`}
                    >
                      <i
                        className="fas fa-user-circle "
                        style={{ fontSize: "22px" }}
                      ></i>
                      &nbsp;&nbsp;
                      <span style={{ fontSize: "15px" }}>Profile Setting</span>
                    </Link>
                    <ul className="nav nav-tabs">
                      <li className="nav-item mt-3"></li>
                    </ul>
                    <Link
                      onClick={this.handleLogout}
                      to="/login"
                      className="dropdown-item mt-2"
                    >
                      <i
                        className="fas fa-sign-out-alt"
                        style={{ fontSize: "22px" }}
                      ></i>
                      &nbsp;&nbsp;
                      <span style={{ fontSize: "15px" }}>Logout</span>
                    </Link>
                    <br />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default AppBarComponent;

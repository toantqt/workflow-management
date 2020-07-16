import React, { Component } from "react";
import "../sidebar/sidebar.component.css";
class AddComponent extends Component {
  render() {
    return (
      <div className="sidebar-category sidebar-default">
        <div className="category-title">
          <span style={{ fontSize: "15px" }}>Other</span>
        </div>
        <div className="category-content">
          <ul id="sidebar-editable-nav" className="nav flex-column">
            <li className="nav-item">
              <a href="/admin/customers" className="nav-link">
                <i class="fas fa-plus" aria-hidden="true"></i>
                Add Room
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AddComponent;

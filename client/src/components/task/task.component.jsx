import React, { Component } from "react";

class TaskComponent extends Component {
  render() {
    return (
      <div className="col-9 mt-4 ">
        <i className="fas fa-list-ol fa-2x"></i> &nbsp;
        <span style={{ fontSize: "30px" }}>Task Assignment</span>
        <ul className="nav nav-tabs mt-3 mb-3" role="tablist">
          <li className="nav-item active">
            <a
              className="nav-link "
              data-toggle="tab"
              href="#tabs-1"
              role="tab"
            >
              Assigned
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
              Finish
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active" id="tabs-1" role="tabpanel">
            <table className="table" id="example">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Author</th>
                  <th scope="col">Work Content</th>
                  <th scope="col">Date Post</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>aa</td>
                  <td>aa</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>aa</td>
                  <td>aa</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                  <td>aa</td>
                  <td>aa</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="tab-pane" id="tabs-2" role="tabpanel">
            <p>Finish</p>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskComponent;

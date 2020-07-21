import React, { Component } from "react";

class TaskComponent extends Component {
  render() {
    let listTask = this.props.data.tasks.map((element, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{element.inforAuthor.username}</td>
          <td>{element.e.title}</td>
          <td>{element.e.start}</td>
          <td>{element.e.deadline}</td>
          <td style={{ color: "red" }}>
            <i className="fas fa-exclamation"></i>
          </td>
        </tr>
      );
    });
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
              <tbody>{listTask}</tbody>
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

import React, { Component } from "react";
import "./task.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
//cau hinh size datatable react table
const pagination = paginationFactory({
  sizePerPage: 2,
});
class TaskComponent extends Component {
  render() {
    // cau hinh ten  cot
    let colums = [
      { dataField: "stt", text: "STT" },
      { dataField: "idStaff", text: "Author" },
      { dataField: "title", text: "Work Content" },
      { dataField: "createAt", text: "Date Post" },
      { dataField: "deadline", text: "Deadline" },
      { dataField: "status", text: "Status" },
    ];
    //dua data vao table
    let player = [];
    this.props.data.tasks.map(async (element, index) => {
      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };
      let abc = {
        stt: index,
        idStaff: element.inforAuthor.username,
        title: element.e.title,
        createAt: dates(element.e.start),
        deadline: dates(element.e.deadline),
        status: element.e.status ? (
          <i style={{ color: "blue" }} class="fas fa-check"></i>
        ) : (
          <i style={{ color: "red" }} class="fas fa-exclamation"></i>
        ),
      };
      return player.push(abc);
    });
    // data lish Finish
    let Finish = [];
    this.props.data.tasks.map(async (element, index) => {
      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };
      let abc = {};
      if (element.e.status) {
        abc = {
          stt: index,
          idStaff: element.inforAuthor.username,
          title: element.e.title,
          createAt: dates(element.e.start),
          deadline: dates(element.e.deadline),
          status: <i style={{ color: "blue" }} class="fas fa-check"></i>,
        };
        return Finish.push(abc);
      }
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
            <BootstrapTable
              keyField="idStaff"
              data={player}
              columns={colums}
              pagination={pagination}
            />
          </div>
          <div className="tab-pane" id="tabs-2" role="tabpanel">
            <BootstrapTable
              keyField="idStaff"
              data={Finish}
              columns={colums}
              pagination={pagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskComponent;

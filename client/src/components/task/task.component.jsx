import React, { Component } from "react";

import "./task.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { getList, updateTask } from "./taskFunction";
import BoardTaskComponent from "../board-task/board-task.component";

import jwt_decode from "jwt-decode";

//cau hinh size datatable react table
const pagination = paginationFactory({
  sizePerPage: 6,
});

class TaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      showModal: false,
      idTask: "",
      idStaff: "",
      idUser: "",
      lists: [],
      startDate: new Date(),
    };
  }
  componentDidMount() {
    const token = localStorage.userToken;
    const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(token);
    this.setState({
      idUser: decoded.data._id,
      accessToken: accessToken,
    });
  }

  //on click show modal edit
  handleClickEdit = async (event, data) => {
    event.preventDefault();
    console.log(data);
    if (this.state.idUser === data.idStaff) {
      await this.setState({
        showModal: true,
        idModal: data.idStaff,
        title: data.title,
        deadline: data.deadline,
      });
    }

    console.log(this.state);
  };
  //hande change input edit task
  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;

    if (name === "title") {
      let value = target.value;
      this.setState({
        title: value,
      });
    }
  };

  //change deadline
  handleChangeDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  //handle submit edit
  handleSubmitEdit = async (event) => {
    let date = this.state.startDate;
    let moonLanding = new Date(date);
    let dates = moonLanding.getTime();
    const data = {
      idTask: this.state.idTask,
      title: this.state.title,
      deadline: dates,
    };
    await updateTask(this.state.accessToken, data)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(data);
  };

  render() {
    // bac event list task
    const rowEvents = {
      onClick: async (e, row, rowIndex) => {
        // console.log(e);
        // console.log(rowIndex);
        //console.log(row);
        // console.log(row.status.key); // cau hinh key trong status laf id task
        await this.setState({
          idTask: row.status.key,
          showComponent: true,
          lists: [],
        });
        //console.log(this.state);
        getList(this.props.accessToken, this.state.idTask).then(async (res) => {
          const arrList = res.list;
          // await this.setState({
          //   idStaff: residStaff,
          // });

          //if list in task === 0 then idStaff = res.idStaff
          if (arrList.length === 0) {
            this.setState({
              idStaff: res.idStaff,
            });
          } else {
            await arrList.forEach(async (e) => {
              await this.setState({
                lists: [
                  ...this.state.lists,
                  {
                    name: e.name,
                    idStaff: e.idStaff,
                    note: e.note,
                    status: e.status,
                    _id: e._id,
                  },
                ],
                idStaff: e.idStaff,
              });
            });
          }
          // await this.setState({
          //   showComponent: true,
          //   lists: [...this.state.lists, {}]
          // });
        });
      },
    };

    // cau hinh ten  cot
    let colums = [
      { dataField: "stt", text: "STT" },
      { dataField: "idStaff", text: "Author" },
      { dataField: "title", text: "Work Content" },
      { dataField: "createAt", text: "Date Post" },
      { dataField: "deadline", text: "Deadline" },
      { dataField: "status", text: "Status" },
      { dataField: "edit", text: "#" },
    ];
    //dua data vao table
    let player = [];
    this.props.data.tasks.map(async (element, index) => {
      // let listTask = this.props.data.tasks.map((element, index) => {

      index = index + 1;

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
          <i
            style={{ color: "blue" }}
            className="fas fa-check"
            key={element.e._id}
          ></i>
        ) : (
          <i
            style={{ color: "red" }}
            className="fas fa-exclamation"
            key={element.e._id}
          ></i>
        ),
        edit: (
          <i
            class="far fa-edit"
            data-toggle="modal"
            data-target={"#" + element.e.idStaff}
            onClick={(event) => this.handleClickEdit(event, element.e)}
          ></i>
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
          status: (
            <i
              style={{ color: "blue" }}
              className="fas fa-check"
              key={element.e._id}
            ></i>
          ),
        };
        return Finish.push(abc);
      }

      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{element.inforAuthor.username}</td>
          <td id={element.e._id} onClick={this.handleClick}>
            {element.e.title}
          </td>
          <td>{dates(element.e.start)}</td>
          <td>{dates(element.e.deadline)}</td>
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
        <ul className="nav nav-tabs mt-3 " role="tablist">
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
              keyField="stt"
              data={player}
              columns={colums}
              pagination={pagination}
              rowEvents={rowEvents} // goi event
            />
          </div>
          {this.state.showModal ? (
            <div
              class="modal fade"
              id={this.state.idModal}
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div
                  class="modal-content"
                  style={{ height: "300px !important" }}
                >
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Edit Task
                    </h5>

                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        class="form-control"
                        defaultValue={this.state.title}
                        onChange={this.onHandleChange}
                        name="title"
                      />
                    </div>
                    <div class="form-group">
                      <label>Deadline</label>
                      <br />
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChangeDate}
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={this.handleSubmitEdit}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="tab-pane" id="tabs-2" role="tabpanel">
            <BootstrapTable
              keyField="stt"
              data={Finish}
              columns={colums}
              pagination={pagination}
              rowEvents={rowEvents}
            />
          </div>
        </div>
        {this.state.showComponent ? (
          <BoardTaskComponent data={this.state} />
        ) : null}
      </div>
    );
  }
}

export default TaskComponent;

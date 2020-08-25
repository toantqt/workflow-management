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
      idModal: "",
      showModal: false,
      idTask: "",
      idStaff: "",
      idUser: "",
      lists: [],
      startDate: new Date(),
      showEdit: "",
      // deadline: new Date(),
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
    //event.preventDefault();
    console.log(data);
    // this.setState({
    //   title: "",
    //   showModal: false,
    //   showEdit: "",
    //   // idModal: "",
    // });
    console.log(data.idStaff);
    console.log(this.state.idUser);
    let defaultDate = new Date(data.deadline);

    if (this.state.idUser === data.idStaff) {
      await this.setState({
        showModal: true,
        // idModal: data._id,
        title: data.title,
        deadline: data.deadline,
        idTask: data._id,
        //showEdit: "#showEdit",
        showEdit: "showEdit",
        defaultDate: defaultDate,
      });
    } else {
      await this.setState({
        showModal: false,
        idModal: "",
        title: "",
        showEdit: "",
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
      defaultDate: date,
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
    console.log(data);
    await updateTask(this.state.accessToken, data)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        //console.log(error);
      });

    //console.log(data);
  };
  showTask = async (event) => {
    event.preventDefault();
    //console.log(event.target);
    await this.setState({
      idTask: event.target.id,
      showComponent: true,
      lists: [],
    });
    getList(this.props.accessToken, this.state.idTask).then(async (res) => {
      const arrList = res.list;
      //console.log(arrList);
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
  };
  render() {
    // cau hinh ten  cot
    let columns = [
      {
        dataField: "stt",
        text: "STT",
        headerStyle: { width: "60px" },
      },

      {
        dataField: "idStaff",
        text: "Author",
        headerStyle: { width: "120px" },
      },
      { dataField: "title", text: "Work Content" },
      { dataField: "createAt", text: "Date Post" },
      { dataField: "deadline", text: "Deadline" },
      {
        dataField: "status",
        text: "Status",
        headerStyle: { width: "60px" },
        style: { textAlign: "center" },
      },
      {
        dataField: "edit",
        text: "#",
        headerStyle: { width: "60px", textAlign: "center" },
        style: { textAlign: "center" },
      },
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
        title: (
          <span
            className="task-title"
            id={element.e._id}
            onClick={this.showTask}
          >
            {element.e.title}
          </span>
        ),
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
        edit:
          this.state.idUser === element.e.idStaff ? (
            <i
              class="far fa-edit"
              data-toggle="modal"
              // data-target={"#" + element.e._id}
              data-target="#showEdit"
              onClick={(event) => this.handleClickEdit(event, element.e)}
            ></i>
          ) : (
            <i></i>
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
          // title: element.e.title,
          title: (
            <span id={element.e._id} onClick={this.showTask}>
              {element.e.title}
            </span>
          ),
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
    });
    let showModelEdit = (
      // this.state.showModal ? (
      <div
        class="modal fade"
        //id={this.state.idModal}
        id="showEdit"
        //id={this.state.showEdit}
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content" style={{ height: "300px !important" }}>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Task
              </h5>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Title</label>
                <input
                  type="text"
                  class="form-control"
                  value={this.state.title}
                  onChange={this.onHandleChange}
                  name="title"
                />
              </div>
              <div class="form-group">
                <label>Deadline</label>
                <br />
                <DatePicker
                  selected={this.state.defaultDate}
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
    );
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
              columns={columns}
              pagination={pagination}
              //  rowEvents={rowEvents} // goi event
            />
          </div>
          {showModelEdit}
          <div className="tab-pane" id="tabs-2" role="tabpanel">
            <BootstrapTable
              keyField="stt"
              data={Finish}
              columns={columns}
              pagination={pagination}
              //  rowEvents={rowEvents}
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

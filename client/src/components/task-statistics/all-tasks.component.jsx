import React, { Component } from "react";
import { taskStatistic } from "./taskStatisticsFunction";
import ViewByRoomComponent from "./view-by-room.component";
import BarChartComponent from "./chart/bar-chart.component";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ViewByUserComponent from "./view-by-user.component";
import "./statisctics.css";

const pagination = paginationFactory({
  sizePerPage: 6,
});
class AllTasksComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "all",
      dataTask: [],
      dataRoom: [],
      dataUser: [],
      taskInRoom: [],
      accessToken: "",
    };
  }
  componentDidMount() {
    const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = tokenJSON.accessToken;
    this.setState({
      accessToken: accessToken,
    });
    //console.log(accessToken);
    taskStatistic(accessToken)
      .then((res) => {
        //console.log(res);
        res.dataRoom.forEach(async (e) => {
          await this.setState({
            dataRoom: [...this.state.dataRoom, e],
          });
        });

        res.dataUser.forEach(async (e) => {
          await this.setState({
            dataUser: [...this.state.dataUser, e],
          });
        });

        res.dataTask.forEach(async (e) => {
          await this.setState({
            dataTask: [...this.state.dataTask, e],
          });
        });
        res.dataRoom.forEach(async (eRoom) => {
          res.dataTask.forEach(async (eTask) => {
            if (eRoom._id === eTask.roomId) {
              await this.setState({
                taskInRoom: [
                  ...this.state.taskInRoom,
                  { nameRoom: eRoom.nameRoom, dataTask: eTask },
                ],
              });
              //console.log("hello");
            }
          });
        });
        //console.log(this.state);
      })
      .catch((error) => {
        //console.log(error);
      });
  }
  handleChange = async (event) => {
    const value = event.target.value;
    await this.setState({
      select: value,
    });
  };
  render() {
    if (this.state.select === "all") {
      let columns = [
        {
          dataField: "stt",
          text: "STT",
          headerStyle: { width: "60px" },
        },
        {
          dataField: "room",
          text: "Room",
          headerStyle: { width: "120px" },
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
      ];

      let data = [];

      this.state.dataTask.map((eTask, index) => {
        index = index + 1;
        let dates = (string) => {
          var options = { year: "numeric", month: "long", day: "numeric" };
          return new Date(string).toLocaleDateString([], options);
        };
        let nameRoom;
        let nameUser;
        this.state.dataRoom.forEach((eRoom) => {
          if (eTask.roomId === eRoom._id) {
            nameRoom = eRoom.nameRoom;
          }
        });
        this.state.dataUser.forEach((eUser) => {
          if (eTask.idStaff === eUser._id) {
            nameUser = eUser.username;
          }
        });
        let oBj = {
          stt: index,
          room: nameRoom,
          idStaff: nameUser,
          title: eTask.title,
          createAt: dates(eTask.start),
          deadline: dates(eTask.deadline),
          status: eTask.status ? (
            <i
              style={{ color: "blue" }}
              className="fas fa-check"
              key={eTask._id}
            ></i>
          ) : (
            <i
              style={{ color: "red" }}
              className="fas fa-exclamation"
              key={eTask._id}
            ></i>
          ),
        };
        return data.push(oBj);
      });
      // data lish Finish
      let Finish = [];
      this.state.dataTask.map((eTask, index) => {
        index = index + 1;
        let dates = (string) => {
          var options = { year: "numeric", month: "long", day: "numeric" };
          return new Date(string).toLocaleDateString([], options);
        };
        let nameRoom;
        let nameUser;
        this.state.dataRoom.forEach((eRoom) => {
          if (eTask.roomId === eRoom._id) {
            nameRoom = eRoom.nameRoom;
          }
        });
        this.state.dataUser.forEach((eUser) => {
          if (eTask.idStaff === eUser._id) {
            nameUser = eUser.username;
          }
        });
        if (eTask.status) {
          let oBj = {
            stt: index,
            room: nameRoom,
            idStaff: nameUser,
            title: eTask.title,
            createAt: dates(eTask.start),
            deadline: dates(eTask.deadline),
            status: (
              <i
                style={{ color: "blue" }}
                className="fas fa-check"
                key={eTask._id}
              ></i>
            ),
          };
          Finish.push(oBj);
        }
      });

      //task late
      let late = [];
      const dateNow = new Date().getTime();
      //console.log(dateNow);
      this.state.dataTask.map((eTask, index) => {
        index = index + 1;

        let dates = (string) => {
          var options = { year: "numeric", month: "long", day: "numeric" };
          return new Date(string).toLocaleDateString([], options);
        };
        let nameRoom;
        let nameUser;
        this.state.dataRoom.forEach((eRoom) => {
          if (eTask.roomId === eRoom._id) {
            nameRoom = eRoom.nameRoom;
          }
        });
        this.state.dataUser.forEach((eUser) => {
          if (eTask.idStaff === eUser._id) {
            nameUser = eUser.username;
          }
        });

        let time = new Date(eTask.deadline);
        let deadline = time.getTime();
        if (deadline < dateNow && eTask.status === false) {
          let oBj = {
            stt: index,
            room: nameRoom,
            idStaff: nameUser,
            title: eTask.title,
            createAt: dates(eTask.start),
            deadline: dates(eTask.deadline),
            status: (
              <i
                style={{ color: "red" }}
                className="fas fa-check"
                key={eTask._id}
              ></i>
            ),
          };
          late.push(oBj);
        }
      });
      return (
        <div style={{ width: "90%", margin: "0 auto" }}>
          <div id="search" className="col-2 float-right">
            <select
              class="custom-select"
              id="gender2"
              style={{ height: "32px", fontSize: "16px" }}
              onChange={this.handleChange}
              value={this.state.select}
            >
              <option value="all" selected>
                All Tasks
              </option>
              <option value="room">View by room</option>
              <option value="member">View by member</option>
            </select>
          </div>
          <div style={{ paddingTop: "40px" }}>
            <ul
              class="nav nav-tabs justify-content-center"
              id="myTab"
              role="tablist"
            >
              <li class="nav-item active">
                <a
                  className="nav-link "
                  data-toggle="tab"
                  href="#tabs-1"
                  role="tab"
                >
                  List Tasks
                </a>
              </li>
              <li class="nav-item ">
                <a
                  className="nav-link "
                  data-toggle="tab"
                  href="#tabs-2"
                  role="tab"
                >
                  Tasks Done
                </a>
              </li>
              <li class="nav-item ">
                <a
                  className="nav-link "
                  data-toggle="tab"
                  href="#tabs-3"
                  role="tab"
                >
                  Tasks Late
                </a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane  active"
                id="tabs-1"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <BootstrapTable
                  keyField="stt"
                  data={data}
                  columns={columns}
                  pagination={pagination}
                  //  rowEvents={rowEvents} // goi event
                />
              </div>
              <div
                class="tab-pane fade"
                id="tabs-2"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <BootstrapTable
                  keyField="stt"
                  data={Finish}
                  columns={columns}
                  pagination={pagination}
                  //  rowEvents={rowEvents}
                />
              </div>
              <div
                class="tab-pane fade"
                id="tabs-3"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <BootstrapTable
                  keyField="stt"
                  data={late}
                  columns={columns}
                  pagination={pagination}
                  //  rowEvents={rowEvents}
                />
              </div>
            </div>
          </div>
          <BarChartComponent data={this.state} />
        </div>
      );
    } else if (this.state.select === "room") {
      return (
        <div style={{ width: "90%", margin: "0 auto" }}>
          <div id="search" className="col-2 float-right ">
            <select
              class="custom-select  "
              id="gender2"
              style={{ height: "32px", fontSize: "16px" }}
              onChange={this.handleChange}
              value={this.state.select}
            >
              <option value="all" selected>
                All Tasks
              </option>
              <option value="room">View by room</option>
              <option value="member">View by member</option>
            </select>
          </div>

          <ViewByRoomComponent data={this.state} />
        </div>
      );
    } else {
      return (
        <div style={{ width: "90%", margin: "0 auto" }}>
          <div id="search" className="col-2 float-right">
            <select
              class="custom-select"
              id="gender2"
              style={{ height: "32px", fontSize: "16px" }}
              onChange={this.handleChange}
              value={this.state.select}
            >
              <option value="all" selected>
                All Tasks
              </option>
              <option value="room">View by room</option>
              <option value="member">View by member</option>
            </select>
          </div>

          <ViewByUserComponent data={this.state} />
        </div>
      );
    }
  }
}

export default AllTasksComponent;

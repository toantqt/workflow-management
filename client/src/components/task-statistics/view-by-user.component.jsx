import React, { Component } from "react";
import DatePicker from "react-datepicker";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import BarChartComponent from "./chart/bar-chart.component";
import { viewByMonth } from "./taskStatisticsFunction";
const pagination = paginationFactory({
  sizePerPage: 6,
});

class ViewByUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "",
      time: "",
      dataTask: [],
      idUser: "",
    };
  }
  handleChangeUser = async (event) => {
    const value = event.target.value;
    await this.setState({
      select: value,
    });
    this.props.data.dataUser.forEach((e) => {
      if (e.username === value) {
        this.setState({
          idUser: e._id,
        });
      }
    });
  };
  handleChangeDate = async (time) => {
    //console.log(time);
    const month = time.getMonth() + 1;
    await this.setState({
      month: month,
      time: time,
    });
  };
  render() {
    //console.log(this.props.data);
    const user = this.props.data.dataUser.map((e, index) => {
      return <option value={e.id}>{e.username}</option>;
    });
    const dataTask = [];
    if (this.state.time === "") {
      this.props.data.dataUser.forEach((eUser) => {
        if (eUser.username === this.state.select) {
          this.props.data.dataTask.forEach((eTask) => {
            if (eTask.idStaff === eUser._id) {
              return dataTask.push(eTask);
            }
          });
        }
      });
    } else {
      this.props.data.dataUser.forEach((eUser) => {
        if (eUser.username === this.state.select) {
          this.props.data.dataTask.forEach((eTask) => {
            let time = new Date(eTask.createAt);
            let month = time.getMonth() + 1;
            //console.log(month);
            if (eTask.idStaff === eUser._id && month === this.state.month) {
              return dataTask.push(eTask);
            }
          });
        }
      });
    }

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
      {
        dataField: "room",
        text: "Room",
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
    dataTask.map((eTask, index) => {
      index = index + 1;
      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };

      let nameUser;
      let nameRoom;
      this.props.data.dataUser.forEach((eUser) => {
        if (eTask.idStaff === eUser._id) {
          nameUser = eUser.username;
        }
      });
      this.props.data.dataRoom.forEach((eRoom) => {
        if (eTask.roomId === eRoom._id) {
          nameRoom = eRoom.nameRoom;
        }
      });
      let oBj = {
        stt: index,
        idStaff: nameUser,
        room: nameRoom,
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

    let Finish = [];
    dataTask.map((eTask, index) => {
      index = index + 1;
      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };

      let nameUser;
      let nameRoom;
      this.props.data.dataUser.forEach((eUser) => {
        if (eTask.idStaff === eUser._id) {
          nameUser = eUser.username;
        }
      });
      this.props.data.dataRoom.forEach((eRoom) => {
        if (eTask.roomId === eRoom._id) {
          nameRoom = eRoom.nameRoom;
        }
      });
      if (eTask.status === true) {
        let oBj = {
          stt: index,
          idStaff: nameUser,
          room: nameRoom,
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

    let late = [];
    const dateNow = new Date().getTime();
    //console.log(dateNow);
    dataTask.map((eTask, index) => {
      index = index + 1;

      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };

      let nameUser;
      let nameRoom;

      this.props.data.dataUser.forEach((eUser) => {
        if (eTask.idStaff === eUser._id) {
          nameUser = eUser.username;
        }
      });
      this.props.data.dataRoom.forEach((eRoom) => {
        if (eTask.roomId === eRoom._id) {
          nameRoom = eRoom.nameRoom;
        }
      });
      let time = new Date(eTask.deadline);
      let deadline = time.getTime();
      if (deadline < dateNow && eTask.status === false) {
        let oBj = {
          stt: index,
          idStaff: nameUser,
          room: nameRoom,
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
    //console.log(late);
    if (this.state.select === "") {
      return (
        <div>
          <div className="col-2 float-right">
            <input
              list="browsers"
              name="browser"
              id="browser"
              style={{ height: "30px", marginTop: "1.5px" }}
              onChange={this.handleChangeUser}
              placeholder="Search or select user"
              className="form-control"
            />
            <datalist id="browsers">{user}</datalist>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="col-2 float-right" style={{ marginRight: "-20px" }}>
          <input
            list="browsers"
            name="browser"
            id="browser"
            className="form-control"
            style={{ height: "30px", marginTop: "1px" }}
            onChange={this.handleChangeUser}
            placeholder="Search or select user"
          />
          <datalist id="browsers">{user}</datalist>
        </div>
        <div className="col-2 float-right" style={{ marginRight: "-20px" }}>
          <DatePicker
            selected={this.state.time}
            onChange={this.handleChangeDate}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
        <div style={{ paddingTop: "50px" }}>
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
                Tasks Doing
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
              class="tab-pane"
              id="tabs-2"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <BootstrapTable
                keyField="stt"
                data={Finish}
                columns={columns}
                pagination={pagination}
                //  rowEvents={rowEvents} // goi event
              />
            </div>
            <div
              class="tab-pane"
              id="tabs-3"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <BootstrapTable
                keyField="stt"
                data={late}
                columns={columns}
                pagination={pagination}
                //  rowEvents={rowEvents} // goi event
              />
            </div>
          </div>
        </div>
        <BarChartComponent data={{ dataTask: dataTask }} />
      </div>
    );
  }
}

export default ViewByUserComponent;

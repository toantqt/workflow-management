import React, { Component } from "react";
import { getDataRoom } from "../room/roomFunction";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import BarChartComponent from "./chart/bar-chart.component";

const pagination = paginationFactory({
  sizePerPage: 6,
});
class ViewByRoomComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTask: [],
      inforMember: [],
      select: "",
    };
  }

  handleChange = async (event) => {
    const value = event.target.value;
    await this.setState({
      select: value,
    });
    this.setState({
      dataTask: [],
      inforMember: [],
    });
    await getDataRoom(this.props.data.accessToken, this.state.select)
      .then((res) => {
        //console.log(res);
        res.inforTask.forEach((e) => {
          this.setState({
            dataTask: [...this.state.dataTask, e],
          });
        });
        res.inforMember.forEach((e) => {
          this.setState({
            inforMember: [...this.state.inforMember, e],
          });
        });
        //console.log(this.state);
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  render() {
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
    ];
    let data = [];
    this.state.dataTask.map((eTask, index) => {
      index = index + 1;
      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };

      let nameUser;

      this.state.inforMember.forEach((eUser) => {
        if (eTask.idStaff === eUser._id) {
          nameUser = eUser.username;
        }
      });
      let oBj = {
        stt: index,
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

    //finish Task
    let Finish = [];
    this.state.dataTask.map((eTask, index) => {
      index = index + 1;
      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };
      let nameUser;

      this.state.inforMember.forEach((eUser) => {
        if (eTask.idStaff === eUser._id) {
          nameUser = eUser.username;
        }
      });
      if (eTask.status) {
        let oBj = {
          stt: index,
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

      let nameUser;

      this.state.inforMember.forEach((eUser) => {
        if (eTask.idStaff === eUser._id) {
          nameUser = eUser.username;
        }
      });
      let time = new Date(eTask.deadline);
      let deadline = time.getTime();
      if (deadline < dateNow && eTask.status === false) {
        let oBj = {
          stt: index,

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
    const option = this.props.data.dataRoom.map((e, index) => {
      return <option value={e._id}>{e.nameRoom}</option>;
    });
    if (this.state.select === "") {
      return (
        <div>
          <div className="col-2 float-right">
            <select
              class="custom-select"
              id="gender2"
              style={{ height: "32px", fontSize: "16px" }}
              onChange={this.handleChange}
            >
              <option value="" disabled selected>
                Select Room
              </option>
              {option}
            </select>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="col-2 float-right">
          <select
            class="custom-select"
            id="gender2"
            style={{ height: "32px", fontSize: "16px" }}
            onChange={this.handleChange}
          >
            <option value="" disabled selected>
              Select Room
            </option>
            {option}
          </select>
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
        <BarChartComponent data={this.state} />
      </div>
    );
  }
}

export default ViewByRoomComponent;

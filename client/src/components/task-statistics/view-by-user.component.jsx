import React, { Component } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const pagination = paginationFactory({
  sizePerPage: 6,
});

class ViewByUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "",
    };
  }
  handleChangeUser = async (event) => {
    const value = event.target.value;

    await this.setState({
      select: value,
    });
  };
  render() {
    const user = this.props.data.dataUser.map((e, index) => {
      return <option value={e.id}>{e.username}</option>;
    });
    const arrTaskUser = [];
    this.props.data.dataUser.forEach((eUser) => {
      if (eUser.username === this.state.select) {
        this.props.data.dataTask.forEach((eTask) => {
          if (eTask.idStaff === eUser._id) {
            return arrTaskUser.push(eTask);
          }
        });
      }
    });
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
    arrTaskUser.map((eTask, index) => {
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
    arrTaskUser.map((eTask, index) => {
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
    arrTaskUser.map((eTask, index) => {
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
          />
          <datalist id="browsers">{user}</datalist>
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
              class="tab-pane  active"
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
              class="tab-pane  active"
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
      </div>
    );
  }
}

export default ViewByUserComponent;

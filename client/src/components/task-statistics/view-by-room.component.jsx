import React, { Component } from "react";
import { getDataRoom } from "../room/roomFunction";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const pagination = paginationFactory({
  sizePerPage: 6,
});
class ViewByRoomComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inforTask: [],
      inforMember: [],
    };
  }

  handleChange = async (event) => {
    const value = event.target.value;
    await this.setState({
      select: value,
    });
    this.setState({
      inforTask: [],
      inforMember: [],
    });
    await getDataRoom(this.props.data.accessToken, this.state.select)
      .then((res) => {
        console.log(res);
        res.inforTask.forEach((e) => {
          this.setState({
            inforTask: [...this.state.inforTask, e],
          });
        });
        res.inforMember.forEach((e) => {
          this.setState({
            inforMember: [...this.state.inforMember, e],
          });
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
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
    this.state.inforTask.map((eTask, index) => {
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
    const option = this.props.data.dataRoom.map((e, index) => {
      return <option value={e._id}>{e.nameRoom}</option>;
    });
    return (
      <div>
        <div className="col-3 float-right">
          <select
            class="custom-select"
            id="gender2"
            style={{ height: "32px", fontSize: "16px" }}
            onChange={this.handleChange}
          >
            <option>...</option>
            {option}
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
          </div>
        </div>
      </div>
    );
  }
}

export default ViewByRoomComponent;

import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { findAdminRoom } from "../add-room/roomFunction";
import "./timekeeping.css";
import {
  getTimeKeeping,
  createTimeChecking,
  updateTimeNotWork,
  Timekeeping,
} from "./timekeepingFunction";
import BootstrapTable from "react-bootstrap-table-next";
class StaffworktimeComponent extends Component {
  constructor(props) {
    super(props);
    const tokenJSON = JSON.parse(localStorage.userToken);
    this.state = {
      startDate: new Date(),
      accessToken: tokenJSON.accessToken,
      users: [], // danh sach nguoi co the chon
      showResults: false, // show user
      display: "none", // trang thai dong mo manager
      nameManager: "", // ten admin
      ownerId: "", // id nguoi can tim
      getTimeChecked: [],
      getCreateDay: [],
      getWeekTime: [],
      displays: "none",
      countTimeTowork: 0,
      countTimeNotwork: 0,
      countTimeOT: 0,
      OT: 0,
      typeWage: 0,
      weekOfMonth: "",
      monthOfYear: "",
      dataCheckTime: [],
      toDay: "",
      showCheckOT: "",
    };
  }
  //change deadline
  handleChangeDate = (date) => {
    this.setState({
      startDate: date,
    });
  };
  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      let find = e.target.value;
      if (find === "") return;
      //const tokenJSON = JSON.parse(localStorage.userToken);
      const accessToken = this.state.accessToken;
      //console.log("do validate " + find);
      //finduser
      this.state.showResults = true;
      this.state.display = "block";
      findAdminRoom(accessToken, find).then((res) => {
        //console.log(res.getUsers);
        this.setState({
          users: [],
        });
        const user = res.getUsers;
        user.forEach((e) => {
          //console.log(e);
          this.setState({
            users: [...this.state.users, { id: e._id, username: e.username }],
          });
        });

        //console.log(this.state);
      });
    }
  };
  handleBlur = (e) => {
    //console.log(e.target);
    this.setState({
      display: "none",
    });
  };
  onHandleChange = (event) => {
    //  //console.log(event.target.name);
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if (target.name === "ownerId") {
      value = target.id;
      this.setState({
        [name]: value,
        showResults: !this.state.showResults,
        display: "none",
        nameManager: target.value,
        showCheckOT: "#showCheckOT",
      });
    } else {
      this.setState({
        [name]: value,
        showResults: !this.state.showResults,
        display: "none",
      });
    }
    //console.log(this.state);
  };
  //xoa admin nhom khi chon nham'
  removeManager = () => {
    this.setState({
      ownerId: "",
      showResults: false,
      display: "none",
      nameManager: "",
      showCheckOT: "",
    });
  };
  HandleViewWorkTime = (event) => {
    event.preventDefault();
    //console.log(this.state);
    let TimeDay =
      this.state.startDate.getMonth() +
      1 +
      "/" +
      this.state.startDate.getFullYear();

    getTimeKeeping(this.state.accessToken, TimeDay, this.state.ownerId).then(
      (res) => {
        //console.log(res);
        if (res.getTime.length === 0) {
          return alert("ko co thong tin can tim");
        }
        this.setState({
          displays: "none",
          OT: res.getWageUser.wageOt,
          typeWage: res.getWageUser.typeWage,
          getTimeChecked: [],
          getCreateDay: [],
          getWeekTime: [],
          countTimeTowork: 0,
          countTimeNotwork: 0,
          countTimeOT: 0,
        });
        res.getTime.forEach(async (e) => {
          await this.setState({
            getTimeChecked: [...this.state.getTimeChecked, e.checkedOneWeek],
            getCreateDay: [...this.state.getCreateDay, e.createAt],
            getWeekTime: [...this.state.getWeekTime, e.weekInMonth],
            countTimeTowork: this.state.countTimeTowork + e.countTime,
            countTimeNotwork: this.state.countTimeNotwork + e.countTimeNotWork,
            countTimeOT: this.state.countTimeOT + e.countTimeOT,
          });
        });
        this.setState({
          displays: "block",
        });
      }
    );
    //  //console.log(this.state);
  };
  CheckOT = (event) => {
    event.preventDefault();
    //console.log(this.state);
    if (!this.state.ownerId) {
      return alert("chua chon nguoi can tim");
    }
    let TimeDay =
      this.state.startDate.getMonth() +
      1 +
      "/" +
      this.state.startDate.getFullYear();
    createTimeChecking(
      this.state.accessToken,
      this.state.ownerId,
      TimeDay
    ).then((res) => {
      //console.log(res);
      //console.log("done");
      this.setState({
        weekOfMonth: res.weekInMonth,
        monthOfYear: res.monthYear,
        toDay: new Date().getDay() + 1,
        dataCheckTime: [],
      });
      res.checkedOneWeek.forEach(async (e) => {
        await this.setState({
          dataCheckTime: [...this.state.dataCheckTime, e],
        });
      });
    });
    if (this.state.today != 2) {
      updateTimeNotWork(
        this.state.accessToken,
        this.state.ownerId,
        this.state.monthOfYear,
        // getweek,
        this.state.toDay
      ).then((res) => {
        //console.log(res);
        //console.log("check ngay nghi");
      });
    }
  };
  // checkOTByadmin = (event) => {
  //   event.preventDefault();
  // };
  CheckTime = (event) => {
    //event.preventDefault();
    //console.log(this.state);
    //console.log(event.target);
    let data = {
      toDay: this.state.toDay,
      userId: this.state.ownerId,
      checkSession: event.target.name,
      timeChecked: Date.now(),
      monthYear: this.state.monthOfYear,
      weekInMonth: this.state.weekOfMonth,
    };

    Timekeeping(this.state.accessToken, data).then((res) => {
      alert("diem danh thanh cong");

      //console.log("done");
    });
    //console.log(data);
  };
  render() {
    let showuser = this.state.users.map((e, index) => {
      return this.state.showResults ? (
        <li key={index}>
          {e.username}
          <button
            type="button"
            className="btn btn-primary add-user"
            name="ownerId"
            id={e.id}
            value={e.username}
            onClick={this.onHandleChange}
          >
            +
          </button>
        </li>
      ) : null;
    });
    let showManager = (ownerId, nameManager) => {
      //  //console.log(ownerId);
      return ownerId ? (
        <div>
          <button
            style={{ height: "25px", paddingTop: "1px", marginTop: "-1px" }}
            type="button"
            className="btn btn-primary "
            value={ownerId}
            onClick={this.removeManager}
          >
            {nameManager} &nbsp;X
          </button>
        </div>
      ) : (
        <input
          style={{ width: "200px", height: "25px", margin: "auto" }}
          type="text"
          className="form-control"
          // name="ownerId"
          placeholder="Input field"
          // onChange={this.onHandleChange}
          onKeyDown={this._handleKeyDown}
        />
      );
    };
    // show table time checked
    let showTimeChecked = this.state.getTimeChecked.map((element, i) => {
      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };
      let abc = element.map((e, index) => {
        let show = (type, inmonth) => {
          if (inmonth) {
            return type ? (
              <i class="fa fa-check"></i>
            ) : (
              <i class="fa fa-times"></i>
            );
          } else {
            return <i></i>;
          }
        };
        return (
          <tr>
            <td>{index + 2}</td>
            <td>{show(e.morning, e.isDayInMonth)}</td>
            <td>{show(e.afternoon, e.isDayInMonth)}</td>
          </tr>
        );
      });
      return (
        <div>
          <h1>
            Week {this.state.getWeekTime[i]}, Day Create:{" "}
            {dates(this.state.getCreateDay[i])}
          </h1>
          <table class="table" style={{ width: "80%", margin: " auto" }}>
            <thead class="thead-dark">
              {/* <tr>
              <th>Day Begin: {dates(this.state.getCreateDay[i])}</th>
            </tr> */}
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>
                  Day
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Morning
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Afternoon
                </th>
              </tr>
            </thead>
            <tbody>{abc}</tbody>
          </table>
        </div>
      );
    });
    const columns = [
      {
        dataField: "Day",
        text: "DayinWeek",
        headerStyle: { textAlign: "center" },
        style: { textAlign: "center" },
      },
      {
        dataField: "morning",
        text: "Morning",
        headerStyle: { textAlign: "center" },
        style: { textAlign: "center" },
      },
      {
        dataField: "afternoon",
        text: "Afternoon",
        headerStyle: { textAlign: "center" },
        style: { textAlign: "center" },
      },
    ];
    let arrays = [];

    this.state.dataCheckTime.map(async (element, index) => {
      let mornings = (m, i, d, inMonth) => {
        if (!inMonth) return <i></i>;
        if (i === this.state.toDay) {
          if (m) {
            return <i class="fa fa-check"></i>;
          } else {
            return (
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
                name={d}
                //style={{ display: this.state.toDay === e ? "block" : "none" }}
                id={i}
                onClick={this.CheckTime}
              />
            );
          }
        } else {
          if (m) {
            return <i class="fa fa-check"></i>;
          } else {
            return <i class="fa fa-times"></i>;
          }
        }
      };

      let abc = {
        Day: index + 2,
        morning: mornings(
          element.morning,
          index + 2,
          "sang",
          element.isDayInMonth
        ),
        afternoon: mornings(
          element.afternoon,
          index + 2,
          "chieu",
          element.isDayInMonth
        ),
      };
      return arrays.push(abc);
    });

    return (
      <div onClick={this.handleBlur}>
        <div className="col-9" style={{ float: "right", marginTop: "-338px" }}>
          <legend>
            <h1>View work time</h1>
          </legend>
          <div>
            <div
              className="row col-12 form-group"
              style={{
                padding: "10px",
                textAlign: "center",
              }}
            >
              <div className="col-3">
                <label>nhập tên cần tìm</label>
                {showManager(this.state.ownerId, this.state.nameManager)}
                <span
                  className="search-user-list-results"
                  style={{ display: this.state.display }}
                >
                  <h3>staff :</h3>
                  <div className="search-user-list-content">
                    <ul>{showuser}</ul>
                  </div>
                </span>
              </div>
              <div className="col-3">
                <label>chọn tháng trong năm cần xem</label>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChangeDate}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                />
              </div>
              <div className="col-1">
                <label>check OT</label> <br></br>
                <i
                  class="fa fa-plus-circle"
                  data-toggle="modal"
                  data-target={this.state.showCheckOT}
                  onClick={this.CheckOT}
                ></i>
              </div>
              <div className="col-1">
                <button
                  style={{
                    height: "25px",
                    paddingTop: "1px",
                    marginTop: "25px",
                  }}
                  type="submit"
                  class="btn btn-primary"
                  onClick={this.HandleViewWorkTime}
                >
                  Submit
                </button>
              </div>
              <div className="col-4"></div>
            </div>
          </div>
          <hr />
          <div style={{ width: "800px" }}>
            <div
              className=" row col-12"
              style={{
                display: this.state.displays,
                textAlign: "center",
              }}
            >
              <h1>Thông tin cần tìm </h1>
              <br></br>
              <div className="col-sm-4">
                <div className="card" style={{ width: "20rem" }}>
                  <img
                    className="card-img-top "
                    src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Card image cap"
                    style={{ height: "80px" }}
                  />
                  <div style={{ fontSize: "20px" }}>
                    số buổi làm trong tháng này
                  </div>
                  <div className="card-body" style={{ textAlign: "center" }}>
                    {this.state.countTimeTowork}
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card" style={{ width: "20rem" }}>
                  <img
                    className="card-img-top "
                    src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Card image cap"
                    style={{ height: "80px" }}
                  />
                  <div style={{ fontSize: "20px" }}>
                    số buổi nghỉ trong tháng này
                  </div>
                  <div className="card-body" style={{ textAlign: "center" }}>
                    {this.state.countTimeNotwork}
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div
                  className="card"
                  style={{ width: "20rem", height: "18.3rem" }}
                >
                  <img
                    className="card-img-top "
                    src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Card image cap"
                    style={{ height: "80px" }}
                  />
                  <br></br>
                  <div style={{ fontSize: "20px" }}>số buổi OT</div>
                  <div className="card-body" style={{ textAlign: "center" }}>
                    {this.state.countTimeOT}
                  </div>
                </div>
              </div>
            </div>

            <div
              className=" row col-12"
              style={{ display: this.state.displays, textAlign: "center" }}
            >
              <div className="col-sm-4">
                <div className="card" style={{ width: "20rem" }}>
                  <img
                    className="card-img-top "
                    src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Card image cap"
                    style={{ height: "80px" }}
                  />
                  <div style={{ fontSize: "20px" }}>tổng ngày làm chính</div>
                  <div className="card-body" style={{ textAlign: "center" }}>
                    {parseInt(
                      (this.state.typeWage / 30) *
                        (this.state.countTimeTowork / 2)
                    ) + " VND"}
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card" style={{ width: "20rem" }}>
                  <img
                    className="card-img-top "
                    src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Card image cap"
                    style={{ height: "80px" }}
                  />
                  <div style={{ fontSize: "20px" }}>tổng ngày làm phụ</div>
                  <div className="card-body" style={{ textAlign: "center" }}>
                    {this.state.OT *
                      (this.state.typeWage / 30) *
                      (this.state.countTimeOT / 2) +
                      " VND"}
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card" style={{ width: "20rem" }}>
                  <img
                    className="card-img-top "
                    src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Card image cap"
                    style={{ height: "80px" }}
                  />
                  <div style={{ fontSize: "20px" }}> tổng cộng bạn được</div>
                  <div className="card-body" style={{ textAlign: "center" }}>
                    {parseInt(
                      (this.state.typeWage / 30) *
                        (this.state.countTimeTowork / 2) +
                        this.state.OT *
                          (this.state.typeWage / 30) *
                          (this.state.countTimeOT / 2)
                    ) + " VND"}
                  </div>
                </div>
              </div>
              <br></br>
            </div>

            <div className="col-12" style={{ textAlign: "center" }}>
              {showTimeChecked}
            </div>
          </div>
        </div>
        <div class="modal fade" id="showCheckOT">
          <div class="modal-dialog" role="document">
            <div class="modal-content" style={{ height: "600px" }}>
              <div class="modal-header">
                <h5 class="modal-title"> CheckOT {this.state.monthOfYear}</h5>
              </div>
              <div class="modal-body">
                <h3>tuần thứ : {this.state.weekOfMonth}</h3>
                <BootstrapTable
                  keyField="Day"
                  data={arrays}
                  columns={columns}
                  // pagination={pagination}
                  //  rowEvents={rowEvents} // goi event
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StaffworktimeComponent;

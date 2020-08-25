import React, { Component } from "react";
import AppBarComponent from "../navbar/appBar.component";
import jwt_decode from "jwt-decode";
import {
  createTimeChecking,
  updateTimeNotWork,
  Timekeeping,
  getTimeKeeping,
  ExportExcel,
} from "./timekeepingFunction";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TimekeepingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: "",
      username: "",
      userId: "",
      dataCheckTime: [],
      toDay: "",
      startDate: new Date(),
      getTimeChecked: [],
      getCreateDay: [],
      getWeekTime: [],
      dataTimeToDay: "",
      countTimeTowork: 0,
      countTimeNotwork: 0,
      countTimeOT: 0,
      displays: "none",
      OT: 0,
      typeWage: 0,
    };
  }
  componentDidMount = async () => {
    const token = localStorage.userToken;
    const tokenJSON = JSON.parse(localStorage.userToken);
    // console.log("test last time");
    // const refreshToken = tokenJSON.refreshToken;
    // console.log(refreshToken);
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(token);

    await this.setState({
      username: decoded.data.username,
      userId: decoded.data._id,
      accessToken: accessToken,
      toDay: new Date().getDay() + 1, // chu y con thai doi
    });
    //console.log(decoded.data);
    //console.log(new Date().getDate());
    //console.log(new Date().getDay());

    // let getweek = this.weekinMonth();
    let monthYear = new Date().getMonth() + 1 + "/" + new Date().getFullYear();
    //console.log(monthYear);
    //console.log(getweek);
    await createTimeChecking(
      accessToken,
      decoded.data._id,
      monthYear
      // getweek
    ).then(async (res) => {
      await this.setState({
        dataTimeToDay: res,
      });

      res.checkedOneWeek.forEach(async (e) => {
        await this.setState({
          dataCheckTime: [...this.state.dataCheckTime, e],
        });
      });
    });
    if (this.state.toDay > 2) {
      updateTimeNotWork(
        accessToken,
        decoded.data._id,
        monthYear,
        // getweek,
        this.state.toDay
      ).then((res) => {
        //console.log(res);
        //console.log("check ngay nghi");
      });
    }
  };

  CheckTime = (event) => {
    //event.preventDefault();
    //console.log(this.state);
    //console.log(event.target);
    let data = {
      toDay: this.state.toDay,
      userId: this.state.userId,
      checkSession: event.target.name,
      timeChecked: Date.now(),
      monthYear: this.state.dataTimeToDay.monthYear,
      weekInMonth: this.state.dataTimeToDay.weekInMonth,
      isCheck: true,
    };
    if (event.target.name === "sang" && new Date().getHours() > 12) {
      return alert("ban da diem danh muon");
    }
    if (event.target.name === "chieu" && new Date().getHours() < 14) {
      return alert(" chua toi h diem danh ca nay");
    }
    if (event.target.name === "chieu" && new Date().getHours() > 18) {
      return alert("ban da diem danh muon");
    }
    Timekeeping(this.state.accessToken, data).then((res) => {
      alert("diem danh thanh cong");
      return window.location.reload();
      //console.log("done");
    });
    // if (this.state.toDay > 2) {
    //   updateTimeNotWork(
    //     accessToken,

    //     // decoded.data._id,
    //     // monthYear,
    //     // getweek,
    //     this.state.toDay
    //   ).then((res) => {
    //     //console.log(res);
    //     //console.log("check ngay nghi");
    //   });
    // }
    //console.log(data);
  };
  //change deadline
  handleChangeDate = (date) => {
    this.setState({
      startDate: date,
    });
  };
  clickSearchTimeCheck = (event) => {
    event.preventDefault();

    let TimeDay =
      this.state.startDate.getMonth() +
      1 +
      "/" +
      this.state.startDate.getFullYear();
    //console.log(
    //   this.state.startDate.getMonth() +
    //     1 +
    //     "/" +
    //     this.state.startDate.getFullYear()
    // );
    getTimeKeeping(this.state.accessToken, TimeDay, this.state.userId).then(
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
  };
  ExportFileExcel = (event) => {
    event.preventDefault();
    console.log(this.state);
    let TimeDay =
      this.state.startDate.getMonth() +
      1 +
      "/" +
      this.state.startDate.getFullYear();
    ExportExcel(this.state.accessToken, TimeDay, this.state.userId).then(
      (res) => {
        console.log("done");
        return alert("export thanh cong");
      }
    );
  };
  render() {
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

    //dua data vao table
    let arrays = [];

    this.state.dataCheckTime.map(async (element, index) => {
      if (index === 5) return;
      let mornings = (m, i, d, inMonth) => {
        if (!inMonth) return <i></i>;
        if (i === this.state.toDay) {
          if (m) {
            return <i className="fa fa-check"></i>;
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
    // for search
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
          <table class="table">
            <thead class="thead-dark">
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
    return (
      <div>
        <AppBarComponent username={this.state.username} />
        <div className="row">
          <div className="col-3"></div>
          <div className="col-7">
            <div className="row">
              <div>
                <h1>Time keeping</h1>
              </div>
              <div>
                <BootstrapTable
                  keyField="Day"
                  data={arrays}
                  columns={columns}
                  // pagination={pagination}
                  //  rowEvents={rowEvents} // goi event
                />
              </div>
              <div className="col-sm-12">
                <h1>See more</h1>
                <div>
                  <div className="col-sm-3">
                    {" "}
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChangeDate}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                    />
                  </div>
                  <div className="col-sm-3">
                    <button
                      type="submit"
                      onClick={this.clickSearchTimeCheck}
                      style={{ height: " 32px", marginLeft: " -36px" }}
                    >
                      search
                    </button>
                  </div>
                  <div
                    className="col-sm-6"
                    style={{ width: " 150px", marginLeft: "210px" }}
                  >
                    <button
                      type="submit"
                      onClick={this.ExportFileExcel}
                      style={{ marginTop: " 5px" }}
                    >
                      export file excel
                    </button>
                  </div>
                </div>
              </div>
              <div
                className=" row col-12 ml-5"
                style={{
                  display: this.state.displays,
                }}
              >
                <br></br>
                <div
                  className="col-sm-3 ml-5"
                  style={{
                    backgroundColor: "#33b5e5",
                    maxHeight: "100px",
                    borderRadius: "5px",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "22px", color: "white" }}>
                      Working Day
                    </span>
                  </div>
                  <div className="pt-3 pl-3" style={{ fontSize: "20px" }}>
                    {this.state.countTimeTowork / 2}
                  </div>
                  <div style={{ float: "right", marginTop: "-30px" }}>
                    <i class="fas fa-running fa-2x"></i>
                  </div>
                </div>
                <div
                  className="col-sm-3 ml-5"
                  style={{
                    backgroundColor: "#33b5e5",
                    maxHeight: "100px",
                    borderRadius: "5px",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "22px", color: "white" }}>
                      Day Off
                    </span>
                  </div>
                  <div className="pt-3 pl-3" style={{ fontSize: "20px" }}>
                    {this.state.countTimeNotwork / 2}
                  </div>
                  <div style={{ float: "right", marginTop: "-30px" }}>
                    <i class="fas fa-bed fa-2x"></i>
                  </div>
                </div>
                <div
                  className="col-sm-3 ml-5"
                  style={{
                    backgroundColor: "#33b5e5",
                    maxHeight: "100px",
                    borderRadius: "5px",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "22px", color: "white" }}>OT</span>
                  </div>
                  <div className="pt-3 pl-3" style={{ fontSize: "20px" }}>
                    {this.state.countTimeOT / 2}
                  </div>
                  <div style={{ float: "right", marginTop: "-30px" }}>
                    <i class="fas fa-people-carry fa-2x"></i>
                  </div>
                </div>
              </div>

              <div
                className=" row col-12 ml-5"
                style={{ display: this.state.displays }}
              >
                <br></br>
                <div
                  className="col-sm-3 ml-5"
                  style={{
                    backgroundColor: "#33b5e5",
                    maxHeight: "100px",
                    borderRadius: "5px",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "22px", color: "white" }}>
                      Salary
                    </span>
                  </div>
                  <div className="pt-3 pl-3" style={{ fontSize: "20px" }}>
                    {parseInt(
                      (this.state.typeWage / 20) *
                        (this.state.countTimeTowork / 2)
                    ) + " VND"}
                  </div>
                  <div style={{ float: "right", marginTop: "-30px" }}>
                    <i class="fas fa-money-check-alt fa-2x"></i>
                  </div>
                </div>
                <div
                  className="col-sm-3 ml-5"
                  style={{
                    backgroundColor: "#33b5e5",
                    maxHeight: "100px",
                    borderRadius: "5px",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "22px", color: "white" }}>
                      OT Pay
                    </span>
                  </div>
                  <div className="pt-3 pl-3" style={{ fontSize: "20px" }}>
                    {this.state.OT *
                      (this.state.typeWage / 20) *
                      (this.state.countTimeOT / 2) +
                      " VND"}
                  </div>
                  <div style={{ float: "right", marginTop: "-30px" }}>
                    <i class="fas fa-money-check-alt fa-2x"></i>
                  </div>
                </div>
                <div
                  className="col-sm-3 ml-5"
                  style={{
                    backgroundColor: "#33b5e5",
                    maxHeight: "100px",
                    borderRadius: "5px",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "22px", color: "white" }}>
                      Total Salary
                    </span>
                  </div>
                  <div className="pt-3 pl-3" style={{ fontSize: "20px" }}>
                    {parseInt(
                      (this.state.typeWage / 20) *
                        (this.state.countTimeTowork / 2) +
                        this.state.OT *
                          (this.state.typeWage / 20) *
                          (this.state.countTimeOT / 2)
                    ) + " VND"}
                  </div>
                  <div style={{ float: "right", marginTop: "-30px" }}>
                    <i class="fas fa-money-check-alt fa-2x"></i>
                  </div>
                </div>
                <br></br>
                <br />
                <br />
                <hr />
              </div>

              <div className="col-12 mt-5" style={{ textAlign: "center" }}>
                {showTimeChecked}
              </div>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    );
  }
}

export default TimekeepingComponent;

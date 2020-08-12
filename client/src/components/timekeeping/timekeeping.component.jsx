import React, { Component } from "react";
import AppBarComponent from "../navbar/appBar.component";
import jwt_decode from "jwt-decode";
import {
  createTimeChecking,
  Timekeeping,
  getTimeKeeping,
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
      dataTimeToDay: "",
    };
  }
  // get week in month today
  weekinMonth = () => {
    let adjustedDate = new Date().getDate() + new Date().getDay();
    let prefixes = ["0", "1", "2", "3", "4", "5"];
    return parseInt(prefixes[0 | (adjustedDate / 7)]) + 1;
  };
  componentDidMount = async () => {
    const token = localStorage.userToken;
    const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(token);

    await this.setState({
      username: decoded.data.username,
      userId: decoded.data._id,
      accessToken: accessToken,
      toDay: new Date().getDay() + 1, // chu y con thai doi
    });
    //console.log(decoded.data);
    // console.log(new Date().getDate());
    // console.log(new Date().getDay());

    let getweek = this.weekinMonth();
    let monthYear = new Date().getMonth() + 1 + "/" + new Date().getFullYear();
    // console.log(monthYear);
    // console.log(getweek);
    await createTimeChecking(
      accessToken,
      decoded.data._id,
      monthYear,
      getweek
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
  };

  CheckTime = (event) => {
    //event.preventDefault();
    console.log(this.state);
    console.log(event.target);
    let data = {
      toDay: this.state.toDay,
      userId: this.state.userId,
      checkSession: event.target.name,
      timeChecked: Date.now(),
      monthYear: this.state.dataTimeToDay.monthYear,
      weekInMonth: this.state.dataTimeToDay.weekInMonth,
    };
    // if (event.target.name === "sang" && new Date().getHours() > 12) {
    //   alert("ban da diem danh muon");
    // }
    // if (event.target.name === "chieu" && new Date().getHours() < 14) {
    //   alert(" chua toi h diem danh ca nay");
    // }
    // if (event.target.name === "chieu" && new Date().getHours() > 18) {
    //   alert("ban da diem danh muon");
    // }
    Timekeeping(this.state.accessToken, data).then((res) => {
      alert("diem danh thanh cong");

      console.log("done");
    });
    // console.log(data);
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
    // console.log(
    //   this.state.startDate.getMonth() +
    //     1 +
    //     "/" +
    //     this.state.startDate.getFullYear()
    // );
    getTimeKeeping(this.state.accessToken, TimeDay, this.state.userId).then(
      (res) => {
        console.log(res);
        if (res.getTime.length === 0) {
          return alert("ko co thong tin can tim");
        }
        // this.setState({
        //   displays: "none",
        // });
        res.getTime.forEach(async (e) => {
          await this.setState({
            getTimeChecked: [...this.state.getTimeChecked, e.checkedOneWeek],
          });
        });
        // this.setState({
        //   displays: "block",
        // });
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
      let mornings = (m, i, d) => {
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
        morning: mornings(element.morning, index + 2, "sang"),
        afternoon: mornings(element.afternoon, index + 2, "chieu"),
      };
      return arrays.push(abc);
    });
    // show Time keeping
    //let showArray = [];
    // let arrayss = [];
    // this.state.getTimeChecked.map(async (e) => {
    //   await e.map((ele, index) => {
    //     let abc = {
    //       Day: index + 2,
    //       morning: ele.morning ? (
    //         <i class="fa fa-check"></i>
    //       ) : (
    //         <i class="fa fa-times"></i>
    //       ),
    //       afternoon: ele.afternoon ? (
    //         <i class="fa fa-check"></i>
    //       ) : (
    //         <i class="fa fa-times"></i>
    //       ),
    //     };
    //     return arrayss.push(abc);
    //   });

    //   return await showArray.push(arrayss);
    // });
    // //console.log(arrayss);
    // let showTimeChecked = showArray.map(async (element) => {
    //   await (
    //     <BootstrapTable keyField="Day" data={element} columns={columns} />
    //   );
    // });
    // console.log(showTimeChecked);
    let showTimeChecked = this.state.getTimeChecked.map((element) => {
      let abc = element.map((e, index) => {
        console.log(e);
        let show = (type) => {
          return type ? (
            <i class="fa fa-check"></i>
          ) : (
            <i class="fa fa-times"></i>
          );
        };
        return (
          <tr>
            <td>{index + 2}</td>
            <td>{show(e.morning)}</td>
            <td>{show(e.afternoon)}</td>
          </tr>
        );
      });
      return (
        <table class="table">
          <thead>
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
      );
    });
    return (
      <div>
        <AppBarComponent username={this.state.username} />
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
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
              <div>
                <h1>Tim thong tin Time Checked</h1>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChangeDate}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                />
                &nbsp;
                <button type="submit" onClick={this.clickSearchTimeCheck}>
                  search
                </button>
              </div>
              <div className="col-12" style={{ textAlign: "center" }}>
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

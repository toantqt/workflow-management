import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { findAdminRoom } from "../add-room/roomFunction";
import "./timekeeping.css";
import { getTimeKeeping } from "./timekeepingFunction";
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
      ownerId: "",
      getTimeChecked: [],
      getCreateDay: [],
      displays: "none",
      countTimeTowork: 0,
      countTimeNotwork: 0,
      countTimeOT: 0,
      OT: 0,
      typeWage: 0,
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
          // console.log(e);
          this.setState({
            users: [...this.state.users, { id: e._id, username: e.username }],
          });
        });

        //console.log(this.state);
      });
    }
  };
  handleBlur = (e) => {
    // console.log(e.target);
    this.setState({
      display: "none",
    });
  };
  onHandleChange = (event) => {
    //  console.log(event.target.name);
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
      });
    } else {
      this.setState({
        [name]: value,
        showResults: !this.state.showResults,
        display: "none",
      });
    }
    // console.log(this.state);
  };
  //xoa admin nhom khi chon nham'
  removeManager = () => {
    this.setState({
      ownerId: "",
      showResults: false,
      display: "none",
      nameManager: "",
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
        console.log(res);
        if (res.getTime.length === 0) {
          return alert("ko co thong tin can tim");
        }
        this.setState({
          displays: "none",
          OT: res.getWageUser.wageOt,
          typeWage: res.getWageUser.typeWage,
        });
        res.getTime.forEach(async (e) => {
          await this.setState({
            getTimeChecked: [...this.state.getTimeChecked, e.checkedOneWeek],
            getCreateDay: [...this.state.getCreateDay, e.createAt],
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
      //  console.log(ownerId);
      return ownerId ? (
        <div>
          <button
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
              <th>Day Begin: {dates(this.state.getCreateDay[i])}</th>
            </tr>
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
      <div
        className="col-9"
        style={{ float: "right", marginTop: "-238px" }}
        onClick={this.handleBlur}
      >
        <legend>
          <h1>view work time</h1>
        </legend>

        <div class="form-group" style={{ width: "400px", padding: "10px" }}>
          {/* <label>nhập tên cần tìm</label>
            <input
              type="text"
              class="form-control"
              id=""
              placeholder="nhap ten"
            /> */}
          <label>nhập tên cần tìm</label>
          {showManager(this.state.ownerId, this.state.nameManager)}
          <span
            className="search-user-list-results"
            style={{ display: this.state.display }}
          >
            <h3>Manager :</h3>
            <div className="search-user-list-content">
              <ul>{showuser}</ul>
            </div>
          </span>
          <br></br>
          <label>chọn tháng trong năm cần xem</label>
          &nbsp;
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChangeDate}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          onClick={this.HandleViewWorkTime}
        >
          Submit
        </button>
        {/* <div style={{ width: "800px" }}>
          <div
            className=" row col-12"
            style={{ display: this.state.displays, textAlign: "center" }}
          >
            <h1>kết quả cần tìm </h1>
            <div className="col-sm-3">
              <h3>số buổi làm trong tháng này: {this.state.countTimeTowork}</h3>
            </div>
            <div className="col-sm-6">
              <h3>
                số buổi nghỉ trong tháng này: {this.state.countTimeNotwork}
              </h3>
            </div>
            <div className="col-sm-3">
              <h3> số buổi OT: {this.state.countTimeOT} </h3>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>{showTimeChecked}</div>
        </div> */}

        <div style={{ width: "800px" }}>
          <div
            className=" row col-12"
            style={{
              display: this.state.displays,
              textAlign: "center",
            }}
          >
            <br></br>
            <div className="col-sm-3">
              số buổi làm trong tháng này: {this.state.countTimeTowork}
            </div>
            <div className="col-sm-6">
              số buổi nghỉ trong tháng này: {this.state.countTimeNotwork}
            </div>
            <div className="col-sm-3">số buổi OT: {this.state.countTimeOT}</div>
          </div>
          <div
            className=" row col-12"
            style={{ display: this.state.displays, textAlign: "center" }}
          >
            <div className="col-sm-3">
              tổng ngày làm chính :{" "}
              {parseInt(
                (this.state.typeWage / 30) * this.state.countTimeTowork
              ) + " VND"}
            </div>
            <div className="col-sm-6">
              tổng lương ngày làm phụ:{" "}
              {this.state.OT *
                (this.state.typeWage / 30) *
                this.state.countTimeOT +
                " VND"}
            </div>
            <div className="col-sm-3">
              tổng cộng bạn được:{" "}
              {parseInt(
                (this.state.typeWage / 30) * this.state.countTimeTowork +
                  this.state.OT *
                    (this.state.typeWage / 30) *
                    this.state.countTimeOT
              ) + " VND"}
            </div>
            <br></br>
          </div>
          <div className="col-12" style={{ textAlign: "center" }}>
            {showTimeChecked}
          </div>
        </div>
      </div>
    );
  }
}

export default StaffworktimeComponent;

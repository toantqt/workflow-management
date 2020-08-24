import React, { Component } from "react";
import { findAdminRoom } from "../add-room/roomFunction";
import {
  getInforSalaryStaff,
  createSalary,
  updateSalaryStaff,
} from "./editSalaryFunction";
class EditSalaryComponent extends Component {
  constructor(props) {
    super(props);
    const tokenJSON = JSON.parse(localStorage.userToken);
    this.state = {
      accessToken: tokenJSON.accessToken,
      users: [], // danh sach nguoi co the chon
      showResults: false, // show user
      display: "none", // trang thai dong mo manager
      nameManager: "", // ten admin
      ownerId: "", // id nguoi can tim
      displays: "none",
      salaryId: "",
      rank: "",
      typeWage: "",
      Ot: "",
      workDay: 20,
      allowAnce: "",
      showfromSalary: "none",
    };
  }
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
  //xoa lua chon'
  removeManager = () => {
    this.setState({
      ownerId: "",
      showResults: false,
      display: "none",
      nameManager: "",
      showfromSalary: "none", // ẩn infor
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
        // showCheckOT: "#showCheckOT",
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
  handleBlur = (e) => {
    // console.log(e.target);
    this.setState({
      display: "none",
    });
  };
  submitFind = (event) => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.ownerId === "") {
      return alert("ban can chon nguoi muon tim truoc");
    }
    getInforSalaryStaff(this.state.accessToken, this.state.ownerId).then(
      (res) => {
        // console.log(res.getSalary);
        this.setState({
          showfromSalary: "none",
          salaryId: "",
          rank: "",
          typeWage: "",
          Ot: "",
          //workDay: "",
          allowAnce: "",
        });
        if (res.getSalary === null) {
          this.setState({
            showfromSalary: "block",
            salaryId: "",
            rank: "",
            typeWage: "",
            Ot: "",
            //  workDay: "",
            allowAnce: "",
          });
          return alert("người này chưa có thông tin salary mời bạn thêm vào");
        }
        this.setState({
          showfromSalary: "block",
          salaryId: res.getSalary._id,
          rank: res.getSalary.rankWage,
          typeWage: res.getSalary.typeWage,
          Ot: res.getSalary.wageOt,
          // workDay: res.getSalary.workDay,
          allowAnce: res.getSalary.allowAnce,
        });
      }
    );
  };
  handleChanEdit = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  EditSalary = (event) => {
    event.preventDefault();
    console.log(this.state);
    let edit = {
      salaryId: this.state.salaryId,
      rank: this.state.rank,
      typeWage: this.state.typeWage,
      Ot: this.state.Ot,
      workDay: this.state.workDay,
      allowAnce: this.state.allowAnce,
    };
    console.log(edit);
    if (this.state.salaryId === "") {
      // goi create
      createSalary(this.state.accessToken, edit, this.state.ownerId).then(
        (res) => {
          console.log("done create");
          return alert("cập nhật thành công");
        }
      );
    } else {
      // goi up date
      updateSalaryStaff(this.state.accessToken, edit, this.state.ownerId).then(
        (res) => {
          console.log("done update");
          return alert("cập nhật thành công");
        }
      );
    }
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
            style={{
              height: "25px",
              paddingTop: "1px",
              marginTop: "0px",
              borderRadius: " 5px 0px 0px 5px",
            }}
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
          style={{
            width: "200px",
            height: "25px",
            borderRadius: " 5px 0px 0px 5px",
          }}
          type="text"
          className="form-control"
          // name="ownerId"
          placeholder="Input field"
          // onChange={this.onHandleChange}
          onKeyDown={this._handleKeyDown}
        />
      );
    };
    return (
      <div onClick={this.handleBlur}>
        <div className="col-9" style={{ float: "right", marginTop: "-350px" }}>
          <h1>Salary View and Edit</h1>
          <br></br>
          <div className="row" style={{ marginLeft: "5px" }}>
            <span>enter the search name &nbsp;</span>
            {showManager(this.state.ownerId, this.state.nameManager)}
            <span
              className="search-user-list-results"
              style={{
                display: this.state.display,
                width: "200px",
                margin: " 25px 0px 0px 145px",
              }}
            >
              <h3>staff :</h3>
              <div className="search-user-list-content">
                <ul>{showuser}</ul>
              </div>
            </span>
            <button
              type="button"
              className="btn btn-info"
              style={{
                height: "25px",
                width: "50px",
                marginTop: " 0px",
                padding: " 2px",
                borderRadius: " 0px 5px 5px 0px",
                border: "none",
              }}
              onClick={this.submitFind}
            >
              find
            </button>
          </div>
          <hr />
          {/* <div className="col-sm-3"></div> */}
          <div
            className="col-sm-6 card"
            style={{ background: "while", display: this.state.showfromSalary }}
          >
            <h1 style={{ textAlign: "center" }}>Infor salary</h1>
            <div class="form-group">
              <div className="col-sm-3">
                <label> Name:</label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  style={{
                    width: "300px",
                    margin: "0px auto",
                    height: "30px",
                    marginBottom: "5px",
                  }}
                  value={this.state.nameManager}
                />
              </div>

              <div className="col-sm-3">
                <label> Position:</label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  style={{
                    width: "300px",
                    margin: "0px auto",
                    height: "30px",
                    marginBottom: "5px",
                  }}
                  name="rank"
                  value={this.state.rank}
                  onChange={this.handleChanEdit}
                />
              </div>

              <div className="col-sm-3">
                <label> TypeSalary:</label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  style={{
                    width: "300px",
                    margin: "0px auto",
                    height: "30px",
                    marginBottom: "5px",
                  }}
                  name="typeWage"
                  value={this.state.typeWage}
                  onChange={this.handleChanEdit}
                />
              </div>

              <div className="col-sm-3">
                <label> OT:</label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  style={{
                    width: "300px",
                    margin: "0px auto",
                    height: "30px",
                    marginBottom: "5px",
                  }}
                  name="Ot"
                  value={this.state.Ot}
                  onChange={this.handleChanEdit}
                />
              </div>

              <div className="col-sm-3">
                <label> Day work:</label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  style={{
                    width: "300px",
                    margin: "0px auto",
                    height: "30px",
                    marginBottom: "5px",
                  }}
                  name="workDay"
                  value={this.state.workDay}
                  // onChange={this.handleChanEdit}
                />
              </div>

              <div className="col-sm-3">
                <label> Allowance:</label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  style={{
                    width: "300px",
                    margin: "0px auto",
                    height: "30px",
                    marginBottom: "5px",
                  }}
                  name="allowAnce"
                  value={this.state.allowAnce}
                  onChange={this.handleChanEdit}
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary"
                onClick={this.EditSalary}
              >
                Edit
              </button>
            </div>
          </div>
          <div className="col-sm-6"></div>
        </div>
      </div>
    );
  }
}

export default EditSalaryComponent;

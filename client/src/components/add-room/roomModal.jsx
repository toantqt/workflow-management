import React, { Component } from "react";
import "./roomModal.css";
import { addRoom, findAdminRoom } from "./roomFunction";
//import jwt_decode from "jwt-decode";
class RoomModal extends Component {
  constructor(props) {
    super(props);
    const tokenJSON = JSON.parse(localStorage.userToken);
    this.state = {
      accessToken: tokenJSON.accessToken,
      nameRoom: "",
      ownerId: "", // id admin
      users: [], // danh sach nguoi co the chon
      showResults: false, // show user
      display: "none", // trang thai dong mo manager
      nameManager: "", // ten admin
    };
  }

  onHandleChange = (event) => {
    //  //console.log(event.target.name);
    let target = event.target;
    let name = target.name;

    // let value = target.name === "ownerId" ? target.id : target.value;
    //console.log(value);
    // this.setState({
    //   [name]: value,
    //   showResults: !this.state.showResults,
    //   display: "none",
    // });
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
    //console.log(this.state);
  };

  onHandleChangeSubmit = (event) => {
    event.preventDefault();
    //const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = this.state.accessToken;
    const add = {
      nameRoom: this.state.nameRoom,
      ownerId: this.state.ownerId,
      member: {
        userId: this.state.ownerId,
      },
    };
    if (add.ownerId === "" || add.nameRoom === "") return;
    //add-room
    addRoom(accessToken, add).then((res) => {
      //console.log("add room thanh cong");
    });
    //console.log(add);
  };
  // bac enter khi search user
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
  //xoa admin nhom khi chon nham'
  removeManager = () => {
    this.setState({
      ownerId: "",
      showResults: false,
      display: "none",
      nameManager: "",
    });
  };
  handleBlur = (e) => {
    //console.log(e.target);
    this.setState({
      display: "none",
    });
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
    return (
      <div className="modal fade" id="exampleModal" onClick={this.handleBlur}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Room
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" style={{ marginBottom: "40px" }}>
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form action="" method="POST" role="form">
                <div className="form-group">
                  <label>Name-Room</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Input field"
                    name="nameRoom"
                    onChange={this.onHandleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Manager</label>
                  {/* <input
                    type="text"
                    className="form-control"
                    // name="ownerId"
                    placeholder="Input field"
                    // onChange={this.onHandleChange}
                    onKeyDown={this._handleKeyDown}
                  /> */}
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
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.onHandleChangeSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomModal;

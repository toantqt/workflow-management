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
      ownerId: "",
      users: [],
    };
  }

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    // let members = [...this.state.members];
    // if (name === "members") {
    //   members.push({ userId: value });
    //   this.setState({ members });
    // } else {
    //   this.setState({
    //     [name]: value,
    //   });
    // }
    this.setState({
      [name]: value,
    });
    //  console.log(this.state);
  };
  onHandleChangeSubmit = (event) => {
    event.preventDefault();
    //const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = this.state.accessToken;
    const add = {
      nameRoom: this.state.nameRoom,
      ownerId: this.state.ownerId,
    };
    //console.log(this.state);
    //add-room
    addRoom(accessToken, add).then((res) => {
      //console.log(res.getUsers);
      // const user = res.getUsers;
      // user.forEach((e) => {
      //   // console.log(e);
      //   this.setState({
      //     users: [...this.state.users, { id: e._id, username: e.username }],
      //   });
      // });
      console.log("alo");
    });
    //console.log(add);
  };
  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      let find = e.target.value;
      //const tokenJSON = JSON.parse(localStorage.userToken);
      const accessToken = this.state.accessToken;
      //console.log("do validate " + find);
      //finduser
      findAdminRoom(accessToken, find).then((res) => {
        //console.log(res.getUsers);
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

  render() {
    let showuser = this.state.users.map((e, index) => {
      return (
        <li key={index}>
          {e.username}
          <button
            type="button"
            className="btn btn-primary"
            name="ownerId"
            value={e.id}
            onClick={this.onHandleChange}
          >
            X
          </button>
        </li>
      );
    });

    return (
      <div
        className="modal fade"
        id="exampleModal"
        // tabindex="-1"
        // role="dialog"
        // aria-labelledby="exampleModalLabel"
        // aria-hidden="true"
      >
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
                  <input
                    type="text"
                    className="form-control"
                    // name="ownerId"
                    placeholder="Input field"
                    // onChange={this.onHandleChange}
                    onKeyDown={this._handleKeyDown}
                  />
                  <span class="search-user-list-results">
                    <h3>Manager :</h3>
                    <div class="search-user-list-content">
                      <ul>{showuser}</ul>
                    </div>
                  </span>
                </div>
                {/* <div className="form-group">
                  <label>Staff</label>
                  <input
                    type="text"
                    className="form-control"
                    name="members"
                    placeholder="Input field"
                    onChange={this.onHandleChange}
                  />
                </div> */}
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

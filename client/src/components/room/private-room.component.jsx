import React, { Component } from "react";
import AppBarComponent from "../navbar/appBar.component";
import RoomSidebarComponent from "../roomSidebar/room-sidebar.component";
import TaskComponent from "../task/task.component";
// import ModalListComponent from "../board-task/modal-list.component";
import jwt_decode from "jwt-decode";
import {
  getDataRoom,
  addTask,
  findUserAddRoom,
  addUserRoom,
} from "./roomFunction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class PrivateRoomComponent extends Component {
  constructor(props) {
    super(props);
    const tokenJSON = JSON.parse(localStorage.userToken);
    this.state = {
      accessToken: tokenJSON.accessToken,
      username: "",
      id: "",
      nameRoom: "",
      roomId: "",
      members: [],

      startDate: new Date(), // goi date
      title: "",
      tasks: [],
      showResults: false, // show user
      users: [], // mang find user add room
      display: "none",

      Array: [],
    };
  }

  componentDidMount() {
    const token = localStorage.userToken;
    //const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = this.state.accessToken;
    const decoded = jwt_decode(token);
    this.setState({
      username: decoded.data.username,
      id: decoded.data._id,
    });
    let id = this.props.id;
    getDataRoom(accessToken, id)
      .then(async (res) => {
        // console.log(res.data._id);
        let arrMembers = res.inforMember;
        //console.log(arrMembers);
        await arrMembers.forEach(async (e) => {
          // console.log(e);
          await this.setState({
            members: [...this.state.members, { e }],
            nameRoom: res.data.nameRoom,
            roomId: res.data._id,
            ownerId: res.data.ownerId,
          });
        });

        // arr task, push task to taskarray in state
        let arrTasks = res.inforTask;

        //  console.log(res);
        // console.log(arrTasks);
        await arrTasks.forEach(async (e) => {
          //  console.log("e: " + e);
          await arrMembers.forEach((member) => {
            if (e.idStaff === member._id) {
              this.setState({
                tasks: [...this.state.tasks, { e: e, inforAuthor: member }],
              });
              //   console.log(this.state.tasks);
            }
          });
        });
        console.log(this.state.tasks);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // luu date vao state
  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;

    if (name === "title") {
      let value = target.value;
      this.setState({
        title: value,
      });
    }
  };

  _handleKeyDownAddMember = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let find = e.target.value;
      console.log(find);
      console.log(this.state.roomId);
      if (find === "") return;
      //const tokenJSON = JSON.parse(localStorage.userToken);
      const accessToken = this.state.accessToken;
      //console.log("do validate " + find);
      //finduser
      this.state.showResults = true;
      this.state.display = "block";
      let data = {
        find: find,
        roomId: this.state.roomId,
      };
      findUserAddRoom(accessToken, data).then((res) => {
        //  console.log(res.finduser);
        //  console.log("done");
        this.setState({
          users: [],
        });
        const user = res.finduser;
        user.forEach((e) => {
          // console.log(e);
          this.setState({
            users: [...this.state.users, { id: e._id, username: e.username }],
          });
        });
        console.log(this.state);
      });
    }
  };

  onHandleChangeSubmit = (event) => {
    event.preventDefault();
    let date = this.state.startDate;
    let moonLanding = new Date(date);
    let dates = moonLanding.getTime();
    const accessToken = this.state.accessToken;
    let task = {
      title: this.state.title,
      deadline: dates,
      idStaff: this.state.id,
      roomId: this.state.roomId,
    };
    //  console.log(task);
    // console.log(new Date(task.deadline));
    addTask(accessToken, task).then((res) => {
      console.log("them nhiem vu thanh cong");
    });
  };

  // them thanh vien
  onHandleChangeAddMember = (event) => {
    let target = event.target;
    let name = target.name;
    let check = false;
    //let value = target.name === "ownerId" ? target.id : target.value;
    // console.log(target);
    this.setState({
      [name]: target.id,
      showResults: !this.state.showResults,
      display: "none",

      // userInfor: {
      //   nameUser: target.value,
      //   idUser: target.id,
      // },
      // Array: [
      //   ...this.state.Array,
      //   { nameUser: target.value, idUser: target.id },
      // ],
    });
    this.state.Array.forEach((e) => {
      if (e.idUser === target.id) return (check = true);
    });
    if (!check) {
      this.setState({
        Array: [
          ...this.state.Array,
          { nameUser: target.value, idUser: target.id },
        ],
      });
    }
  };

  removeManager = (event) => {
    this.setState({
      Array: this.state.Array.filter((e) => e.idUser !== event.target.value),
    });
  };
  onHandleChangeSubmitAddMember = (event) => {
    event.preventDefault();
    //  console.log("alalalalala");
    let add = {
      _id: this.state.roomId,
      members: this.state.Array,
    };
    addUserRoom(this.state.accessToken, add).then((res) => {
      console.log("done");
    });
  };
  render() {
    // let listMember = this.state.members.map((element, index) => {
    //   return <li key={index}>{element.e.username}</li>;
    // });

    let showuser = this.state.users.map((e, index) => {
      return this.state.showResults ? (
        <li key={index}>
          {e.username}
          <button
            type="button"
            className="btn btn-primary add-user"
            name="themUser"
            id={e.id}
            value={e.username}
            onClick={this.onHandleChangeAddMember}
          >
            +
          </button>
        </li>
      ) : null;
    });

    let showManager = () => {
      let buffer = [];
      this.state.Array.forEach((e, index) => {
        buffer.push(
          <span key={index}>
            <button
              type="button"
              className="btn btn-primary "
              value={e.idUser}
              onClick={this.removeManager}
            >
              {e.nameUser}&nbsp;X
            </button>
          </span>
        );
      });
      // console.log(this.state);
      return buffer;
    };

    return (
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          // tabIndex="-1"
          //role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Them Viec
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>tiêu đề</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="ten nhiem vu"
                      onChange={this.onHandleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>ngày kêt thúc</label>
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                    />
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
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onHandleChangeSubmit}
                  data-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="addMemberModal"
          //tabIndex="-1"
          // role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Them Thanh Vien
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form
              // onSubmit={(event) => this.onHandleChangeSubmitAddMember(event)}
              >
                <div className="modal-body">
                  {/* <form> */}
                  <div className="form-group">
                    <label>Nhap ten</label>
                    <input
                      type="text"
                      className="form-control"
                      // name="title"
                      placeholder="nhap ten can tim"
                      // onChange={this.onHandleChangeAddMember}
                      onKeyDown={this._handleKeyDownAddMember}
                    />
                    <span
                      className="search-user-list-results"
                      style={{ display: this.state.display }}
                    >
                      <h3>User :</h3>
                      <div className="search-user-list-content">
                        <ul>{showuser}</ul>
                      </div>
                    </span>
                  </div>
                  <div className="showUserAdd">{showManager()}</div>
                  {/* </form> */}
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
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onHandleChangeSubmitAddMember}
                    data-dismiss="modal"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <AppBarComponent username={this.state.username} />
        <div className="row" style={{ margin: "0 auto " }}>
          <RoomSidebarComponent data={this.state} />
          <TaskComponent
            data={this.state}
            accessToken={this.state.accessToken}
          />
        </div>
      </div>
    );
  }
}

export default PrivateRoomComponent;

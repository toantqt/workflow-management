import React, { Component } from "react";
import AppBarComponent from "../navbar/appBar.component";
import RoomSidebarComponent from "../roomSidebar/room-sidebar.component";
import TaskComponent from "../task/task.component";
import jwt_decode from "jwt-decode";
import { getDataRoom, addTask } from "./roomFunction";
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
        console.log(res.data._id);
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

        console.log(res);
        // console.log(arrTasks);
        await arrTasks.forEach(async (e) => {
          console.log("e: " + e);
          await arrMembers.forEach((member) => {
            if (e.idStaff === member._id) {
              this.setState({
                tasks: [...this.state.tasks, { e: e, inforAuthor: member }],
              });
              console.log(this.state.tasks);
            }
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // luu date vao sate
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
    console.log(task);
    // console.log(new Date(task.deadline));
    addTask(accessToken, task).then((res) => {
      console.log("them nhiem vu thanh cong");
    });
  };
  render() {
    let listMember = this.state.members.map((element, index) => {
      return <li key={index}>{element.e.username}</li>;
    });
    return (
      <div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Them Viec
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form action="" method="POST" role="form">
                  <div className="form-group">
                    <label for="">tiêu đề</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="ten nhiem vu"
                      onChange={this.onHandleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label for="">ngày kêt thúc</label>
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
        <AppBarComponent username={this.state.username} />
        <div className="row" style={{ margin: "0 auto " }}>
          <RoomSidebarComponent data={this.state} />
          <TaskComponent data={this.state} />
        </div>
      </div>
    );
  }
}

export default PrivateRoomComponent;

import React, { Component } from "react";

import {
  getProfileRoom,
  getInforMember,
  removeRoom,
  updateOwner,
} from "./profileRoomFunction";
import { Image } from "cloudinary-react";
import jwt_decode from "jwt-decode";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { showProfile } from "../profile/profileFunctions";
import "./profile-room.component.css";
import { findAdminRoom } from "../add-room/roomFunction";
const pagination = paginationFactory({
  sizePerPage: 9,
});
class ProfileRoomComponent extends Component {
  constructor(props) {
    super(props);
    const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = tokenJSON.accessToken;
    this.state = {
      roomProfile: [],
      inforUser: [],
      accessToken: accessToken,
      nameOwnerMoment: "",
      ownerId: "",
      display: "none",
      nameManager: "", // ten admin
      showResults: false,
      users: [], // danh sach nguoi co the chon
      idRoomEdit: "",
    };
  }
  componentDidMount() {
    const token = localStorage.userToken;
    const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(token);
    //console.log(decoded);
    this.setState({
      userOnl: decoded.data._id,
    });
    getProfileRoom(accessToken)
      .then((res) => {
        //console.log(res.AllRoom);
        res.AllRoom.forEach((e) => {
          //  //console.log(e);
          this.setState({
            roomProfile: [...this.state.roomProfile, e],
          });
        });
        //  //console.log(this.state);
      })
      .catch((error) => {
        //console.log(error);
      });
  }
  showMember = (event) => {
    event.preventDefault();
    //console.log(event.target.id);
    this.setState({
      inforUser: [],
    });
    getInforMember(this.state.accessToken, event.target.id).then((res) => {
      //console.log(res.inForUser);
      res.inForUser.forEach((e) => {
        //  //console.log(e);
        this.setState({
          inforUser: [...this.state.inforUser, e],
        });
      });
    });
  };
  removeRooms = (event) => {
    event.preventDefault();
    removeRoom(
      this.state.accessToken,
      this.state.userOnl,
      event.target.id
    ).then((res) => {
      //console.log("done");
    });
  };
  editOwner = (e) => {
    e.preventDefault();
    //console.log(e.target.className);
    this.setState({
      nameOwnerMoment: e.target.id,
      idRoomEdit: e.target.className,
    });
  };
  // bac enter khi search user
  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      let find = e.target.value;
      if (find === "") return;
      this.state.showResults = true;
      this.state.display = "block";
      findAdminRoom(this.state.accessToken, find).then((res) => {
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
  onHandleChange = (event) => {
    event.preventDefault();
    this.setState({
      ownerId: event.target.id,
      showResults: !this.state.showResults,
      display: "none",
      nameManager: event.target.value,
    });
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
  onHandleChangeSubmit = (event) => {
    event.preventDefault();
    //const tokenJSON = JSON.parse(localStorage.userToken);
    //console.log(this.state);
    if (
      this.state.ownerId === "" ||
      this.state.nameManager === this.state.nameOwnerMoment
    ) {
      alert("thao tac khong phu hop");
      return;
    }
    //update-room
    updateOwner(
      this.state.accessToken,
      this.state.ownerId,
      this.state.idRoomEdit
    ).then((res) => {
      //console.log("update room thanh cong");
    });
    //console.log(add);
  };
  handleBlur = (e) => {
    //console.log(e.target);
    this.setState({
      display: "none",
    });
  };
  render() {
    let showuser = this.state.users.map((e, index) => {
      if (e.username !== this.state.nameOwnerMoment) {
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
      }
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

    let columns = [
      {
        dataField: "stt",
        text: "STT",
        headerStyle: {
          width: "60px",
          height: "60px",
          padding: "15px",
          backgroundColor: "#343a40",
          color: "white",
        },
      },

      {
        dataField: "roomname",
        text: "Roomname",
        headerStyle: {
          width: "220px",
          height: "60px",
          padding: "15px",
          backgroundColor: "#343a40",
          color: "white",
        },
      },
      {
        dataField: "nameleader",
        text: "Name leader",
        headerStyle: {
          width: "150px",
          height: "60px",
          padding: "15px",
          backgroundColor: "#343a40",
          color: "white",
        },
      },
      {
        dataField: "numberofmembers",
        text: "numberOfmembers",
        headerStyle: {
          width: "150px",
          height: "60px",
          padding: "15px",
          backgroundColor: "#343a40",
          color: "white",
        },
      },
      {
        dataField: "datecreate",
        text: "dateCreate",
        headerStyle: {
          height: "30px",
          padding: "15px",
          backgroundColor: "#343a40",
          color: "white",
        },
      },

      {
        dataField: "remove",
        text: "removeRoom",
        headerStyle: {
          width: "200px",
          height: "60px",
          textAlign: "center",
          backgroundColor: "#343a40",
          color: "white",
        },
        style: { textAlign: "center" },
      },
    ];

    let room = [];
    this.state.roomProfile.map(async (element, index) => {
      index = index + 1;
      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };

      let arr = {
        stt: index,
        roomname: element.nameRoom,
        nameleader: (
          <span
            data-toggle="modal"
            data-target="#editOwner"
            className={element._id}
            id={element.nameOwner}
            onClick={this.editOwner}
          >
            {element.nameOwner}
          </span>
        ),
        numberofmembers: (
          <span
            style={{ paddingLeft: "60px" }}
            data-toggle="modal"
            data-target="#showProfile"
            id={element._id}
            onClick={this.showMember}
          >
            {element.members.length}
          </span>
        ),
        datecreate: dates(element.createAt),

        remove: (
          <i
            class="fa fa-times"
            id={element._id}
            onClick={this.removeRooms}
          ></i>
        ),
      };
      return room.push(arr);
    });
    let infor = this.state.inforUser.map((e, index) => {
      return showProfile ? (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>
            <Image
              id="avatar"
              cloudName="phathuynh"
              publicId={e.profile.avatar}
              height="50px"
              width="50px"
            />
          </td>
          <td>{e.username}</td>
          <td>{e.role}</td>
        </tr>
      ) : null;
    });
    return (
      <div>
        <div className="col-9" style={{ float: "right", marginTop: "-320px" }}>
          <BootstrapTable
            keyField="stt"
            data={room}
            columns={columns}
            pagination={pagination}
            // goi event
          />
        </div>
        <div
          class="modal fade"
          // id={this.state.idModal}
          id="showProfile"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content" style={{ height: "400px" }}>
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Thông tin thành viên
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
              <div class="modal-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">avatar</th>
                      <th scope="col">name</th>
                      <th scope="col">role</th>
                    </tr>
                  </thead>
                  <tbody>{infor}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={this.handleBlur}
          class="modal fade"
          // id={this.state.idModal}
          id="editOwner"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content" style={{ height: "400px" }}>
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit Owner
                </h5>

                {/* <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button> */}
              </div>
              <div class="modal-body">
                <div class="row">
                  <h3 style={{ margin: "auto" }}>
                    {this.state.nameOwnerMoment}
                  </h3>
                </div>
                <div className="form-group">
                  <label>Find new Owner : </label>
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
      </div>
    );
  }
}

export default ProfileRoomComponent;

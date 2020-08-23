import React, { Component } from "react";
import { getProfileUser, lockUser } from "./profileStaffFunction";
import jwt_decode from "jwt-decode";
import "./profile-staff.component.css";
import { Image } from "cloudinary-react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const pagination = paginationFactory({
  sizePerPage: 9,
});
class ProfileStaffComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      username: "",
      fullname: "",
      profile: "",
      email: "",
      role: "",
    };
  }
  componentDidMount() {
    const token = localStorage.userToken;
    const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(token);
    getProfileUser(accessToken)
      .then((res) => {
        res.forEach((e) => {
          this.setState({
            users: [...this.state.users, e],
          });
        });
        //console.log(this.state);
      })
      .catch((error) => {
        //console.log(error);
      });
    this.setState({
      accessToken: accessToken,
    });
  }

  //handle click view
  handleClickView = async (event, data) => {
    await this.setState({
      username: data.username,
      fullname: data.fullName,
      profile: data.profile,
      email: data.email,
      role: data.role,
    });
  };

  //handle click lock user
  handleClickLock = async (event, data) => {
    //console.log(data);
    await this.setState({
      idUser: data._id,
      name: data.username,
    });
  };

  lockUser = (event) => {
    event.preventDefault();
    const data = {
      status: "lock",
      idUser: this.state.idUser,
    };
    lockUser(this.state.accessToken, data)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  unLockUser = (event) => {
    event.preventDefault();
    const data = {
      status: "unlock",
      idUser: this.state.idUser,
    };
    lockUser(this.state.accessToken, data)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  render() {
    let columns = [
      {
        dataField: "stt",
        text: "STT",
        headerStyle: {
          width: "60px",
          height: "50px",
          padding: "11px",
          backgroundColor: "#343a40",
          color: "white",
        },
      },

      {
        dataField: "username",
        text: "Username",
        headerStyle: {
          width: "220px",
          height: "50px",
          padding: "11px",
          backgroundColor: "#343a40",
          color: "white",
        },
      },
      {
        dataField: "fullName",
        text: "Full Name",
        headerStyle: {
          width: "220px",
          height: "50px",
          padding: "11px",
          backgroundColor: "#343a40",
          color: "white",
        },
      },
      {
        dataField: "gender",
        text: "Gender",
        headerStyle: {
          width: "100px",
          height: "50px",
          padding: "11px",
          backgroundColor: "#343a40",
          color: "white",
        },
      },
      {
        dataField: "address",
        text: "Address",
        headerStyle: {
          height: "50px",
          padding: "11px",
          backgroundColor: "#343a40",
          color: "white",
        },
      },
      {
        dataField: "view",
        text: "#",
        headerStyle: {
          width: "140px",
          height: "50px",
          textAlign: "center",
          backgroundColor: "#343a40",
          color: "white",
        },
        style: { textAlign: "center" },
      },
    ];

    // array user
    let user = [];

    this.state.users.map(async (element, index) => {
      let arr = {};
      index = index + 1;
      if (element.role === "admin") {
        arr = {
          stt: index,
          username: element.username,
          fullName: element.fullName,
          gender: element.profile.gender,
          address: element.profile.address,
          view: (
            <div style={{ fontSize: "20px", marginLeft: "-37px" }}>
              <button type="button" class="btn btn-success">
                <i
                  class="far fa-eye"
                  data-toggle="modal"
                  data-target="#showProfile"
                  onClick={(event) => this.handleClickView(event, element)}
                ></i>
              </button>
            </div>
          ),
        };
      } else {
        arr = {
          stt: index,
          username: element.username,
          fullName: element.fullName,
          gender: element.profile.gender,
          address: element.profile.address,
          view: (
            <div>
              <button
                type="button"
                class="btn btn-success"
                onClick={(event) => this.handleClickView(event, element)}
                data-toggle="modal"
                data-target="#showProfile"
              >
                <i class="far fa-eye"></i>
              </button>
              <button
                type="button"
                class="btn btn-success ml-1"
                onClick={(event) => this.handleClickLock(event, element)}
                data-toggle="modal"
                data-target="#lockUser"
              >
                <i class="fas fa-user-lock "></i>
              </button>
            </div>
          ),
        };
      }

      return user.push(arr);
    });

    //array account lock aaa
    let lock = [];
    this.state.users.map(async (element, index) => {
      index = index + 1;
      if (element.deletedAt) {
        let arr = {
          stt: index,
          username: element.username,
          fullName: element.fullName,
          gender: element.profile.gender,
          address: element.profile.address,
          view: (
            <div style={{ fontSize: "20px" }}>
              <i
                class="far fa-eye "
                data-toggle="modal"
                data-target="#showProfile"
                onClick={(event) => this.handleClickView(event, element)}
              ></i>
              <i
                class="fas fa-unlock-alt  ml-4"
                data-toggle="modal"
                data-target="#unLockUser"
                onClick={(event) => this.handleClickLock(event, element)}
              ></i>
            </div>
          ),
        };
        return lock.push(arr);
      }
    });

    return (
      <div className="col-9" style={{ float: "right", marginTop: "-320px" }}>
        <ul className="nav nav-tabs mt-3 " role="tablist">
          <li className="nav-item active">
            <a
              className="nav-link "
              data-toggle="tab"
              href="#tabs-1"
              role="tab"
            >
              Profile User
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
              Account Lock
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active" id="tabs-1" role="tabpanel">
            <BootstrapTable
              keyField="stt"
              data={user}
              columns={columns}
              pagination={pagination}
              // goi event
            />
          </div>
          <div className="tab-pane" id="tabs-2" role="tabpanel">
            <BootstrapTable
              keyField="stt"
              data={lock}
              columns={columns}
              pagination={pagination}
              // goi event
            />
          </div>
        </div>
        {/* modal lock user */}
        <div class="modal fade" id="lockUser">
          <div class="modal-dialog ">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">
                  Are you sure to lock user " {this.state.name} "
                </h4>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  // id={target.id}
                  onClick={this.lockUser}
                  data-dismiss="modal"
                >
                  Yes
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  id="modal-btn-no"
                  data-dismiss="modal"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* modal unlock user */}
        <div class="modal fade" id="unLockUser">
          <div class="modal-dialog ">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">
                  Are you sure to unlock user " {this.state.name} "
                </h4>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  // id={target.id}
                  onClick={this.unLockUser}
                  data-dismiss="modal"
                >
                  Yes
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  id="modal-btn-no"
                  data-dismiss="modal"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          // id={this.state.idModal}
          id="showProfile"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content" style={{ height: "400px" }}>
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Thông tin nhân viên
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
                <div className="row">
                  <div class="col-4">
                    <Image
                      id="avatar"
                      cloudName="phathuynh"
                      publicId={this.state.profile.avatar}
                      height="150px"
                      width="150px"
                      borderRadius="100%"
                    />
                  </div>
                  <div class="col-8">
                    <h3>{this.state.role}</h3>
                    <table class="table">
                      <tr>
                        <th>Ten</th>
                        <td>{this.state.username}</td>
                      </tr>
                      <tr>
                        <th>Ho ten day du</th>
                        <td>{this.state.fullname}</td>
                      </tr>
                      <tr>
                        <th>giới tính</th>
                        <td>{this.state.profile.gender}</td>
                      </tr>
                    </table>
                  </div>
                </div>

                <h3>Thong tin lien lac</h3>
                <table class="table">
                  <tr>
                    <th>Email</th>
                    <td>{this.state.email}</td>
                  </tr>
                  <tr>
                    <th>địa chỉ nhà</th>
                    <td>{this.state.profile.address}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileStaffComponent;

import React, { Component } from "react";
import { getProfileUser } from "./profileStaffFunction";
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
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
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

  render() {
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
        dataField: "username",
        text: "Username",
        headerStyle: {
          width: "220px",
          height: "60px",
          padding: "15px",
          backgroundColor: "#343a40",
          color: "white",
        },
      },
      {
        dataField: "fullName",
        text: "Full Name",
        headerStyle: {
          width: "220px",
          height: "60px",
          padding: "15px",
          backgroundColor: "#343a40",
          color: "white",
        },
      },
      {
        dataField: "gender",
        text: "Gender",
        headerStyle: {
          width: "100px",
          height: "60px",
          padding: "15px",
          backgroundColor: "#343a40",
          color: "white",
        },
      },
      {
        dataField: "address",
        text: "Address",
        headerStyle: {
          height: "60px",
          padding: "15px",
          backgroundColor: "#343a40",
          color: "white",
        },
      },
      {
        dataField: "edit",
        text: "#",
        headerStyle: {
          width: "60px",
          height: "60px",
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
      index = index + 1;
      let arr = {
        stt: index,
        username: element.username,
        fullName: element.fullName,
        gender: element.profile.gender,
        address: element.profile.address,
        edit: (
          <i
            class="far fa-eye"
            data-toggle="modal"
            data-target="#showProfile"
            onClick={(event) => this.handleClickView(event, element)}
          ></i>
        ),
      };
      return user.push(arr);
    });

    return (
      <div className="col-9" style={{ float: "right", marginTop: "-238px" }}>
        <BootstrapTable
          keyField="stt"
          data={user}
          columns={columns}
          pagination={pagination}
          // goi event
        />
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

import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { showProfile, updateProfile } from "../profile/profileFunctions";
import AppBarComponent from "../navbar/appBar.component";
class EditProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      username: "",
      fullName: "",
      email: "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",

      address: "",
      avatar: "",
      gender: "",

      role: "",
    };
  }

  componentDidMount() {
    const token = localStorage.userToken;
    const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(token);
    this.setState({
      username: decoded.data.username,
      fullName: decoded.data.fullName,
      email: decoded.data.email,
      accessToken: accessToken,
      _id: decoded.data._id,
    });
    console.log(decoded.data);
    showProfile(decoded.data.username, accessToken)
      .then((res) => {
        this.setState({
          avatar: res.profile.avatar,
          address: res.profile.address,
          gender: res.profile.gender,

          role: res.role,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //handle edit profile
  handleEditProfile = () => {
    showProfile(this.state.username, this.state.accessToken)
      .then((res) => {
        this.setState({
          profile: {
            avatar: res.avatar,
            address: res.address,
            gender: res.gender,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //handle change input
  onHandleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  //handle submit form
  onHandleSubmit = (event) => {
    event.preventDefault();
    const { password, newPassword, confirmNewPassword } = this.state;
    if (password !== "" && newPassword !== "" && confirmNewPassword !== "") {
      if (newPassword !== confirmNewPassword) {
        alert("password dont match");
      } else {
        updateProfile(this.state, this.state.accessToken)
          .then((res) => {
            console.log(res);
            if (res) {
              alert("update success");
              window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <AppBarComponent username={this.state.username} />
        <div className="container">
          <div className="col-5 col-md-3 mb-3"></div>
          <div className="row flex-lg-nowrap">
            <div className="col">
              <div className="row">
                <div className="col mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="e-profile">
                        <div className="row">
                          <div className="col-12 col-sm-auto mb-3">
                            <div className="mx-auto" style={{ width: "140px" }}>
                              <div
                                className="d-flex justify-content-center align-items-center rounded"
                                style={{
                                  height: "140px",
                                  backgroundColor: "rgb(233, 236, 239)",
                                }}
                              >
                                <span
                                  style={{
                                    color: "rgb(166, 168, 170)",
                                    font: "bold 8pt Arial",
                                  }}
                                >
                                  140x140
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                            <div className="text-center text-sm-left mb-2 mb-sm-0">
                              <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                                {this.state.username}
                              </h4>
                              <div className="mt-2">
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                >
                                  <i className="fa fa-fw fa-camera" />
                                  <span>Change Photo</span>
                                </button>
                              </div>
                            </div>
                            <div className="text-center text-sm-right">
                              <span className="badge badge-secondary">
                                {this.state.role}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ul className="nav nav-tabs">
                          <li className="nav-item"></li>
                        </ul>
                        <div className="tab-content pt-3">
                          <div className="tab-pane active">
                            <form
                              className="form"
                              onSubmit={this.onHandleSubmit}
                            >
                              <div
                                className="row"
                                style={{ marginTop: "-10px !important" }}
                              >
                                <div className="col">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="fullName"
                                          placeholder={this.state.fullName}
                                          defaultValue={this.state.fullName}
                                          onChange={this.onHandleChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Username</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="username"
                                          placeholder={this.state.username}
                                          defaultValue={this.state.username}
                                          onChange={this.onHandleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Gender</label>
                                        <input
                                          type="radio"
                                          className="ml-3"
                                          value="Male"
                                          name="gender"
                                          onChange={this.onHandleChange}
                                          checked={this.state.gender === "Male"}
                                        />
                                        Male
                                        <input
                                          type="radio"
                                          className="ml-3"
                                          value="Female"
                                          name="gender"
                                          onChange={this.onHandleChange}
                                          checked={
                                            this.state.gender === "Female"
                                          }
                                        />
                                        Female
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Email</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          defaultValue={this.state.email}
                                          readOnly
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col mb-3">
                                      <div className="form-group">
                                        <label>Address</label>
                                        <textarea
                                          className="form-control"
                                          rows={2}
                                          name="address"
                                          placeholder="3/2 Can Tho"
                                          defaultValue={this.state.address}
                                          onChange={this.onHandleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <ul className="nav nav-tabs">
                                <li className="nav-item"></li>
                              </ul>
                              <div className="row">
                                <div className="col-12 col-sm-6 mb-3">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Current Password</label>
                                        <input
                                          className="form-control"
                                          type="password"
                                          name="password"
                                          placeholder="••••••"
                                          onChange={this.onHandleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>New Password</label>
                                        <input
                                          className="form-control"
                                          type="password"
                                          name="newPassword"
                                          placeholder="••••••"
                                          onChange={this.onHandleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>
                                          Confirm{" "}
                                          <span className="d-none d-xl-inline">
                                            Password
                                          </span>
                                        </label>
                                        <input
                                          className="form-control"
                                          type="password"
                                          name="confirmNewPassword"
                                          placeholder="••••••"
                                          onChange={this.onHandleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col d-flex justify-content-end">
                                  <button
                                    className="btn btn-primary"
                                    type="submit"
                                  >
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-5 col-md-3 mb-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfileComponent;

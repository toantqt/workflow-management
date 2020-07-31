import React, { Component } from "react";
import { getProfileUser } from "./profileStaffFunction";
import jwt_decode from "jwt-decode";
import { times } from "lodash";
class ProfileStaffComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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

  render() {
    return (
      <div className="col-9" style={{ float: "right", marginTop: "-263px" }}>
        <h1>hello</h1>
      </div>
    );
  }
}

export default ProfileStaffComponent;

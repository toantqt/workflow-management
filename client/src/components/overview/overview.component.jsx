import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProfileUser } from "../profile-staff/profileStaffFunction";
import { getListRoom } from "../home/homeFunction";
import jwt_decode from "jwt-decode";
class OverviewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countUser: "",
      countRoom: "",
    };
  }

  componentDidMount() {
    const token = localStorage.userToken;
    const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(token);
    getProfileUser(accessToken)
      .then((res) => {
        let count = res.length;
        this.setState({
          countUser: count,
        });
      })
      .catch((error) => {
        //console.log(error);
      });

    getListRoom(accessToken).then((res) => {
      //console.log(res);
      let count = res.data.getRoom.length;
      this.setState({
        countRoom: count,
      });
      //console.log(this.state);
    });
  }

  render() {
    return (
      <div className="col-9" style={{ float: "right", marginTop: "-268px" }}>
        <h1>Overview</h1>
        <hr />
        <div className="row">
          <div
            className="col-3 ml-3"
            style={{
              backgroundColor: "#33b5e5",
              maxHeight: "100px",
              borderRadius: "5px",
            }}
          >
            <div>
              <Link
                to="/manage/profile"
                style={{ fontSize: "30px", color: "white" }}
              >
                User
              </Link>
            </div>
            <div className="pt-3 pl-3" style={{ fontSize: "20px" }}>
              {this.state.countUser}
            </div>
            <div style={{ float: "right", marginTop: "-30px" }}>
              <i class="fas fa-users fa-3x"></i>
            </div>
          </div>
          <div
            className="col-3 ml-5"
            style={{
              backgroundColor: "#3F729B",
              maxHeight: "100px",
              borderRadius: "5px",
            }}
          >
            <div>
              <Link
                to="/manage/room"
                style={{ fontSize: "30px", color: "white" }}
              >
                Room
              </Link>
            </div>
            <div className="pt-3 pl-3" style={{ fontSize: "20px" }}>
              {this.state.countRoom}
            </div>
            <div style={{ float: "right", marginTop: "-30px" }}>
              <i class="fas fa-layer-group fa-3x"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OverviewComponent;

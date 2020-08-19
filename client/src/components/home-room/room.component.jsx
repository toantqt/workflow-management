import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./room.component.css";

class RoomComponent extends Component {
  render() {
    const listRoomUser = this.props.data.roomUser.map((room, index) => {
      if (!room.deletedAt) {
        return (
          <div className="card" style={{ width: "20rem" }} key={index}>
            <img
              className="card-img-top img-style"
              src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Card image cap"
              style={{ width: "100%", height: "130px" }}
            />
            <div className="card-body" style={{ textAlign: "center" }}>
              <Link
                className="nav-link"
                style={{
                  textDecoration: "none",
                }}
                to={`/room/${room.id}`}
              >
                {room.name}
              </Link>
            </div>
          </div>
        );
      }
    });
    const listRoom = this.props.data.room.map((room, index) => {
      if (!room.deletedAt) {
        return (
          <div className="card" style={{ width: "20rem" }} key={index}>
            <img
              className="card-img-top img-style"
              src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Card image cap"
              style={{ width: "100%", height: "130px" }}
            />
            <div className="card-body" style={{ textAlign: "center" }}>
              <Link
                className="nav-link"
                style={{
                  textDecoration: "none",
                }}
                to={`/room/${room.id}`}
              >
                {room.name}
              </Link>
            </div>
          </div>
        );
      }
    });
    if (this.props.data.role === "staff") {
      return (
        <div className="col-9" style={{ marginTop: " 17px " }}>
          <i className="fas fa-layer-group " style={{ fontSize: "25px" }}></i>{" "}
          &nbsp;
          <span className="title" style={{ fontSize: "25px" }}>
            Department
          </span>
          <div className="row">{listRoomUser}</div>
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: " 17px " }}>
          <i className="fas fa-layer-group "></i> &nbsp;
          <span className="title">Department</span>
          <div className="row">{listRoom}</div>
        </div>
      );
    }
  }
}

export default RoomComponent;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./room.component.css";

class RoomComponent extends Component {
  render() {
    const listRoom = this.props.data.room.map((room, index) => {
      return (
        <div class="card" style={{ width: "20rem" }} key={index}>
          <img
            class="card-img-top"
            src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Card image cap"
            style={{ width: "100%", height: "130px" }}
          />
          <div class="card-body" style={{ textAlign: "center" }}>
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
    });
    return (
      <div className="col-9" style={{ marginTop: " 17px " }}>
        <i className="fas fa-layer-group "></i> &nbsp;
        <span className="title">Department</span>
        <div className="row">{listRoom}</div>
      </div>
    );
  }
}

export default RoomComponent;

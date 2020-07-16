import React, { Component } from "react";

class RoomComponent extends Component {
  render() {
    return (
      <div className="col-9" style={{ marginTop: " 20px " }}>
        <div className="row">
          <div class="card" style={{ width: "18rem" }}>
            <img
              class="card-img-top"
              src="https://i.pinimg.com/originals/83/74/26/837426abe8f706ec88e67f5f663209ed.jpg"
              alt="Card image cap"
              style={{ width: "100%", height: "170px" }}
            />
            <div class="card-body">
              <p class="card-text">test</p>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div class="card" style={{ width: "18rem", marginLeft: "30px" }}>
            <img
              class="card-img-top"
              src="https://i.pinimg.com/originals/83/74/26/837426abe8f706ec88e67f5f663209ed.jpg"
              alt="Card image cap"
              style={{ width: "100%", height: "170px" }}
            />
            <div class="card-body">
              <p class="card-text">test</p>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomComponent;

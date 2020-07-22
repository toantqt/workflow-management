import React, { Component } from "react";
import "./board-task.component.css";
class BoardTaskComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const board = this.props.data.lists.map((e, index) => {
      return (
        <div className="board ml-3" key={index}>
          <h6 style={{ fontSize: "20px" }}>{e.name}</h6>
        </div>
      );
    });

    return (
      <div>
        <hr />
        <div className="title mb-3">
          <i className="fas fa-clipboard-list fa-2x"></i>&nbsp;&nbsp;
          <span style={{ fontSize: "30px" }}>Board</span>
        </div>
        <div className="row">
          {board}
          <div className="board create ml-3">
            <h6 style={{ fontSize: "20px" }}>Create Board</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardTaskComponent;

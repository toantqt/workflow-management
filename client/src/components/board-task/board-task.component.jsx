import React, { Component } from "react";
import "./board-task.component.css";
import ModalListComponent from "./modal-list.component";
import { Link } from "react-router-dom";
class BoardTaskComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const board = this.props.data.lists.map((e, index) => {
      return (
        <div>
          <Link style={{ textDecoration: "none" }} to={`/task/${e._id}`}>
            <div className="board ml-3  mb-5">
              <h6 style={{ fontSize: "20px" }}>{e.name}</h6>
            </div>
          </Link>
        </div>
      );
    });

    //show create board lists
    if (this.props.data.idUser === this.props.data.idStaff) {
      return (
        <div style={{ marginTop: "-25px !important" }}>
          <hr />
          <div className="title mb-3 ">
            <i class="fas fa-clipboard-list fa-2x"></i>&nbsp;&nbsp;
            <span style={{ fontSize: "30px" }}>Board</span>
          </div>
          <div className="row">
            {board}
            <div
              className="board create ml-3"
              data-toggle="modal"
              data-target="#modalList"
            >
              <h6 style={{ fontSize: "20px" }}>Create Board</h6>
            </div>
            <ModalListComponent data={this.props.data} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <hr />
          <div className="title mb-3">
            <i class="fas fa-clipboard-list fa-2x"></i>&nbsp;&nbsp;
            <span style={{ fontSize: "30px" }}>Board</span>
          </div>
          <div className="row">{board}</div>
        </div>
      );
    }
  }
}

export default BoardTaskComponent;

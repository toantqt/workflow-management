import React, { Component } from "react";
import "./board-task.component.css";
import ModalListComponent from "./modal-list.component";
import { Link } from "react-router-dom";
import { deleteList } from "../list-task/listTaskFunction";
class BoardTaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listId: "",
      name: "",
    };
  }
  handleClickDelete = (event, data) => {
    event.preventDefault();

    this.setState({
      name: data.name,
      listId: data._id,
      idTask: this.props.data.idTask,
    });
    //console.log(this.state);
  };

  handleClickDeleteSuccess = async (event, data) => {
    event.preventDefault();
    //console.log(data._id);
    const id = {
      listId: this.state.listId,
      idTask: this.state.idTask,
    };

    //console.log(id);
    await deleteList(this.props.data.accessToken, id)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  render() {
    const board = this.props.data.lists.map((e, index) => {
      if (this.props.data.idStaff === this.props.data.idUser) {
        if (e.status === false) {
          return (
            <div>
              <Link style={{ textDecoration: "none" }} to={`/task/${e._id}`}>
                <div className="board ml-3  mb-5">
                  <i
                    class="fas fa-exclamation  "
                    style={{ color: "red", fontSize: "20px" }}
                  ></i>

                  <h6 style={{ fontSize: "20px" }}>{e.name}</h6>
                  <div
                    style={{
                      float: "right",
                      marginTop: "-90px",
                      marginRight: "-20px",
                      zIndex: "100",
                    }}
                    data-toggle="modal"
                    data-target={"#" + e._id}
                    onClick={(event) => this.handleClickDelete(event, e)} //dang sai cho nay
                  >
                    <i class="fas fa-times"></i>
                  </div>
                </div>
              </Link>
              <div
                class="modal fade"
                tabindex="-1"
                role="dialog"
                aria-labelledby="mySmallModalLabel"
                aria-hidden="true"
                id={this.state.listId}
              >
                <div class="modal-dialog ">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title" id="myModalLabel">
                        Are you sure to delete "{this.state.name}"
                      </h4>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-default"
                        id="modal-btn-si"
                        onClick={(event) =>
                          this.handleClickDeleteSuccess(event, e)
                        }
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
            </div>
          );
        } else {
          return (
            <div>
              <Link style={{ textDecoration: "none" }} to={`/task/${e._id}`}>
                <div className="board ml-3  mb-5">
                  <i
                    class="fas fa-check "
                    style={{ color: "blue", fontSize: "20px" }}
                  ></i>
                  <h6 style={{ fontSize: "20px" }}>{e.name}</h6>
                  <div
                    style={{
                      float: "right",
                      marginTop: "-90px",
                      marginRight: "-20px",
                      zIndex: "100",
                    }}
                    data-toggle="modal"
                    data-target={"#" + e._id}
                    onClick={(event) => this.handleClickDelete(event, e)}
                  >
                    <i class="fas fa-times"></i>
                  </div>
                </div>
              </Link>
              <div
                class="modal fade"
                tabindex="-1"
                role="dialog"
                aria-labelledby="mySmallModalLabel"
                aria-hidden="true"
                id={this.state.listId}
              >
                <div class="modal-dialog ">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title" id="myModalLabel">
                        Are you sure to delete "{this.state.name}"
                      </h4>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-default"
                        id="modal-btn-si"
                        onClick={(event) =>
                          this.handleClickDeleteSuccess(event, e)
                        }
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
            </div>
          );
        }
      } else {
        if (e.status === false) {
          return (
            <div>
              <Link style={{ textDecoration: "none" }} to={`/task/${e._id}`}>
                <div className="board ml-3  mb-5">
                  <i
                    class="fas fa-exclamation  "
                    style={{ color: "red", fontSize: "20px" }}
                  ></i>

                  <h6 style={{ fontSize: "20px" }}>{e.name}</h6>
                </div>
              </Link>
            </div>
          );
        } else {
          return (
            <div>
              <Link style={{ textDecoration: "none" }} to={`/task/${e._id}`}>
                <div className="board ml-3  mb-5">
                  <i
                    class="fas fa-check "
                    style={{ color: "blue", fontSize: "20px" }}
                  ></i>
                  <h6 style={{ fontSize: "20px" }}>{e.name}</h6>
                </div>
              </Link>
            </div>
          );
        }
      }
    });

    //show create board lists
    if (this.props.data.idUser === this.props.data.idStaff) {
      return (
        <div style={{ marginTop: "-10px !important" }}>
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

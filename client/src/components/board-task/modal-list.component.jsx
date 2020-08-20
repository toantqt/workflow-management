import React, { Component } from "react";
import { addListTask } from "../task/taskFunction";
import { createWork } from "../list-task/listTaskFunction";
class ModalListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      note: " ",
      idStaff: this.props.data.idStaff,
      idTask: this.props.data.idTask,
      accessToken: this.props.data.accessToken,
    };
  }

  // handle change input
  onHandleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  //handle submit form
  onHandleSubmit = (event) => {
    event.preventDefault();

    const { title, note } = this.state;
    if (title === "") {
      alert("Please insert name task");
    } else {
      const data = {
        accessToken: this.state.accessToken,
        idTask: this.state.idTask,
        idStaff: this.state.idStaff,
        name: this.state.title,
        note: this.state.note,
      };
      //console.log(data);

      addListTask(data)
        .then((res) => {
          //console.log(res);
        })
        .catch((error) => {
          //console.log(error);
        });
    }
  };

  render() {
    return (
      <div
        className="modal fade"
        id="modalList"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                List Task
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="form">
                <label>Title: </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={this.onHandleChange}
                />
                <label>Notes: </label>
                <input
                  type="text"
                  className="form-control"
                  name="note"
                  onChange={this.onHandleChange}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onHandleSubmit}
                data-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalListComponent;

import React, { Component } from "react";
import "./DnD-task.component.css";
import InputComponent from "./input.component";
import {
  addWork,
  addDoing,
  addDone,
  sendData,
} from "../list-task/listTaskFunction";
class DnDTaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idList: this.props.data.idList,

      data: [],
      inputWork: [],
      inputDoing: [],
      inputDone: [],
      work: "",
      doing: "",
      done: "",
    };
  }

  // componentWillMount() {
  //   this.props.data.lists.forEach((e) => {
  //     this.setState({ data: [...this.state.data, e] });
  //   });
  // }

  handleClick = (status) => {
    if (status === "work") {
      this.setState({ inputWork: [...this.state.inputWork, ""] });
    }
    if (status === "doing") {
      this.setState({ inputDoing: [...this.state.inputDoing, ""] });
    }
    if (status === "done") {
      this.setState({ inputDone: [...this.state.inputDone, ""] });
    }
  };

  //handle close
  handleClose = (status) => {
    if (status === "work") {
      this.setState({ inputWork: [] });
    }
    if (status === "doing") {
      this.setState({ inputDoing: [] });
    }
    if (status === "done") {
      this.setState({ inputDone: [] });
    }
  };

  //handle submit form
  onHandleSubmit = (event, status) => {
    event.preventDefault();
    const data = {
      listId: this.props.data.idList,
      nameWork: this.state.work,
      nameDoing: this.state.doing,
      nameDone: this.state.done,
    };
    //console.log(data);
    if (status === "work") {
      addWork(this.props.data.accessToken, data)
        .then((res) => {
          return window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (status === "doing") {
      addDoing(this.props.data.accessToken, data)
        .then((res) => {
          return window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (status === "done") {
      addDone(this.props.data.accessToken, data)
        .then((res) => {
          return window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //onHandeChange input
  onHandleChange = (event) => {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
    });
  };
  //onDragOver
  onDragOver = (event) => {
    event.preventDefault();
  };
  //onDragStart
  onDragStart = (event, id) => {
    console.log("dragStart: ", id);
    event.dataTransfer.setData("id", id);
  };

  //ondrop
  onDrop = (event, status) => {
    let id = event.dataTransfer.getData("id");

    // console.log("id: " + id);
    // console.log("status: " + status);
    // console.log("props: ", this.props.data);

    let tasks = this.props.data.lists.filter((task) => {
      if (task.name === id) {
        task.status = status;
      }
      //console.log(task);
      return task;
    });
    this.setState({ data: [...this.state.data, tasks] });
  };

  //onHandleClickSubmit
  onHandleClickSubmit = (event) => {
    event.preventDefault();
    const length = this.state.data.length;
    console.log(this.state.data[length - 1]);
    const work = [];
    const doing = [];
    const done = [];
    this.state.data[length - 1].forEach(async (e) => {
      if (e.status === "doing") {
        await doing.push(e);
      } else if (e.status === "work") {
        await work.push(e);
      } else {
        await done.push(e);
      }
    });
    console.log(work);
    console.log(doing);
    console.log(done);
    const data = {
      idList: this.state.idList,
      work: work,
      doing: doing,
      done: done,
    };

    sendData(this.props.data.accessToken, data)
      .then((res) => {
        console.log("done");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const tasks = {
      work: [],
      doing: [],
      done: [],
    };
    console.log("state: ");
    console.log(this.state);

    this.props.data.lists.forEach((element) => {
      tasks[element.status].push(
        <div
          key={element.name}
          onDragStart={(e) => this.onDragStart(e, element.name)}
          draggable
          className="draggable panel-body"
        >
          {element.name}
        </div>
      );
    });
    const inputWork = this.state.inputWork.map((e) => {
      return (
        <div className="panel-body">
          <form onSubmit={(e) => this.onHandleSubmit(e, "work")}>
            <input
              type="text"
              className="form-control"
              name="work"
              onChange={this.onHandleChange}
            />
            <button type="submit" class="btn btn-primary btn-list">
              Add
            </button>
            <button
              class="btn btn-primary ml-2 btn-list"
              onClick={() => this.handleClose("work")}
            >
              <i class="fas fa-times"></i>
            </button>
          </form>
        </div>
      );
    });

    const inputDoing = this.state.inputDoing.map((e) => {
      return (
        <div className="panel-body">
          <form onSubmit={(e) => this.onHandleSubmit(e, "doing")}>
            <input
              type="text"
              className="form-control"
              name="doing"
              onChange={this.onHandleChange}
            />
            <button type="submit" class="btn btn-primary btn-list">
              Add
            </button>
            <button
              class="btn btn-primary ml-2 btn-list"
              onClick={() => this.handleClose("doing")}
            >
              <i class="fas fa-times"></i>
            </button>
          </form>
        </div>
      );
    });

    const inputDone = this.state.inputDone.map((e) => {
      return (
        <div className="panel-body">
          <form onSubmit={(e) => this.onHandleSubmit(e, "done")}>
            <input
              type="text"
              className="form-control"
              name="done"
              onChange={this.onHandleChange}
            />
            <button type="submit" class="btn btn-primary btn-list">
              Add
            </button>
            <button
              class="btn btn-primary ml-2 btn-list"
              onClick={() => this.handleClose("done")}
            >
              <i class="fas fa-times"></i>
            </button>
          </form>
        </div>
      );
    });

    console.log(tasks);
    return (
      <div>
        <div className="row" style={{ margin: "0 auto " }}>
          <div
            className="panel panel-default col-3"
            style={{ marginLeft: "160px" }}
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => {
              this.onDrop(e, "work");
            }}
          >
            <div className="panel-heading">
              <span>Work</span>
              <i
                class="fas fa-pen"
                style={{ float: "right" }}
                onClick={() => this.handleClick("work")}
              ></i>
            </div>
            {tasks.work}

            {inputWork}
          </div>
          <div
            className="panel panel-default col-3 ml-5"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => {
              this.onDrop(e, "doing");
            }}
          >
            <div className="panel-heading">
              <span>Doing</span>
              <i
                class="fas fa-pen"
                style={{ float: "right" }}
                onClick={() => this.handleClick("doing")}
              ></i>
            </div>
            {tasks.doing}
            {inputDoing}
          </div>
          <div
            className="panel panel-default col-3 ml-5"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => {
              this.onDrop(e, "done");
            }}
          >
            <div className="panel-heading">
              <span>Done</span>
              <i
                class="fas fa-pen"
                style={{ float: "right" }}
                onClick={() => this.handleClick("done")}
              ></i>
            </div>
            {tasks.done}
            {inputDone}
          </div>
        </div>

        {/* <button
          type="button"
          className="btn btn-primary btn-list"
          onClick={this.handleSave}
        >
          save
        </button> */}
        <div style={{ float: "right", marginRight: "30px" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onHandleClickSubmit}
          >
            Save Work
          </button>
        </div>
      </div>
    );
  }
}

export default DnDTaskComponent;

import React, { Component } from "react";
import { getList } from "./taskFunction";
import BoardTaskComponent from "../board-task/board-task.component";
class TaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      idTask: "",
      lists: [],
    };
  }

  //handle click event
  handleClick = async (event) => {
    const id = event.target.id;
    await this.setState({
      idTask: id,
      showComponent: true,
      lists: [],
    });

    getList(this.props.accessToken, this.state.idTask).then(async (res) => {
      const arrList = res.list;

      await arrList.forEach(async (e) => {
        await this.setState({
          lists: [
            ...this.state.lists,
            {
              name: e.name,
              idStaff: e.idStaff,
              note: e.note,
              status: e.status,
            },
          ],
        });
        console.log(this.state);
      });
      // await this.setState({
      //   showComponent: true,
      //   lists: [...this.state.lists, {}]
      // });
      console.log(this.state);
    });
  };
  render() {
    let listTask = this.props.data.tasks.map((element, index) => {
      index = index + 1;
      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };

      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{element.inforAuthor.username}</td>
          <td id={element.e._id} onClick={this.handleClick}>
            {element.e.title}
          </td>
          <td>{dates(element.e.start)}</td>
          <td>{dates(element.e.deadline)}</td>
          <td style={{ color: "red" }}>
            <i className="fas fa-exclamation"></i>
          </td>
        </tr>
      );
    });
    return (
      <div className="col-9 mt-4 ">
        <i className="fas fa-list-ol fa-2x"></i> &nbsp;
        <span style={{ fontSize: "30px" }}>Task Assignment</span>
        <ul className="nav nav-tabs mt-3 mb-3" role="tablist">
          <li className="nav-item active">
            <a
              className="nav-link "
              data-toggle="tab"
              href="#tabs-1"
              role="tab"
            >
              Assigned
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
              Finish
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active" id="tabs-1" role="tabpanel">
            <table className="table" id="example">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Author</th>
                  <th scope="col">Work Content</th>
                  <th scope="col">Date Post</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>{listTask}</tbody>
            </table>
          </div>
          <div className="tab-pane" id="tabs-2" role="tabpanel">
            <p>Finish</p>
          </div>
        </div>
        {this.state.showComponent ? (
          <BoardTaskComponent data={this.state} />
        ) : null}
      </div>
    );
  }
}

export default TaskComponent;

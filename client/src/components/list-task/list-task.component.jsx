import React, { Component } from "react";
import AppBarComponent from "../navbar/appBar.component";

import ListSidebarComponent from "../list-sidebar/list-sidebar.component";
import DnDTaskComponent from "../DnD-task/DnD-task.component";
import jwt_decode from "jwt-decode";
import { getDataList } from "../task/taskFunction";
import { createWork } from "./listTaskFunction";
class ListTaskComponent extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: " ",
  //     idList: this.props.id,
  //     listWork: [],
  //     dataList: [],
  //     test: "",
  //   };
  // }
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      idList: this.props.id,
      listWork: [],
      work: [],
      doing: [],
      done: [],
      lists: [],
    };
  }

  componentDidMount() {
    const token = localStorage.userToken;
    const tokenJSON = JSON.parse(localStorage.userToken);
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(token);
    this.setState({
      username: decoded.data.username,
      accessToken: accessToken,
      dataList: [],
      test: "test",
    });

    //show data list task
    getDataList(accessToken, this.state.idList)
      .then(async (res) => {
        //if list work null then create work
        if (res.listWork === null) {
          await createWork(accessToken, this.state.idList).then((res) => {
            console.log("res" + res);
            this.setState({ listWork: [...this.state.listWork, res] });
          });
          console.log(this.state.listWork);
          const list = res.data.list;
          list.forEach((e) => {
            this.setState({ dataList: [...this.state.dataList, e] });
          });
        } else {
          const list = res.data.list;
          list.forEach(async (e) => {
            await this.setState({ dataList: [...this.state.dataList, e] });
          });

          await this.setState({
            listWork: [...this.state.listWork, res.listWork],
          });

          this.state.listWork.forEach(async (e) => {
            await e.lists.forEach((e) => {
              this.setState({
                work: [...this.state.work, e],
                lists: [...this.state.lists, e],
              });
            });

            await e.doing.forEach((e) => {
              this.setState({
                doing: [...this.state.doing, e],
                lists: [...this.state.lists, e],
              });
            });

            await e.done.forEach((e) => {
              this.setState({
                done: [...this.state.done, e],
                lists: [...this.state.lists, e],
              });
            });
          });
        }

        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <AppBarComponent username={this.state.username} />
        hello {this.props.id}
        <DnDTaskComponent data={this.state} />
      </div>
    );
  }
}

export default ListTaskComponent;

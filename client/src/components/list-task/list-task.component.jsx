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
      idUser: decoded.data._id,
      accessToken: accessToken,
      dataList: [],
      test: "test",
    });

    //show data list task
    getDataList(accessToken, this.state.idList)
      .then(async (res) => {
        //if list work null then create work
        //console.log(res.data);
        this.setState({ idStaff: res.data[0].idStaff });
        // if liswork null
        if (res.listWork === null) {
          // set data
          const data = {
            idList: this.state.idList,
            idStaff: res.data[0].idStaff,
          };
          //console.log(data);
          await createWork(accessToken, data).then((res) => {
            //console.log("res" + res);
            this.setState({ listWork: [...this.state.listWork, res] });
          });
          //console.log(this.state.listWork);
          const list = res.data;
          list.forEach((e) => {
            this.setState({
              dataList: [...this.state.dataList, e],
            });
          });
        } else {
          //set state idStaff
          this.setState({ idStaff: res.data[0].idStaff });
          const list = res.data;
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

        //console.log(this.state);
      })
      .catch((error) => {
        //console.log(error);
      });
  }
  render() {
    return (
      <div
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
          height: "840px",
        }}
      >
        <AppBarComponent username={this.state.username} />
        <div style={{ marginTop: "60px" }}>
          <DnDTaskComponent data={this.state} />
        </div>
      </div>
    );
  }
}

export default ListTaskComponent;

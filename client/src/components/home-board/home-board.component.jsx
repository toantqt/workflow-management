import React, { Component } from "react";
import { Link } from "react-router-dom";
class HomeBoardComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const result = [
      ...new Map(this.props.data.boardUser.map((o) => [o._id, o])).values(),
    ];
    const list = [];

    result.forEach((e) => {
      e.list.map((l) => {
        return list.push(l);
      });
    });
    const listBoardUser = list.map((e, index) => {
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
    });

    //console.log(list);

    return (
      <div style={{ marginTop: "40px" }}>
        <i class="fas fa-clipboard-list ml-3" style={{ fontSize: "30px" }}></i>
        &nbsp;&nbsp;
        <span className="title" style={{ fontSize: "25px" }}>
          Board Present
        </span>
        <div className="row ml-3 mt-3">{listBoardUser}</div>
      </div>
    );
  }
}

export default HomeBoardComponent;

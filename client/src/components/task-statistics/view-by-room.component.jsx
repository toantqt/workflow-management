import React, { Component } from "react";

class ViewByRoomComponent extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = async (event) => {
    const value = event.target.value;
    await this.setState({
      select: value,
    });
    console.log(this.state);
  };
  render() {
    let columns = [
      {
        dataField: "stt",
        text: "STT",
        headerStyle: { width: "60px" },
      },

      {
        dataField: "idStaff",
        text: "Author",
        headerStyle: { width: "120px" },
      },
      { dataField: "title", text: "Work Content" },
      { dataField: "createAt", text: "Date Post" },
      { dataField: "deadline", text: "Deadline" },
      {
        dataField: "status",
        text: "Status",
        headerStyle: { width: "60px" },
        style: { textAlign: "center" },
      },
    ];
    const option = this.props.data.dataRoom.map((e, index) => {
      return <option value={e._id}>{e.nameRoom}</option>;
    });
    return (
      <div>
        <div className="col-3 float-right">
          <select
            class="custom-select"
            id="gender2"
            style={{ height: "32px", fontSize: "16px" }}
            onChange={this.handleChange}
          >
            {option}
          </select>
        </div>
        <div style={{ paddingTop: "40px" }}>
          <ul
            class="nav nav-tabs justify-content-center"
            id="myTab"
            role="tablist"
          ></ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="tabs-1"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              ...
            </div>
            <div
              class="tab-pane fade"
              id="tabs-2"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              ...
            </div>
            <div
              class="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              ...
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewByRoomComponent;

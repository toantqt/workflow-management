import React, { Component } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
class BarChartComponent extends Component {
  render() {
    //console.log(this.props);
    const taskLength = this.props.data.dataTask.length;

    let doneLength = 0;

    this.props.data.dataTask.forEach(async (e, index) => {
      if (e.status === true) {
        doneLength++;
      }
    });
    let lateLength = taskLength - doneLength;

    return (
      <div style={{ width: "90%", marginTop: "50px", marginLeft: "50px" }}>
        <div style={{ width: "50%", float: "left" }}>
          <Bar
            data={{
              labels: ["All Task", "Task Done", "Task Late"],
              datasets: [
                {
                  backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
                  data: [taskLength, doneLength, lateLength, 0],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: {
                display: true,
                text: "Task Statistics",
              },
            }}
          />
        </div>
        <div style={{ width: "50%", float: "left" }}>
          <Doughnut
            data={{
              labels: ["Task Done", "Task Late"],
              datasets: [
                {
                  label: "Population (millions)",
                  backgroundColor: ["#8e5ea2", "#3cba9f"],
                  data: [doneLength, lateLength],
                },
              ],
            }}
            option={{
              title: {
                display: true,
                text: "Predicted world population (millions) in 2050",
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default BarChartComponent;

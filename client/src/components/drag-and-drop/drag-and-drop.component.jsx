import React, { Component } from "react";
import "./drag-and-drop.component.css";
class DragAndDropComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { name: "Learn Angular", category: "wip", bgcolor: "yellow" },
        { name: "React", category: "wip", bgcolor: "pink" },
        { name: "Vue", category: "wip", bgcolor: "blue" },
      ],
    };
  }

  //on drag start
  onDragStart = (event, id) => {
    //console.log("dragstart: ", id);
    event.dataTransfer.setData("id", id);
  };
  //on drag over
  onDragOver = (event) => {
    event.preventDefault();
  };

  //on drop
  onDrop = (event, cat) => {
    let id = event.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter((task) => {
      if (task.name == id) {
        task.category = cat;
      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks,
    });
  };
  render() {
    const tasks = {
      wip: [],
      complete: [],
    };
    this.state.tasks.forEach((t) => {
      tasks[t.category].push(
        <div
          key={t.name}
          onDragStart={(e) => this.onDragStart(e, t.name)}
          draggable
          className="draggable"
          style={{ backgroundColor: t.bgcolor }}
        >
          {t.name}
        </div>
      );
    });
    return (
      <div className="container-drag">
        <h1>Drag and Drop demo</h1>
        <div
          className="wip"
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => {
            this.onDrop(e, "wip");
          }}
        >
          <span className="task-header">WIP</span>
          {tasks.wip}
        </div>
        <div
          className="droppable"
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, "complete")}
        >
          <span className="task-header">COMPLETED</span>
          {tasks.complete}
        </div>
      </div>
    );
  }
}

export default DragAndDropComponent;

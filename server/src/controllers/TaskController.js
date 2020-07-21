const Task = require("../helpers/task.helper");

const roomModel = require("../models/roomModel");
const userModel = require("../models/userModel");
const taskModel = require("../models/taskModel");
const debug = console.log.bind(console);

const addTask = async (req, res) => {
  try {
    let data = {
      roomId: req.body.roomId,
      title: req.body.title,
      idStaff: req.body.idStaff,
      deadline: req.body.deadline,
    };
    debug("den dc day");
    let saveTask = await Task.addTask(data);
    console.log("saveTask: " + saveTask);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "add task failed",
    });
  }
};

module.exports = { addTask: addTask };

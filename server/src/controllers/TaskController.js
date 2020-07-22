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

// add listtask in task
const addListTask = async (req, res) => {
  try {
    let idTask = req.body.idTask;
    let data = {
      name: req.body.name,
      idStaff: req.body.idStaff,
      status: req.body.status,
      note: req.body.note,
    };

    debug(data.name + idTask);

    //save list to db
    let saveListTask = await taskModel.addListTask(idTask, data);
    if (saveListTask) {
      return res.status(200).json(saveListTask);
    }
    console.log("error");
  } catch (error) {
    res.status(500).json({ message: "add list failed" });
  }
};

//get list task in tasks
const getListTask = async (req, res) => {
  try {
    const idTask = req.params.idTask;

    let getDataList = await taskModel.getDataList(idTask);
    console.log(getDataList);
    return res.status(200).json(getDataList);
  } catch (error) {
    return res.status(500).json({ message: "get list failed" });
  }
};

module.exports = {
  addTask: addTask,
  addListTask: addListTask,
  getListTask: getListTask,
};

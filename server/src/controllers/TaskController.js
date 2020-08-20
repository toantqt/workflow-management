const Task = require("../helpers/task.helper");

const roomModel = require("../models/roomModel");
const userModel = require("../models/userModel");
const taskModel = require("../models/taskModel");
const listModel = require("../models/listTaskModel");
const { copySync } = require("fs-extra");
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
    //console.log("saveTask: " + saveTask);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "add task failed",
    });
  }
};

//update data task
const updateTask = async (req, res) => {
  try {
    let data = {
      idTask: req.body.idTask,
      title: req.body.title,
      deadline: req.body.deadline,
    };
    //console.log(data);
    await taskModel.updateTask(data);
    return res.status(200).json({ message: "update task successfully" });
  } catch (error) {
    return res.status(500).json({ message: "update task failed" });
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
    //console.log("error");
  } catch (error) {
    res.status(500).json({ message: "add list failed" });
  }
};

//get list task in tasks
const getListTask = async (req, res) => {
  try {
    const idTask = req.params.idTask;
    let bl = false;
    let getDataList = await taskModel.getListTask(idTask);
    // getDataList.forEach(async (e) => {
    //   if (e.list.status) {
    //     bl = true;
    //   } else {
    //     bl = false;
    //   }
    // });
    // if (bl) {
    //   // await taskModel.updateStatus(idTask, bl);
    //   //console.log("alo");
    // } else {
    //   //console.log("ooo");
    //   //  await taskModel.updateStatus(idTask, bl);
    // }
    //console.log("alalsadsa");
    //console.log(getDataList);
    return res.status(200).json(getDataList);
  } catch (error) {
    return res.status(500).json({ message: "get list failed" });
  }
};

//get data list task in List
const getDataList = async (req, res) => {
  try {
    const idList = req.params.idList;
    //console.log("idList " + idList);
    //console.log(idList);
    //get data in list (task model)
    //and get list work in (listTaskmodel)
    const data = await taskModel.getDataList(idList);
    //console.log(data);
    const listWork = await listModel.getWork(idList);
    return res.status(200).json({ data: data, listWork: listWork });
  } catch (error) {
    return res.status(500).json({ message: "not data in list" });
  }
};

//get board of user show in home
const getBoardUser = async (req, res) => {
  try {
    const data = {
      idUser: req.body.idUser,
      roomId: req.body.roomId,
    };
    const listBoard = await taskModel.getBoardUser(data);
    return res.status(200).json(listBoard);
  } catch (error) {
    return res.status(500).json({ message: "get board user failed" });
  }
};

const taskStatistic = async (req, res) => {
  try {
    const getDataRoom = await roomModel.getRoom();
    const getDataTask = await taskModel.getAllTask();
    const getDataUser = await userModel.getAllUser();

    return res.status(200).json({
      dataRoom: getDataRoom,
      dataTask: getDataTask,
      dataUser: getDataUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "task statistic failed" });
  }
};

const viewByMonth = async (req, res) => {
  try {
    //console.log(req.body.data);
  } catch (error) {
    return res.status(500).json({ message: "view month failed" });
  }
};

module.exports = {
  addTask: addTask,
  updateTask: updateTask,
  addListTask: addListTask,
  getListTask: getListTask,
  getDataList: getDataList,
  getBoardUser: getBoardUser,
  taskStatistic: taskStatistic,
  viewByMonth: viewByMonth,
};

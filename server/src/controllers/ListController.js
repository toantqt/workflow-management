const listModel = require("../models/listTaskModel");
const debug = console.log.bind(console);

const createWork = async (req, res) => {
  try {
    const data = { listId: req.body.listId };

    let saveWork = await listModel.createWork(data);
    return res.status(200).json(saveWork);
  } catch (error) {
    return res.status(500).json({ message: "save work failed" });
  }
};

const addWork = async (req, res) => {
  try {
    const data = {
      listId: req.body.listId,
      name: req.body.name,
      note: req.body.note,
    };
    console.log(data);
    const saveData = await listModel.addWork(data);
    console.log(saveData);
    return res.status(200).json(saveData);
  } catch (error) {
    return res.status(500).json({ message: "add work failed" });
  }
};

const addDoing = async (req, res) => {
  try {
    const data = {
      listId: req.body.listId,
      name: req.body.name,
      note: req.body.note,
    };
    console.log(data);
    const saveData = await listModel.addDoing(data);
    console.log(saveData);
    return res.status(200).json(saveData);
  } catch (error) {
    return res.status(500).json({ message: "add doing failed" });
  }
};

const addDone = async (req, res) => {
  try {
    const data = {
      listId: req.body.listId,
      name: req.body.name,
      note: req.body.note,
    };
    console.log(data);
    const saveData = await listModel.addDone(data);
    console.log(saveData);
    return res.status(200).json(saveData);
  } catch (error) {
    return res.status(500).json({ message: "add done failed" });
  }
};

const doingWork = async (req, res) => {
  try {
    const data = {
      _id: req.body._id,
      workId: req.body.workId,
      name: req.body.name,
      note: req.body.note,
    };
    const saveData = await listModel.doingWork(data);
    console.log(saveData);
    return res.status(200).json(saveData);
  } catch (error) {
    return res.status(500).json({ message: "push doing work failed" });
  }
};

const doingToList = async (req, res) => {
  try {
    const data = {
      _id: req.body._id,
      workId: req.body.workId,
      name: req.body.name,
      note: req.body.note,
    };
    const saveData = await listModel.doingToList(data);
    console.log(saveData);
    return res.status(200).json(saveData);
  } catch (error) {
    return res.status(500).json({ message: "update list failed " });
  }
};

const doingToDone = async (req, res) => {
  try {
    const data = {
      _id: req.body._id,
      workId: req.body.workId,
      name: req.body.name,
      note: req.body.note,
    };
    const saveData = await listModel.doingToDone(data);
    console.log(saveData);
    return res.status(200).json(saveData);
  } catch (error) {
    return res.status(500).json({ message: "update list failed " });
  }
};

const doneToDoing = async (req, res) => {
  try {
    const data = {
      _id: req.body._id,
      workId: req.body.workId,
      name: req.body.name,
      note: req.body.note,
    };
    const saveData = await listModel.doneToDoing(data);
    console.log(saveData);
    return res.status(200).json(saveData);
  } catch (error) {
    return res.status(500).json({ message: "update list failed " });
  }
};

const listToDone = async (req, res) => {
  try {
    const data = {
      _id: req.body._id,
      workId: req.body.workId,
      name: req.body.name,
      note: req.body.note,
    };
    const saveData = await listModel.listToDone(data);
    console.log(saveData);
    return res.status(200).json(saveData);
  } catch (error) {
    return res.status(500).json({ message: "update list failed " });
  }
};

const doneToList = async (req, res) => {
  try {
    const data = {
      _id: req.body._id,
      workId: req.body.workId,
      name: req.body.name,
      note: req.body.note,
    };
    const saveData = await listModel.doneToList(data);
    console.log(saveData);
    return res.status(200).json(saveData);
  } catch (error) {
    return res.status(500).json({ message: "update list failed " });
  }
};

const updateListTask = async (req, res) => {
  try {
    console.log("hahahah");
  } catch (error) {
    return res.status(500).json({ message: "update list failed" });
  }
};
module.exports = {
  createWork: createWork,
  addWork: addWork,
  addDoing: addDoing,
  addDone: addDone,
  doingWork: doingWork,
  doingToList: doingToList,
  doingToDone: doingToDone,
  doneToDoing: doneToDoing,
  listToDone: listToDone,
  doneToList: doneToList,
  updateListTask: updateListTask,
};

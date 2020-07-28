const listModel = require("../models/listTaskModel");
const debug = console.log.bind(console);
const lodash = require("lodash");
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

//mang chung
let respectiveArray = (ArrayNew, ArrayOld) => {
  let Array = [];
  ArrayNew.forEach(async (ele) => {
    //console.log(ele._id);
    ArrayOld.forEach(async (e) => {
      if (ele._id == e._id) {
        // console.log(e);
        Array.push(ele);
      }
    });
  });
  return Array;
};

// mang rieng New
let differentArrayNew = (ArrayNew, ArrayOld) => {
  let Array = [];
  let bl = false;
  for (let i = 0; i < ArrayNew.length; i++) {
    // console.log(ArrayNew[i]);
    for (let j = 0; j < ArrayOld.length; j++) {
      if (ArrayNew[i]._id == ArrayOld[j]._id) {
        bl = false;
        break;
      } else {
        bl = true;
      }
    }
    if (bl) {
      Array.push(ArrayNew[i]);
    }
    bl = false;
  }
  return Array;
};

let updataListTask = async (req, res) => {
  try {
    // console.log(req.body);
    let workNew = req.body.data.work;
    let doingNew = req.body.data.doing;
    let doneNew = req.body.data.done;
    //console.log(workNew);
    let getDataListTask = await listModel.getWork(req.body.data.idList);
    if (getDataListTask) {
      if (workNew.length === 0) {
        console.log("pull");
      } else {
        let Array = respectiveArray(workNew, getDataListTask.lists);
        let differentArray = differentArrayNew(workNew, getDataListTask.lists);

        console.log(Array);
        console.log(differentArray);
      }
    }
    return res.status(200).json({ message: "dones" });
  } catch (error) {
    return res.status(500).json({ message: "update list failed " });
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

  updataListTask: updataListTask,
};

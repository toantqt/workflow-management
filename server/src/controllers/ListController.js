const listModel = require("../models/listTaskModel");
const taskModel = require("../models/taskModel");
//const debug = //console.log.bind(console);
const lodash = require("lodash");
const createWork = async (req, res) => {
  try {
    const data = {
      listId: req.body.data.idList,
      idStaff: req.body.data.idStaff,
    };
    //console.log(data);

    let saveWork = await listModel.createWork(data);
    return res.status(200).json(saveWork);
  } catch (error) {
    return res.status(500).json({ message: "save work failed" });
  }
};

const addWorkToDo = async (req, res) => {
  try {
    const data = {
      id: req.body.data.id,
      idList: req.body.data.idList,
      name: req.body.data.nameWorkToDo,
      status: req.body.data.status,
    };

    //console.log(data);
    const pushWorkToDo = await listModel.addWorkToDo(data, data.status);
    return res.status(200).json({ data: pushWorkToDo });
  } catch (error) {
    return res.status(500).json({ message: "add work to do failed" });
  }
};

const workToDo = async (req, res) => {
  try {
    const data = {
      id: req.body.data.id,
      status: req.body.data.status,
    };

    let list = [];

    const getWorkToDo = await listModel.workToDo(data);

    if (data.status === "work") {
      getWorkToDo.lists.forEach((e) => {
        if (e._id == data.id) {
          e.note.forEach(async (eNote) => {
            await list.push(eNote);
          });
        }
      });
    } else if (data.status === "doing") {
      getWorkToDo.doing.forEach((e) => {
        if (e._id == data.id) {
          e.note.forEach(async (eNote) => {
            await list.push(eNote);
          });
        }
      });
    } else {
      getWorkToDo.done.forEach((e) => {
        if (e._id == data.id) {
          e.note.forEach(async (eNote) => {
            await list.push(eNote);
          });
        }
      });
    }
    return res.status(200).json({ data: list });
  } catch (error) {
    return res.status(500).json({ message: "get work to do failed" });
  }
};
const addWork = async (req, res) => {
  try {
    const data = {
      listId: req.body.listId,
      name: req.body.name,
    };
    //console.log(data);
    await taskModel.updateStatusListTask(req.body.listId, false);
    const saveData = await listModel.addWork(data);
    //console.log(saveData);
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
    };
    //console.log(data);
    await taskModel.updateStatusListTask(req.body.listId, false);
    const saveData = await listModel.addDoing(data);
    //console.log(saveData);
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
    };
    //console.log(data);
    const saveData = await listModel.addDone(data);
    //console.log(saveData);
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
    };
    const saveData = await listModel.doingWork(data);
    //console.log(saveData);
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
    };
    const saveData = await listModel.doingToList(data);
    //console.log(saveData);
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
    };
    const saveData = await listModel.doingToDone(data);
    //console.log(saveData);
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
    };
    const saveData = await listModel.doneToDoing(data);
    //console.log(saveData);
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
    };
    const saveData = await listModel.listToDone(data);
    //console.log(saveData);
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
    };
    const saveData = await listModel.doneToList(data);
    //console.log(saveData);
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
        //console.log(e);
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
  if (ArrayOld.length === 0) {
    ArrayNew.forEach((e) => {
      Array.push(e);
    });
  }
  for (let i = 0; i < ArrayNew.length; i++) {
    //console.log(ArrayNew[i]);
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

//mang rieng Old
let differentArrayOld = (ArrayNew, ArrayOld) => {
  let Array = [];
  let bl = false;
  // khi New null thi push het mangr old vao array
  if (ArrayNew.length === 0) {
    ArrayOld.forEach((e) => {
      Array.push(e);
    });
  }
  for (let i = 0; i < ArrayOld.length; i++) {
    //console.log(ArrayNew[i]);
    for (let j = 0; j < ArrayNew.length; j++) {
      if (ArrayOld[i]._id == ArrayNew[j]._id) {
        bl = false;
        break;
      } else {
        bl = true;
      }
    }
    if (bl) {
      Array.push(ArrayOld[i]);
    }
    bl = false;
  }
  return Array;
};

let updataListTask = async (req, res) => {
  try {
    //console.log(req.body);
    let workNew = req.body.data.work;
    let doingNew = req.body.data.doing;
    let doneNew = req.body.data.done;
    //console.log(workNew);
    let getDataListTask = await listModel.getWork(req.body.data.idList);

    if (getDataListTask) {
      if (workNew.length === 0) {
        const pullWork = await listModel.pullWork(
          req.body.data.idList,
          getDataListTask.lists
        );
      } else {
        // let Array = respectiveArray(workNew, getDataListTask.lists);
        let differentArrayN = differentArrayNew(workNew, getDataListTask.lists);
        let differentArrayO = differentArrayOld(workNew, getDataListTask.lists);
        //console.log(differentArrayO);
        //console.log(differentArrayN);
        if (differentArrayO.length !== 0) {
          //console.log("OOO");
          let Array = differentArrayO.map((e) => {
            return { id: e._id, status: e.status };
          });

          Array.forEach(async (e) => {
            await listModel.updataOld(e, req.body.data.idList);
            //console.log("done");
          });
        }
        if (differentArrayN.length !== 0) {
          //console.log("NNN");
          differentArrayN.forEach(async (e) => {
            await listModel.updataNew(e, req.body.data.idList);
            //console.log("done");
          });
        }
      }

      //doing
      if (doingNew.length === 0) {
        const pullDoing = await listModel.pullWork(
          req.body.data.idList,
          getDataListTask.doing
        );
      } else {
        // let Array = respectiveArray(workNew, getDataListTask.lists);
        let differentArrayN = differentArrayNew(
          doingNew,
          getDataListTask.doing
        );
        let differentArrayO = differentArrayOld(
          doingNew,
          getDataListTask.doing
        );
        //console.log(differentArrayO);
        //console.log(differentArrayN);
        if (differentArrayO.length !== 0) {
          //console.log("OOO");
          let Array = differentArrayO.map((e) => {
            return { id: e._id, status: e.status };
          });

          Array.forEach(async (e) => {
            await listModel.updataOld(e, req.body.data.idList);
            //console.log("done");
          });
        }
        if (differentArrayN.length !== 0) {
          //console.log("NNN");
          differentArrayN.forEach(async (e) => {
            await listModel.updataNew(e, req.body.data.idList);
            //console.log("done");
          });
        }
      }

      //done
      if (doneNew.length === 0) {
        const pullDone = await listModel.pullWork(
          req.body.data.idList,
          getDataListTask.done
        );
      } else {
        // let Array = respectiveArray(workNew, getDataListTask.lists);
        let differentArrayN = differentArrayNew(doneNew, getDataListTask.done);
        let differentArrayO = differentArrayOld(doneNew, getDataListTask.done);
        //console.log(differentArrayO);
        //console.log(differentArrayN);
        if (differentArrayO.length !== 0) {
          //console.log("OOO");
          let Array = differentArrayO.map((e) => {
            return { id: e._id, status: e.status };
          });

          Array.forEach(async (e) => {
            await listModel.updataOld(e, req.body.data.idList);
            //console.log("done");
          });
        }
        if (differentArrayN.length !== 0) {
          //console.log("NNN");
          differentArrayN.forEach(async (e) => {
            await listModel.updataNew(e, req.body.data.idList);
            //console.log("done");
          });
        }
      }
    }
    if (doneNew.length !== 0 && workNew.length === 0 && doingNew.length === 0) {
      //console.log(req.body.data.idList);
      await taskModel.updateStatusListTask(req.body.data.idList, true);

      return res.status(200).json({ message: "donelist" });
    } else {
      await taskModel.updateStatusListTask(req.body.data.idList, false);
    }
    return res.status(200).json({ message: "dones" });
  } catch (error) {
    return res.status(500).json({ message: "update list failed " });
  }
};

const deleteList = async (req, res) => {
  try {
    const listId = req.body.id.listId;
    const idTask = req.body.id.idTask;
    //console.log("listId " + listId);
    //console.log("idTask " + idTask);
    debug("aaaa");
    await listModel.deleteList(listId);

    await taskModel.deleteList(idTask, listId);
    return res.status(200).json(listModel);
  } catch (error) {
    return res.status(500).json({ message: "delete list failed " });
  }
};
module.exports = {
  createWork: createWork,
  addWorkToDo: addWorkToDo,
  workToDo: workToDo,
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
  deleteList: deleteList,
};

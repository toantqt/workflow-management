const taskModel = require("../models/taskModel");
const debug = console.log.bind(console);

let addTask = (data) => {
  debug("hahah");
  return new Promise(async (resolve, reject) => {
    try {
      //save task
      await taskModel.createNew(data);
      return resolve("add task successfully");
    } catch (error) {
      return reject("create task failed");
    }
  });
};

module.exports = {
  addTask: addTask,
};

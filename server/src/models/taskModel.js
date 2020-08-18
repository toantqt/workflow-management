const mongoose = require("mongoose");
const debug = console.log.bind(console);
let Schema = mongoose.Schema;
let taskSchema = new Schema(
  {
    roomId: String,
    title: { type: String },
    list: [
      {
        name: String,
        status: { type: Boolean, default: false },
        idStaff: String,
        note: { type: String, default: "" },
      },
    ],
    idStaff: String,
    start: { type: Date, default: Date.now },
    deadline: { type: Date, default: null },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

taskSchema.statics = {
  //add task to db
  createNew(item) {
    return this.create(item);
  },

  //update task
  updateTask(data) {
    return this.findByIdAndUpdate(
      { _id: data.idTask },
      { title: data.title, deadline: data.deadline },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
  deleteList(idTask, listId) {
    return this.findByIdAndUpdate(
      { _id: idTask },
      {
        $pull: {
          list: { _id: listId },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
  //show task in room
  getTaskRoom(id) {
    return this.find({ roomId: id }).exec();
  },
  getAllTask() {
    return this.find().exec();
  },

  //add list in task
  addListTask(idTask, data) {
    return this.findByIdAndUpdate(
      { _id: idTask },
      {
        $push: {
          list: {
            name: data.name,
            idStaff: data.idStaff,
            status: data.status,
            note: data.note,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },

  //get data List
  getListTask(idTask) {
    return this.findOne({ _id: idTask }).exec();
  },

  getDataList(idList) {
    return this.find({ list: { $elemMatch: { _id: idList } } }).exec();
  },

  //get list of user in task
  getBoardUser(data) {
    return this.find({
      $and: [
        { roomId: data.roomId },
        { list: { $elemMatch: { idStaff: data.idUser } } },
      ],
    }).exec();
  },

  getTaskUser(data) {
    return this.find({ list: { $elemMatch: { idStaff: data.idUser } } }).exec();
  },

  updateStatusListTask(id, bl) {
    return this.findOneAndUpdate(
      { "list._id": id },
      { $set: { "list.$.status": bl } }
    ).exec();
  },
  updateStatus(id, bl) {
    return this.findOneAndUpdate({ _id: id }, { $set: { status: bl } }).exec();
  },
};

module.exports = mongoose.model("Task", taskSchema);

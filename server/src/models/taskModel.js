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

  //show task in room
  getTaskRoom(id) {
    return this.find({ roomId: id }).exec();
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

  getDataList(idTask) {
    return this.findOne({ _id: idTask }).exec();
  },
};

module.exports = mongoose.model("Task", taskSchema);

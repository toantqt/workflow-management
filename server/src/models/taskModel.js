const mongoose = require("mongoose");

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

  getTaskRoom(id) {
    return this.find({ roomId: id }).exec();
  },
};

module.exports = mongoose.model("Task", taskSchema);

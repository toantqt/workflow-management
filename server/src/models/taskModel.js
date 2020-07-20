const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let taskSchema = new Schema(
  {
    roomId: String,
    title: { type: String },
    list: [
      {
        name: String,
        key: Boolean,
        default: false,
      },
    ],
    idStaff: { type: String },
    note: { type: String },
    start: { type: Date, default: Date.now },
    deadline: { type: Date, default: null },
    done: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

module.exports = mongoose.model("Task", taskSchema);

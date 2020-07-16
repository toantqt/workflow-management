const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let manageStaffSchema = new Schema(
  {
    idManager: {
      type: String,
      ref: "userModel",
    },
    idStaff: {
      type: String,
      ref: "userModel",
    },
    salary: { type: String },
    dayOff: { type: Number, default: null },
    note: { type: String },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

module.exports = mongoose.model("Managestaff", manageStaffSchema);

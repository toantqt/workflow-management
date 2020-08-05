const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wageSchema = new Schema(
  {
    rankWage: { type: String, default: "staff" },
    workDay: { type: String },
    offDay: { type: String, default: "" },
    wageOt: { type: String },
    typeWage: { type: String },
    allowAnce: { type: String, default: "" },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

module.exports = mongoose.model("wage", wageSchema);

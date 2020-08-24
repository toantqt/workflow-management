const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wageSchema = new Schema(
  {
    rankWage: { type: String, default: "staff" },
    workDay: { type: Number, default: 20 },
    wageOt: { type: Number },
    typeWage: { type: Number },
    allowAnce: { type: String, default: "" },
    userId: { type: String },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
wageSchema.statics = {
  createNew(item) {
    return this.create(item); //tao ban
  },
  getWates(userid) {
    return this.findOne({ userId: userid }).exec();
  },
  upDateSalary(id, data) {
    return this.findByIdAndUpdate(id, data).exec();
  },
};
module.exports = mongoose.model("wage", wageSchema);

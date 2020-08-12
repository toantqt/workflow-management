const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeKeepingModel = new Schema(
  {
    userId: { type: String, default: "" },
    wageId: { type: String, default: "" },
    monthYear: { type: String, default: "" },
    weekInMonth: { type: String, default: "" },
    countTime: { type: Number, default: 0 },
    checkedOneWeek: [
      {
        dayOfWeek: { type: Number },
        morning: { type: Boolean, default: false },
        afternoon: { type: Boolean, default: false },
        OT: { type: Boolean, default: false },
        createdAt: { type: Number, default: Date.now },
      },
    ],
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
timeKeepingModel.statics = {
  createNew(item) {
    return this.create(item); //tao ban
  },
  CheckCreate(user, monthY, weekM) {
    return this.findOne({
      $and: [
        { userId: user },
        { monthYear: { $regex: new RegExp(monthY, "i") } }, // regex mongo tim key gan vs keyword nhat
        { weekInMonth: { $regex: new RegExp(weekM, "i") } },
        // { monthYear: monthY },
        // { weekInMonth: weekM },
      ],
    }).exec();
  },
  updateCheckTime(id, toDay, Session) {
    if (Session === "sang") {
      return this.update(
        {
          $and: [
            { _id: id },
            { checkedOneWeek: { $elemMatch: { dayOfWeek: toDay } } },
          ],
        },
        { $set: { "checkedOneWeek.$.morning": true } }
      ).exec();
    }
    if (Session === "chieu") {
      return this.update(
        {
          $and: [
            { _id: id },
            { checkedOneWeek: { $elemMatch: { dayOfWeek: toDay } } },
          ],
        },
        { $set: { "checkedOneWeek.$.afternoon": true } }
      ).exec();
    }
  },
  updateCountTime(id, count) {
    return this.update({ _id: id }, { countTime: count }).exec();
  },
  getTimekeeping(id, Time) {
    return this.find({
      $and: [{ userId: id }, { monthYear: { $regex: new RegExp(Time, "i") } }],
    }).exec();
  },
};
module.exports = mongoose.model("TimeKeeping", timeKeepingModel);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeKeepingModel = new Schema(
  {
    userId: { type: String, default: "" },
    wageId: { type: String, default: "" },
    monthYear: { type: String, default: "" },
    weekInMonth: { type: String, default: "" },
    countTime: { type: Number, default: 0 },
    countTimeOT: { type: Number, default: 0 }, // Ot
    countTimeNotWork: { type: Number, default: 0 }, // time not work
    checkedOneWeek: [
      {
        dayOfWeek: { type: Number },
        morning: { type: Boolean, default: false },
        afternoon: { type: Boolean, default: false },
        OT: { type: Boolean, default: false },
        isDayInMonth: { type: Boolean, default: false },
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
  updateCheckTime(id, toDay, Session, defaultChecked) {
    if (Session === "sang") {
      return this.update(
        {
          $and: [
            { _id: id },
            { checkedOneWeek: { $elemMatch: { dayOfWeek: toDay } } },
          ],
        },
        { $set: { "checkedOneWeek.$.morning": !defaultChecked } }
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
        { $set: { "checkedOneWeek.$.afternoon": !defaultChecked } }
      ).exec();
    }
  },
  updateCountTime(id, count, text) {
    if (text === "timecheck") {
      return this.update({ _id: id }, { countTime: count }).exec();
    }
    if (text === "ot") {
      return this.update({ _id: id }, { countTimeOT: count }).exec();
    }
  },
  getTimekeeping(id, Time) {
    return this.find({
      $and: [{ userId: id }, { monthYear: { $regex: new RegExp(Time, "i") } }],
    }).exec();
  },
  checkSessionWorked(id, time, week) {
    return this.findOne(
      {
        $and: [
          { userId: id },
          { monthYear: { $regex: new RegExp(time, "i") } }, // regex mongo tim key gan vs keyword nhat
          { weekInMonth: { $regex: new RegExp(week, "i") } },
        ],
      },
      { checkedOneWeek: 1 }
    ).exec();
  },
  updateTimeNotWork(id, count) {
    return this.update({ _id: id }, { countTimeNotWork: count }).exec();
  },
};
module.exports = mongoose.model("TimeKeeping", timeKeepingModel);

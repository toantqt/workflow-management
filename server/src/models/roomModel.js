const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let roomSchema = new Schema(
  {
    nameRoom: { type: String },
    ownerId: { type: String },
    members: [{ userId: String, default: "" }],
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
roomSchema.statics = {
  createNew(item) {
    return this.create(item); //tao ban
  },
  getRoom() {
    return this.find({}).exec();
  },
  getRoomUser(idUser) {
    return this.find({ members: { $elemMatch: { userId: idUser } } }).exec();
  },
  //find room and get data
  getDataRoom(id) {
    return this.findOne({ _id: id }).exec();
  },
  checkRoom(id) {
    return this.findOne({ _id: id }).exec();
  },
  // add new user
  addUserRoom(id, idUser) {
    return this.findByIdAndUpdate(id, {
      $push: {
        members: {
          $each: [{ userId: idUser }],
        },
      },
    }).exec();
  },
  checkAdmin(isadmin, id) {
    return this.findOne({ $and: [{ _id: id }, { ownerId: isadmin }] }).exec();
  },
  removeUser(id, idUserRm) {
    return this.findByIdAndUpdate(
      { _id: id },
      {
        $pull: { members: { userId: idUserRm } },
      }
    ).exec();
  },
};
module.exports = mongoose.model("Room", roomSchema);

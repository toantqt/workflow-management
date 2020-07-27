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
};
module.exports = mongoose.model("Room", roomSchema);

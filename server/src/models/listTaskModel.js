const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listTaskSchema = new Schema(
  {
    listId: String,
    lists: [
      {
        name: String,
        note: { type: String, default: "" },
        status: { type: String, default: "work" },
      },
    ],
    doing: [
      {
        name: String,
        workId: String,
        note: { type: String, default: "" },
        status: { type: String, default: "doing" },
      },
    ],
    done: [
      {
        name: String,
        workId: String,
        note: { type: String, default: "" },
        status: { type: String, default: "done" },
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

listTaskSchema.statics = {
  //create work in list
  createWork(data) {
    return this.create(data);
  },

  //get data
  getWork(id) {
    return this.findOne({ listId: id }).exec();
  },

  //add work to list []
  addWork(data) {
    return this.findOneAndUpdate(
      { listId: data.listId },
      {
        $push: {
          lists: {
            name: data.name,
            note: data.note,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },

  //add doing in list
  addDoing(data) {
    return this.findOneAndUpdate(
      { listId: data.listId },
      {
        $push: {
          doing: {
            name: data.name,
            note: data.note,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },

  addDone(data) {
    return this.findOneAndUpdate(
      { listId: data.listId },
      {
        $push: {
          done: {
            name: data.name,
            note: data.note,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },

  //push work to doingWork
  doingWork(data) {
    return this.findByIdAndUpdate(
      { _id: data._id },
      {
        $push: {
          doing: {
            workId: data.workId,
            name: data.name,
            note: data.note,
          },
        },
        $pull: {
          lists: {
            _id: data.workId,
            name: data.name,
            note: data.note,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },

  //push to list from doing
  doingToList(data) {
    return this.findByIdAndUpdate(
      { _id: data._id },
      {
        $push: {
          lists: {
            _id: data.workId,
            name: data.name,
            note: data.note,
          },
        },
        $pull: {
          doing: {
            workId: data.workId,
            name: data.name,
            note: data.note,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },

  doingToDone(data) {
    return this.findByIdAndUpdate(
      { _id: data._id },
      {
        $push: {
          done: {
            workId: data.workId,
            name: data.name,
            note: data.note,
          },
        },
        $pull: {
          doing: {
            workId: data.workId,
            name: data.name,
            note: data.note,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },

  doneToDoing(data) {
    return this.findByIdAndUpdate(
      { _id: data._id },
      {
        $push: {
          doing: {
            workId: data.workId,
            name: data.name,
            note: data.note,
          },
        },
        $pull: {
          done: {
            workId: data.workId,
            name: data.name,
            note: data.note,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },

  listToDone(data) {
    return this.findByIdAndUpdate(
      { _id: data._id },
      {
        $push: {
          done: {
            workId: data.workId,
            name: data.name,
            note: data.note,
          },
        },
        $pull: {
          lists: {
            _id: data.workId,
            name: data.name,
            note: data.note,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },

  doneToList(data) {
    return this.findByIdAndUpdate(
      { _id: data._id },
      {
        $push: {
          lists: {
            _id: data.workId,
            name: data.name,
            note: data.note,
          },
        },
        $pull: {
          done: {
            workId: data.workId,
            name: data.name,
            note: data.note,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
};

module.exports = mongoose.model("List", listTaskSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listTaskSchema = new Schema(
  {
    listId: String,
    idStaff: String,
    image: { type: String, default: "" },
    lists: [
      {
        name: String,
        note: [
          {
            name: String,
          },
        ],
        status: { type: String, default: "work" },
      },
    ],
    doing: [
      {
        name: String,
        workId: String,
        note: [
          {
            name: String,
          },
        ],
        status: { type: String, default: "doing" },
      },
    ],
    done: [
      {
        name: String,
        workId: String,
        note: [
          {
            name: String,
          },
        ],
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

  deleteList(listId) {
    return this.findOneAndDelete({ listId: listId }).exec();
  },

  //add work to list []
  addWork(data) {
    return this.findOneAndUpdate(
      { listId: data.listId },
      {
        $push: {
          lists: {
            name: data.name,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },

  // add work to do
  addWorkToDo(data, status) {
    if (status === "work") {
      return this.findOneAndUpdate(
        { lists: { $elemMatch: { _id: data.id } } },
        {
          $push: {
            "lists.$.note": {
              name: data.name,
            },
          },
        },
        { safe: true, upsert: true, new: true }
      ).exec();
    } else if (status === "doing") {
      return this.findOneAndUpdate(
        { doing: { $elemMatch: { _id: data.id } } },
        {
          $push: {
            "doing.$.note": {
              name: data.name,
            },
          },
        },
        { safe: true, upsert: true, new: true }
      ).exec();
    } else {
      return this.findOneAndUpdate(
        { done: { $elemMatch: { _id: data.id } } },
        {
          $push: {
            "done.$.note": {
              name: data.name,
            },
          },
        },
        { safe: true, upsert: true, new: true }
      ).exec();
    }
  },

  //get work to do
  workToDo(data) {
    if (data.status === "work") {
      return this.findOne({
        lists: { $elemMatch: { _id: data.id } },
      }).exec();
    } else if (data.status === "doing") {
      return this.findOne({
        doing: { $elemMatch: { _id: data.id } },
      }).exec();
    } else {
      return this.findOne({
        done: { $elemMatch: { _id: data.id } },
      }).exec();
    }
  },
  //add doing in list
  addDoing(data) {
    return this.findOneAndUpdate(
      { listId: data.listId },
      {
        $push: {
          doing: {
            name: data.name,
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
          },
        },
        $pull: {
          lists: {
            _id: data.workId,
            name: data.name,
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
          },
        },
        $pull: {
          doing: {
            workId: data.workId,
            name: data.name,
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
          },
        },
        $pull: {
          doing: {
            workId: data.workId,
            name: data.name,
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
          },
        },
        $pull: {
          done: {
            workId: data.workId,
            name: data.name,
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
          },
        },
        $pull: {
          lists: {
            _id: data.workId,
            name: data.name,
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
          },
        },
        $pull: {
          done: {
            workId: data.workId,
            name: data.name,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },

  updataOld(array, id) {
    if (array.status === "work") {
      return this.update(
        { listId: id },
        {
          $pull: { lists: { _id: array.id } },
        },
        { safe: true, upsert: true, new: true }
      ).exec();
    }
    if (array.status === "doing") {
      return this.update(
        { listId: id },
        {
          $pull: { doing: { _id: array.id } },
        },
        { safe: true, upsert: true, new: true }
      ).exec();
    }
    if (array.status === "done") {
      return this.update(
        { listId: id },
        {
          $pull: { done: { _id: array.id } },
        },
        { safe: true, upsert: true, new: true }
      ).exec();
    }
  },
  updataNew(array, id) {
    if (array.status === "work") {
      return this.findOneAndUpdate(
        { listId: id },
        {
          $push: {
            lists: {
              $each: [array],
            },
          },
        }
      ).exec();
    }
    if (array.status === "doing") {
      return this.findOneAndUpdate(
        { listId: id },
        {
          $push: {
            doing: {
              $each: [array],
            },
          },
        }
      ).exec();
    }
    if (array.status === "done") {
      return this.findOneAndUpdate(
        { listId: id },
        {
          $push: {
            done: {
              $each: [array],
            },
          },
        }
      ).exec();
    }
  },

  //work.length === 0 => pull work
  pullWork(listId, data) {
    data.forEach(async (e) => {
      if (e.status === "work") {
        return await this.findOneAndUpdate(
          { listId: listId },
          {
            $pull: {
              lists: {
                _id: e._id,
                name: e.name,
                note: e.note,
              },
            },
          },
          { safe: true, upsert: true, new: true }
        ).exec();
      } else if (e.status === "doing") {
        return await this.findOneAndUpdate(
          { listId: listId },
          {
            $pull: {
              doing: {
                _id: e._id,
                name: e.name,
                note: e.note,
              },
            },
          },
          { safe: true, upsert: true, new: true }
        ).exec();
      } else {
        return await this.findOneAndUpdate(
          { listId: listId },
          {
            $pull: {
              done: {
                _id: e._id,
                name: e.name,
                note: e.note,
              },
            },
          },
          { safe: true, upsert: true, new: true }
        ).exec();
      }
    });
  },
};

module.exports = mongoose.model("List", listTaskSchema);

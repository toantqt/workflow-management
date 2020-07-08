const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    profile: {
      avatar: { type: String ,default:""},
      gender: { type: String ,default:""},
      address: { type: String,default:"" },

    },
    role: { type: String,default:'staff' },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

module.exports = mongoose.model("User", userSchema);
module.exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Hashing failed");
  }
};

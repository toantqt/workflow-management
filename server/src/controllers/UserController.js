const User = require("../helpers/user.helper");
const userModel = require("../models/userModel");
const findUser = async (req, res) => {
  try {
    let keyword = req.params.find;
    let getUsers = await User.getUser(keyword);
    //console.log(getUsers);
    //console.log("tai usercontroller " + keyword);
    return res.status(200).json({ getUsers });
  } catch (error) {
    // console.log("co tai tim kiem");
    return res.status(500).json({
      message: "loi phan show room",
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.getAllUser();

    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(500).json({
      message: "get all user failed",
    });
  }
};

module.exports = {
  findUser: findUser,
  getAllUser: getAllUser,
};

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
    //console.log("co tai tim kiem");
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

const lockUser = async (req, res) => {
  try {
    //console.log(req.body.idUser);
    const idUser = req.body.idUser;
    const status = req.body.status;
    const lock = await userModel.lockUser(idUser, status);
    //console.log(lock);
    return res.status(200).json(lock);
  } catch (error) {
    return res.status(500).json({
      message: "lock user failed",
    });
  }
};

module.exports = {
  findUser: findUser,
  getAllUser: getAllUser,
  lockUser: lockUser,
};

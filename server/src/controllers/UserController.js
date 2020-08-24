const User = require("../helpers/user.helper");
const userModel = require("../models/userModel");
const wageModel = require("../models/wageModel");
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

let getInforSalary = async (req, res) => {
  try {
    let userId = req.params.iduser;
    // console.log(userId);
    let getSalary = await wageModel.getWates(userId);
    console.log(getSalary);
    return res.status(200).json({ getSalary });
  } catch (error) {
    return res.status(500).json({
      message: "get salary failed",
    });
  }
};
let createSalary = async (req, res) => {
  try {
    let item = {
      wageOt: req.body.Ot,
      typeWage: req.body.typeWage,
      userId: req.body.idUser,
      // workDay: req.body.workDay,
      allowAnce: req.body.allowAnce,
      rankWage: req.body.rank,
    };
    await wageModel.createNew(item);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({
      message: "create salary failed",
    });
  }
};
let updateSalary = async (req, res) => {
  try {
    console.log(req.body);
    let item = {
      userId: req.body.idUser,
      wageOt: req.body.Ot,
      typeWage: req.body.typeWage,
      userId: req.body.idUser,
      workDay: req.body.workDay,
      allowAnce: req.body.allowAnce,
      rankWage: req.body.rank,
    };
    await wageModel.upDateSalary(req.body.salaryId, item);
    return res.status(200).json({ message: "up date salary sucess" });
  } catch (error) {
    return res.status(500).json({
      message: "update salary failed",
    });
  }
};
module.exports = {
  findUser: findUser,
  getAllUser: getAllUser,
  lockUser: lockUser,
  getInforSalary: getInforSalary,
  createSalary: createSalary,
  updateSalary: updateSalary,
};

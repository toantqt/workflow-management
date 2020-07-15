const userModel = require("../models/userModel");
const debug = console.log.bind(console);
let createUser = (email, username, password) => {
  return new Promise(async (resolve, reject) => {
    //debug('create user');
    let userByEmail = await userModel.findOne({ email });
    if (userByEmail) {
      return reject({ message: "email da ton tai" });
    }
    let userItem = {
      username: username,
      email: email,
      password: await userModel.hashPassword(password),
    };

    const newUser = await new userModel(userItem);
    await newUser.save();
    return resolve({ message: " send thanh cong" });
  });
};

let updateData = (_id, newData) => {
  debug("aaaa");
  return new Promise(async (resolve, reject) => {
    const username = newData.username;

    let findUsername = await userModel.findByUsername(username);
    // debug(findUsername);
    if (findUsername != null) {
      return reject({ message: "username already exist update failed" });
    } else {
      let updateNewData = await userModel.findAndUpdate(_id, newData);
      return resolve({ message: "update successfully" });
    }
  });
};

//get data user
let getDataUser = (username) => {
  return new Promise(async (resolve, reject) => {
    let findData = await userModel.findByUsername(username);
    if (findData == null) {
      return reject({ message: "data user is not exist" });
    } else {
      return resolve(findData);
    }
  });
};

module.exports = {
  createUser: createUser,
  updateData: updateData,
  getDataUser: getDataUser,
};

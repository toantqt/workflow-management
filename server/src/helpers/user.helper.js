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

let updateData = (newData) => {
  return new Promise(async (resolve, reject) => {
    const username = newData.username;
    const email = newData.email;

    let findUsername = await userModel.findByUsername(username);
    // debug(findUsername);
    if (findUsername != null) {
      return reject({ message: "username already exist update failed" });
    } else {
      debug("aaaa");
      let updateNewData = await userModel.findOneAndUpdate(email, newData);
      return resolve({ message: "update successfully" });
    }
  });
};
module.exports = { createUser: createUser, updateData: updateData };

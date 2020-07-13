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

    let findUsername = await userModel.findOne({ username });
    if (findUsername) {
      debug("den dc day");
      return reject({ error: "username da ton tai" });
    }
    return resolve({ success: "username hop le" });

    // if (findUsername != null) {
    //   debug("!null");
    //   return reject({ message: "username da ton tai" });
    // }
    // return resolve({ message: "username hop le" });
  });
};
module.exports = { createUser: createUser, updateData: updateData };

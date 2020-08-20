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
  //console.log(_id);
  //console.log(newData.username);
  return new Promise(async (resolve, reject) => {
    if (newData.username) {
      const username = newData.username;
      let findUsername = await userModel.findByUsername(_id, username);
      // debug(findUsername);

      if (findUsername.length !== 0) {
        debug("iiiii");
        return reject({ message: "username already exist update failed" });
      }
    }
    await userModel.findAndUpdate(_id, newData);
    //console.log("aloalalala");
    return resolve({ message: "update successfully" });
  });
};

//get data user
let getDataUser = (id) => {
  return new Promise(async (resolve, reject) => {
    let findData = await userModel.getProfile(id);
    if (findData == null) {
      return reject({ message: "data user is not exist" });
    } else {
      return resolve(findData);
    }
  });
};
//tim kiem nguoi
let getUser = (keyword) => {
  return new Promise(async (resolve, reject) => {
    let findUser = await userModel.findUser(keyword);
    //console.log(findUser);
    resolve(findUser);
  });
};
module.exports = {
  createUser: createUser,
  updateData: updateData,
  getDataUser: getDataUser,
  getUser: getUser,
};

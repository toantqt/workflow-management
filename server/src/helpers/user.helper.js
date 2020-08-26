const userModel = require("../models/userModel");
const sendMail = require("./sendMailActive");
const uuidv4 = require("uuid/v4"); // varifytoken
const debug = console.log.bind(console);
let createUser = (email, username, password, protocol, host) => {
  return new Promise(async (resolve, reject) => {
    //debug('create user');
    let userByEmail = await userModel.findOne({ email });
    if (userByEmail) {
      return resolve({ message: "email da ton tai", succeed: false });
    }
    let checkusername = await userModel.findusernameregister(username);
    if (checkusername) {
      return resolve({ message: "ten đăng nhập đã tồn tại", succeed: false });
    }

    let userItem = {
      username: username,
      email: email,
      password: await userModel.hashPassword(password),
      verifyToken: uuidv4(), // tạo mã ngẫu nhiên
    };

    const newUser = await new userModel(userItem);
    await newUser.save();
    // tính năng gữi mail tại đây
    let linkVerify = `${protocol}://${host}/verify/${newUser.verifyToken}`;
    sendMail(email, linkVerify)
      .then((result) => {
        return resolve({
          message: " Tạo tài khoản thành công vào mail đã đăng ký đẻ xác nhận",
          succeed: true,
        });
      })
      .catch(async (error) => {
        // remove user
        await UserModel.removeById(newUser._id);
        reject({
          message: "có lỗi trong quá trình gữi mail active",
          succeed: false,
        });
      });
    // return resolve({
    //   message: " Tạo tài khoản thành công",
    //   succeed: true,
    // });
  });
};
// xác nhận tài khoản qua mail
let verifyAccount = (token) => {
  return new Promise(async (resolve, reject) => {
    let userBytoken = await userModel.findByToken(token);
    if (!userBytoken) {
      return reject({
        message: "có lỗi trong quá trình active",
        succeed: false,
      });
    }
    await userModel.verify(token);
    return resolve({
      message: " kích hoạt thành công",
      succeed: true,
    });
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
  verifyAccount: verifyAccount,
  updateData: updateData,
  getDataUser: getDataUser,
  getUser: getUser,
};

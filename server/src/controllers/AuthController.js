const jwtHelper = require("../helpers/jwt.helper");
const userHelper = require("../helpers/user.helper");
const cloudinary = require("cloudinary").v2;
// const test = require("../../../tmp")
// const fs = require("fs-extra");
cloudinary.config({
  cloud_name: "phathuynh",
  api_key: "412296536584643",
  api_secret: "CNVYYGRUt8pDUvm7_2UWzuFsLHU",
});
const debug = console.log.bind(console);
let tokenList = {};
const Joi = require("@hapi/joi");
const User = require("../models/userModel");
const { result } = require("lodash");
// const { update } = require("../models/userModel");

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
// const accessTokenLife = Math.floor(Date.now() / 1000) + (60 * 60)
//ma secretKey
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-toantqt-@@";

//thoi gian song cua refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "365d";
//ma refreshTokenSecret
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example-toantqt-@@";

/*
 * controller login
 * @param {*} req
 * @param {*} res
 */
let login = async (req, res) => {
  try {
    //thuc hien fake thong tin user
    const email = req.body.email;
    const password = req.body.password;
    let user = await User.findByEmail(email);
    debug(user.fullName);
    if (user == null) {
      res.status(404).json({ message: "email failed" });
    } else {
      // mới thêm vào
      // if (!user.isActive) {
      //   res.status(404).json({ message: "tài khoản chưa được kích hoạt" });
      // }
      let checkPassword = await user.comparePassword(password);
      if (!checkPassword) {
        res.status(404).json({ message: "password failed" });
      }
      const userData = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        deletedAt: user.deletedAt,
        isActive: user.isActive,
      };
      //thực hiện tạo mã Token, thời gian sống là 1 giờ
      const accessToken = await jwtHelper.generateToken(
        userData,
        accessTokenSecret,
        accessTokenLife
      );
      //thực hiện tạo mã refresh token, thời gian sống là 1 năm
      const refreshToken = await jwtHelper.generateToken(
        userData,
        refreshTokenSecret,
        refreshTokenLife
      );

      // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.

      tokenList[refreshToken] = { accessToken, refreshToken };
      //server send token to client
      return res.status(200).json({ accessToken, refreshToken });
    }
  } catch (error) {
    return res.status(500).json({
      message: "loi roi 3",
    });
  }
};

/*
 * controller refreshToken
 * @param {*} req
 * @param {*} res
 */

let refreshToken = async (req, res) => {
  // User gửi mã refresh token kèm theo trong body
  const refreshTokenFromClient = req.body.refreshToken;
  // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
  if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
    try {
      //Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded
      const decoded = await jwtHelper.verifyToken(
        refreshTokenFromClient,
        refreshTokenSecret
      );
      // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
      // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
      const userData = decoded.data;
      console.log(userData);
      //thực hiện tạo mã Token trong bước gọi refresh Token
      const accessToken = await jwtHelper.generateToken(
        userData,
        accessTokenSecret,
        accessTokenLife
      );

      //send new token to client
      return res.status(200).json({ accessToken });
    } catch (error) {
      res.status(403).json({
        message: "Invalid refresh token",
      });
    }
  } else {
    //khong tim thay token trong request
    return res.status(403).json({
      message: "No token provided",
    });
  }
};
/*
 * controller postRegister
 * @param {*} req
 * @param {*} res
 */
let postRegister = async (req, res) => {
  try {
    //joi schema
    let userSchema = Joi.object().keys({
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    let result = userSchema.validate(req.body);
    //console.log(result);
    //debug("aaaaa");
    if (result) {
      // return res.status(200).json(result.value);
      // phan nay edit để xác thực mail
      let createUser = await userHelper.createUser(
        req.body.email,
        req.body.username,
        req.body.password,
        req.protocol,
        req.get("host")
      );
      // debug("result success");

      return res.status(200).json({ createUser });
    } else {
      return res.status(500).json({
        message: "loi roi 4",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "loi joi",
    });
  }
};
//
let verifyAccount = async (req, res) => {
  try {
    await userHelper.verifyAccount(req.params.token);
    return res.status(200).json({ message: " xác nhận thành công" });
  } catch (error) {
    return res.status(500).json({
      message: "loi roi xác nhận mail",
    });
  }
};
//get Profile
let getProfile = async (req, res) => {
  //debug("hhahaah");
  try {
    const id = req.params.id;
    let getDataUser = await userHelper.getDataUser(id);
    // debug(getDataUser);
    return res.status(200).json(getDataUser);
  } catch (error) {
    return res.status(500).json({ message: "get profile failed" });
  }
};

//post /updateProfile
let updateProfile = async (req, res) => {
  try {
    //console.log(req.body);
    const newData = {
      username: req.body.username,
      fullName: req.body.fullName,
      profile: {
        gender: req.body.gender,
        address: req.body.address,
        avatar: req.body.avatar,
      },
    };
    //debug(newData);
    //find email and compare password
    let user = await User.findByEmail(req.body.email);

    if (user == null) {
      return res.status(404).json({ message: "email not exists" });
    }
    //console.log(req.body.email);
    let updateData = await userHelper.updateData(req.body._id, newData);
    if (updateData) {
      return res.status(200).json({ message: updateData.message });
    }
    // return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "update failed" });
  }
};
let updatePassword = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.password);
    console.log(req.body._id);
    let user = await User.findUserById(req.body._id);
    console.log(user);
    if (user) {
      let checkPassword = await user.comparePassword(req.body.password);
      if (!checkPassword) {
        return res.status(404).json({ message: "password failed" });
      }
    } else {
      return res.status(404).json({ message: "email not exists" });
    }

    let newData = {
      password: await User.hashPassword(req.body.newPassword),
    };
    console.log("dasdasd");
    let updateData = await userHelper.updateData(req.body._id, newData);
    if (updateData) {
      return res.status(200).json({ message: updateData.message });
    }
    // return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "update failed password" });
  }
};
let updateAvatar = async (req, res) => {
  try {
    // console.log("file up");
    //console.log(req.files);
    let file = req.files.avatar;
    // console.log(file);
    console.log(req.body.oldAvatar);

    cloudinary.uploader
      .upload(file.tempFilePath, (err, result) => {
        console.log("error", err);
        console.log("result", result);
      })
      .then(async (result) => {
        let newData = {
          profile: {
            avatar: result.public_id,
            gender: req.body.gender,
            address: req.body.address,
          },
        };
        // console.log(newData);
        let updateData = await userHelper.updateData(req.body.id, newData);
        // xoa duong dan tmp
        // await fs.remove("../../../tmp/");
        if (updateData) {
          // goi phuong thuc delete image tren cloudinary
          cloudinary.api.delete_resources([req.body.oldAvatar], function (
            error,
            result
          ) {
            console.log(result, error);
          });

          return res.status(200).json({ message: updateData.message });
        }
      });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "update failed avatar" });
  }
};
module.exports = {
  login: login,
  refreshToken: refreshToken,
  postRegister: postRegister,
  updateProfile: updateProfile,
  getProfile: getProfile,
  updatePassword: updatePassword,
  updateAvatar: updateAvatar,
  verifyAccount: verifyAccount,
};

const jwtHelper = require("../helpers/jwt.helper");
const userHelper = require("../helpers/user.helper");
const debug = console.log.bind(console);
let tokenList = {};
const Joi = require("@hapi/joi");
const User = require("../models/userModel");

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
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
    if (user == null) {
      res.status(404).json({ message: "email failed" });
    } else {
      let checkPassword = await user.comparePassword(password);
      if (!checkPassword) {
        res.status(404).json({ message: "password failed" });
      }
      const userData = {
        _id: user._id,
        username: user.username,
        email: user.email,
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
    //debug("aaaaa");
    if (result) {
      // return res.status(200).json(result.value);

      let createUser = await userHelper.createUser(
        req.body.email,
        req.body.username,
        req.body.password
      );
      debug("result success");
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
module.exports = {
  login: login,
  refreshToken: refreshToken,
  postRegister: postRegister,
};

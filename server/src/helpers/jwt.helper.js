const jwt = require("jsonwebtoken");
const debug = console.log.bind(console);
//generateToken – tạo token và verifyToken – xác minh token có hợp lệ hay không.
//create toke
let generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    //dinh nghia thong tin user save to token
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      deletedAt: user.deletedAt,
      isActive: user.isActive,
    };
    //thực hiện ký và tạo token
    jwt.sign(
      { data: userData },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: "1h", // chu y phan nay
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};

//this module used for verify jwt token
//param token
//param secretkey

let verifyToken = (token, secretkey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretkey, (error, decoded) => {
      if (error) {
        debug(error);
        return reject(error);
      }

      return resolve(decoded);
    });
  });
};

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};

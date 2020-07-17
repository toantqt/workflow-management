const User = require("../helpers/user.helper");
let findUser = async (req, res) => {
  try {
    let keyword = req.params.find;
    let getUsers = await User.getUser(keyword);
    //console.log(getUsers);
    //console.log("tai usercontroller " + keyword);
    return res.status(200).json({ getUsers });
  } catch (error) {
    // console.log("co tai tim kiem");
    return res.status(500).json({
      message: "loi phan show room",
    });
  }
};

module.exports = {
  findUser: findUser,
};

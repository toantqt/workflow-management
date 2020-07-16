const Room = require("../helpers/room.helper");
const userModel = require("../models/userModel");
const roomModel = require("../models/roomModel");
let addRoom = async (req, res) => {
  try {
    let admin = req.body.admin;
    let ownerId = req.body.owener;
    let roomName = req.body.roomname;
    let memberId = req.body.member;
    //console.log(memberId);
    let CheckAdmin = await userModel.CheckAdmin(admin);
    //let CheckUser = await User.findUserById(ownerId);
    //console.log(CheckAdmin);
    if (!CheckAdmin) {
      return res.status(500).json({
        message: "ban khong phai admin trang web nay",
      });
    }
    // if (!CheckUser) {
    //   return res.status(500).json({
    //     message: "nguoi dung khong ton tai",
    //   });
    // }
    let createRoom = await Room.addRoom(ownerId, roomName, memberId);

    return res.status(200).json({ createRoom });
  } catch (error) {
    return res.status(500).json({
      message: "loi phan tao nhom",
    });
  }
};
let getRoom = async (req, res) => {
  try {
    let getRoom = await roomModel.getRoom();
    // console.log(getRoom);
    return res.status(200).json({ getRoom });
  } catch (error) {
    return res.status(500).json({
      message: "loi phan show room",
    });
  }
};
module.exports = { addRoom: addRoom, getRoom: getRoom };

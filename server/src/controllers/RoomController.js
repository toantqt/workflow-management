const Room = require("../helpers/room.helper");
//const userModel = require("../models/userModel");
const roomModel = require("../models/roomModel");
const userModel = require("../models/userModel");
const taskModel = require("../models/taskModel");
const debug = console.log.bind(console);
let addRoom = async (req, res) => {
  try {
    //let admin = req.body.admin;
    let ownerId = req.body.ownerId;
    let nameRoom = req.body.nameRoom;
    let memberId = req.body.member;
    //console.log(memberId);
    //let CheckAdmin = await userModel.CheckAdmin(admin);
    //let CheckUser = await User.findUserById(ownerId);
    //console.log(CheckAdmin);
    // if (!CheckAdmin) {
    //   return res.status(500).json({
    //     message: "ban khong phai admin trang web nay",
    //   });
    // }
    // if (!CheckUser) {
    //   return res.status(500).json({
    //     message: "nguoi dung khong ton tai",
    //   });
    // }
    let createRoom = await Room.addRoom(ownerId, nameRoom, memberId);

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

let findRoom = async (req, res) => {
  try {
    const id = req.params.id;

    //get Data in room
    let getDataRoom = await roomModel.getDataRoom(id);

    //get infor user in room
    let dataMember = getDataRoom.members.map(async (e) => {
      const data = await userModel.findUserById(e.userId);
      //debug("aaa" + data);
      return (e = data); //return many promise
    });
    //promise
    let inforMember = await Promise.all(dataMember);

    // console.log(inforMember);

    //get task in room

    let checkTaskStatus = await taskModel.getTaskRoom(id);
    checkTaskStatus.forEach(async (e) => {
      if (e.list.length !== 0) {
        let aw = e.list.filter((l) => {
          return l.status === false;
        });
        //console.log(aw);
        if (aw.length !== 0) {
          console.log("false");
          await taskModel.updateStatus(e._id, false);
        } else {
          console.log("true");
          await taskModel.updateStatus(e._id, true);
        }
      }
    });

    let getTaskRoom = await taskModel.getTaskRoom(id);
    //console.log("get task room : " + getTaskRoom);

    //get info author in task
    let getAuthor = getTaskRoom.map(async (e) => {
      let getInforAuthor = await userModel.findUserById(e.idStaff);
      //console.log(getInforAuthor);
      e.inforAuthor = getInforAuthor;
      // console.log("e: " + e.i);
      return e;
    });

    let inforTask = await Promise.all(getAuthor);
    //console.log("aa " + inforTask);
    // inforTask.forEach((e) => {
    //   console.log("infor author  " + e);
    // });

    //
    return res.status(200).json({
      data: getDataRoom,
      inforMember: inforMember,
      inforTask: inforTask,
    });
  } catch (error) {
    return res.status(500).json({ message: "No room" });
  }
};
let findUserAddRoom = async (req, res) => {
  console.log("tai room controller");
  // console.log(req.query.findname);
  // console.log(req.query.roomid);
  let checkRoom = await roomModel.checkRoom(req.query.roomid);
  if (checkRoom) {
    //console.log("co phong nha" + checkRoom);
    let memberId = [];
    checkRoom.members.forEach((e) => {
      memberId.push(e.userId);
    });
    //console.log(memberId);
    let finduser = await userModel.findUserAddRoom(
      memberId,
      req.query.findname
    );
    //console.log(finduser);
    return res.status(200).json({ finduser });
  } else {
    console.log("ko co phong nha");
  }
};

let addUserRoom = async (req, res) => {
  let checkRoom = await roomModel.checkRoom(req.body._id);
  if (checkRoom) {
    console.log(req.body);
    req.body.members.forEach(async (e) => {
      await roomModel.addUserRoom(req.body._id, e);
    });
    //  await roomModel.addUserRoom(req.body._id, req.body.members);
  }
  return res.status(200).json({ message: "success" });
};
let removeUserRoom = async (req, res) => {
  try {
    console.log(req.body);
    let checkAdminRoom = await roomModel.checkAdmin(
      req.body.userOnl,
      req.body._id
    );
    if (checkAdminRoom) {
      await roomModel.removeUser(req.body._id, req.body.idUserRm);
      return res.status(200).json({ message: "ok ban oi" });
    }
    // return res.status(200).json({ message: "ok ban oi" });
  } catch (error) {
    return res.status(500).json({
      message: "loi phan remove user room",
    });
  }
};
module.exports = {
  addRoom: addRoom,
  getRoom: getRoom,
  findRoom: findRoom,
  findUserAddRoom: findUserAddRoom,
  addUserRoom: addUserRoom,
  removeUserRoom: removeUserRoom,
};

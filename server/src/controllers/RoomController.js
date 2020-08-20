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
    //console.log(getRoom);
    return res.status(200).json({ getRoom });
  } catch (error) {
    return res.status(500).json({
      message: "loi phan show room",
    });
  }
};

let getRoomUser = async (req, res) => {
  try {
    const idUser = req.body.idUser;
    const roomUser = await roomModel.getRoomUser(idUser);
    const dataRoom = [];
    roomUser.forEach(async (e) => {
      return await dataRoom.push(e);
    });
    //console.log(dataRoom);
    return res.status(200).json({ data: dataRoom });
  } catch (error) {
    return res.status(500).json({ message: "get room user failed" });
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

    //console.log(inforMember);

    //get task in room

    let checkTaskStatus = await taskModel.getTaskRoom(id);
    checkTaskStatus.forEach(async (e) => {
      if (e.list.length !== 0) {
        let aw = e.list.filter((l) => {
          return l.status === false;
        });
        //console.log(aw);
        if (aw.length !== 0) {
          //console.log("false");
          await taskModel.updateStatus(e._id, false);
        } else {
          //console.log("true");
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
      //console.log("e: " + e.i);
      return e;
    });

    let inforTask = await Promise.all(getAuthor);
    //console.log("aa " + inforTask);
    // inforTask.forEach((e) => {
    //   //console.log("infor author  " + e);
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
  //console.log("tai room controller");
  //console.log(req.query.findname);
  //console.log(req.query.roomid);
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
    //console.log("ko co phong nha");
  }
};

let addUserRoom = async (req, res) => {
  let checkRoom = await roomModel.checkRoom(req.body._id);
  if (checkRoom) {
    //console.log(req.body);
    req.body.members.forEach(async (e) => {
      await roomModel.addUserRoom(req.body._id, e);
    });
    //  await roomModel.addUserRoom(req.body._id, req.body.members);
  }
  return res.status(200).json({ message: "success" });
};
let removeUserRoom = async (req, res) => {
  try {
    //console.log(req.body);
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
let getAllRoom = async (req, res) => {
  try {
    let getAllRoom = await roomModel.getRoom();
    //console.log(getAllRoom);
    let convert = getAllRoom.map(async (e) => {
      e = e.toObject();
      let getNameOwner = await userModel.getName(e.ownerId);
      //console.log(getNameOwner.username);
      //let converts = await Promise.all(getNameOwner);
      e.nameOwner = getNameOwner.username;
      //debug("alaalala");
      return e;
    });
    let AllRoom = await Promise.all(convert);
    //console.log(AllRoom);

    return res.status(200).json({ AllRoom });
  } catch (error) {
    return res.status(500).json({
      message: "loi phan get room",
    });
  }
};
let getInforUserRoom = async (req, res) => {
  try {
    let roomid = req.params.idroom;
    //console.log(id);
    let member = await roomModel.getIdMember(roomid);
    //console.log(member);
    let infor = member.members.map(async (e) => {
      let user = await userModel.getProfile(e.userId);
      return user;
    });
    let inForUser = await Promise.all(infor);
    //console.log(inForUser);
    return res.status(200).json({ inForUser });
  } catch (error) {
    return res.status(500).json({
      message: "loi phan get user room",
    });
  }
};
let removeRoom = async (req, res) => {
  try {
    //console.log(req.body);
    let checkadmin = await userModel.CheckAdmin(req.body.idUserOnl);
    if (checkadmin) {
      await roomModel.removeRoom(req.body.roomId);
      return res.status(200).json({ message: "remove thanh cong" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "loi phan get user room",
    });
  }
};
let updataOwnerRoom = async (req, res) => {
  try {
    //console.log(req.body);
    let findidmember = await roomModel.findMember(
      req.body.newOwner,
      req.body.roomId
    );
    //console.log(findidmember);
    if (!findidmember) {
      //console.log("ko co");
      await roomModel.addUserRoom(req.body.roomId, req.body.newOwner);
    }
    //console.log(" co");
    await roomModel.updateOwnerRoom(req.body.newOwner, req.body.roomId);
    return res.status(200).json({ message: "remove thanh cong" });
  } catch (error) {
    return res.status(500).json({
      message: "loi phan get user room",
    });
  }
};
module.exports = {
  addRoom: addRoom,
  getRoom: getRoom,
  getRoomUser: getRoomUser,
  findRoom: findRoom,
  findUserAddRoom: findUserAddRoom,
  addUserRoom: addUserRoom,
  removeUserRoom: removeUserRoom,
  getAllRoom: getAllRoom,
  getInforUserRoom: getInforUserRoom,
  removeRoom: removeRoom,
  updataOwnerRoom: updataOwnerRoom,
};

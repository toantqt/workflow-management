const router = require("express").Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
const FriendController = require("../controllers/FriendController");
const RoomController = require("../controllers/RoomController");
const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");
const ListController = require("../controllers/ListController");
let initAPIs = (app) => {
  router.post("/login", AuthController.login);
  router.post("/refresh-token", AuthController.refreshToken);
  router.post("/register", AuthController.postRegister);
  //Sử dụng authMiddleware.isAuth trước những api cần xác thực
  router.use(AuthMiddleWare.isAuth);
  //list Protect APIs:
  router.get("/finduser/:find", UserController.findUser);
  router.get("/get-all-user", UserController.getAllUser);
  router.get("/update-profile/:id", AuthController.getProfile);
  router.post("/update-profile", AuthController.updateProfile);
  router.post("/update-password", AuthController.updatePassword);
  router.post("/update-avatar", AuthController.updateAvatar);
  router.get("/friends", FriendController.friendLists);

  //rooom
  router.post("/add-room", RoomController.addRoom);
  router.get("/getroom", RoomController.getRoom);
  router.post("/get-room-user", RoomController.getRoomUser);
  router.get("/room/:id", RoomController.findRoom);
  router.get("/get-infor-user/:idroom", RoomController.getInforUserRoom);
  //add task
  router.post("/add-task", TaskController.addTask);

  //update task
  router.post("/update-task", TaskController.updateTask);

  //add list task in tasks
  router.post("/add-list-task", TaskController.addListTask);

  //get list task in tasks
  router.get("/get-list-task/:idTask", TaskController.getListTask);

  //get data list in task
  router.get("/get-data-list/:idList", TaskController.getDataList);

  //get work in listmodel
  //create work
  router.post("/create-work", ListController.createWork);

  //add work in list
  router.post("/add-work", ListController.addWork);
  router.post("/add-doing", ListController.addDoing);
  router.post("/add-done", ListController.addDone);

  //update doing work in list
  router.post("/doing-work", ListController.doingWork);

  //update list work from doing work
  router.post("/doing-to-list", ListController.doingToList);

  router.post("/doing-to-done", ListController.doingToDone);
  router.post("/done-to-doing", ListController.doneToDoing);

  router.post("/list-to-done", ListController.listToDone);
  router.post("/done-to-list", ListController.doneToList);

  router.get("/find-user-addroom", RoomController.findUserAddRoom);
  router.post("/add-user-room", RoomController.addUserRoom);
  router.get("/get-all-room", RoomController.getAllRoom);
  router.post("/remove-room", RoomController.removeRoom);
  router.post("/update-owner-room", RoomController.updataOwnerRoom);
  // save change list task
  router.post("/update-list-task", ListController.updataListTask);

  //delete list
  router.post("/delete-list", ListController.deleteList);

  router.post("/remove-user-room", RoomController.removeUserRoom);

  //get board user
  router.post("/get-board-user", TaskController.getBoardUser);

  return app.use("/", router);
};

module.exports = initAPIs;

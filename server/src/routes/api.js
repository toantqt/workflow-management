const router = require("express").Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
const FriendController = require("../controllers/FriendController");
const RoomController = require("../controllers/RoomController");
const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");
let initAPIs = (app) => {
  router.post("/login", AuthController.login);
  router.post("/refresh-token", AuthController.refreshToken);
  router.post("/register", AuthController.postRegister);
  //Sử dụng authMiddleware.isAuth trước những api cần xác thực
  router.use(AuthMiddleWare.isAuth);
  //list Protect APIs:
  router.get("/finduser/:find", UserController.findUser);
  router.get("/update-profile/:username", AuthController.getProfile);
  router.post("/update-profile", AuthController.updateProfile);
  router.get("/friends", FriendController.friendLists);

  //rooom
  router.post("/add-room", RoomController.addRoom);
  router.get("/getroom", RoomController.getRoom);
  router.get("/room/:id", RoomController.findRoom);

  //add task
  router.post("/add-task", TaskController.addTask);

  return app.use("/", router);
};

module.exports = initAPIs;

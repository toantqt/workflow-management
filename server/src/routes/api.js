const router = require("express").Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
const FriendController = require("../controllers/FriendController");

let initAPIs = (app) => {
  router.post("/login", AuthController.login);
  router.post("/refresh-token", AuthController.refreshToken);
  router.post("/register", AuthController.postRegister);
  //Sử dụng authMiddleware.isAuth trước những api cần xác thực
  router.use(AuthMiddleWare.isAuth);
  //list Protect APIs:
  router.get("/update-profile/:username", AuthController.getProfile);
  router.post("/update-profile", AuthController.updateProfile);
  router.get("/friends", FriendController.friendLists);

  return app.use("/", router);
};

module.exports = initAPIs;

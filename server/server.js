const express = require("express");
const mongoose = require("mongoose");
const initRouter = require("./src/routes/api");
const app = express();
const port = process.env.PORT || 5566;
const morgan = require("morgan");
const cors = require("cors");
const fileupload = require("express-fileupload");
// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: "phathuynh",
//   api_key: "412296536584643",
//   api_secret: "CNVYYGRUt8pDUvm7_2UWzuFsLHU",
// });
// connect mongodb
mongoose.connect("mongodb://localhost:27017/work-management", {
  useNewUrlParser: true,
});
mongoose.connection.once("open", function () {
  //console.log("Database Connection Established Successfully.");
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.use(express.json());
//morgan
app.use(morgan("dev"));

// goi fileupload
app.use(
  fileupload({
    useTempFiles: true,
  })
);
// goi router
initRouter(app);

app.listen(port, () => {
  //console.log("server on port: " + port);
});

// app.get("/", (req, res) => {
//   res.send("hello");
// });

//test

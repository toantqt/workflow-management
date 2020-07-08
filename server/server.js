const express = require("express");
const mongoose =require("mongoose");
const initRouter = require("./src/routes/api");
const app = express();
const port = process.env.PORT || 5566;
const morgan = require("morgan");
// connect mongodb
mongoose.connect('mongodb://localhost:27017/work-management', {useNewUrlParser: true});
mongoose.connection.once("open", function() {
    console.log("Database Connection Established Successfully.");
  });
app.use(express.json());
//morgan
app.use(morgan("dev"));

// goi router
initRouter(app);

app.listen(port, () => {
  console.log("server on port: " + port);
});

// app.get("/", (req, res) => {
//   res.send("hello");
// });

//test

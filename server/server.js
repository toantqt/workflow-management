const express = require("express");
const initRouter = require("./src/routes/api");
const app = express();
const port = process.env.PORT || 6699;
const morgan = require("morgan");

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

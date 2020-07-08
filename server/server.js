const express = require("express");
const initRouter = require('./src/routes/api');
const app = express();
const port = process.env.PORT || 6699;

// goi router
initRouter(app);

app.listen(port, () => {
  console.log("server on port: " + port);
});

// app.get("/", (req, res) => {
//   res.send("hello");
// });

//test

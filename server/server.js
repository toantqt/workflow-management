const express = require("express");
const app = express();
const port = process.env.PORT || 6699;

app.listen(port, () => {
  console.log("server on port: " + port);
});

app.get("/", (req, res) => {
  res.send("hello");
});

//test

const express = require("express");
const app = express();
const port = process.env.PORT | 3000;
// 把请求体转换成json
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 加载dotenv 配置
require("dotenv").config({ path: [".env"] });
// import
const userCtrl = require("./src/user_controller");

// require("dotenv");

app.get("/", (req, res) => {
  res.send("Hello UNSW");
});

app.post("/login", userCtrl.login);

app.get("/users", userCtrl.getUsers);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

const { UserModel } = require("./db");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 邮箱获取用户
  const user = UserModel.findOne({ where: { email: email } });
  if (user) {
    if (user.password == password) {
      res.send("登录成功");
    } else {
      res.send("登录失败, 密码错误");
    }
  } else {
    res.send("用户不存在");
  }
};

exports.getUsers = async (req, res, next) => {
  // 邮箱获取用户
  const users = UserModel.findAll();

  res.send(users);
};

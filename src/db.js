const { Sequelize, DataTypes } = require("sequelize");

const { DB_URL, DB_NAME, DB_USER, DB_PASSWORD } = require("./config");

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_URL,
  dialect:
    "postgres" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      // 不允许为空
      allowNull: false,
      // username 必须是唯一的
      unique: true,
    },
    hashedPassword: {
      // 字符串长度
      type: DataTypes.STRING(64),
      // 不允许为空
      allowNull: false,
      // 使用正则表达式验证长度和格式是正确的
      validate: {
        is: /^[0-9a-f]{64}$/i,
      },
    },
    email: {
      type: DataTypes.STRING,
      // 不能为空
      allowNull: false,
      // 邮箱必须是唯一的
      unique: true,
      // 必须是邮箱
      isEmail: true,
    },
    // 用户的角色
    role: {
      type: DataTypes.ENUM("Admin", "User", "Tutor"),
      defaultValue: "User", // 默认角色是User
    },
    // 头像的地址
    avatarUrl: {
      type: DataTypes.STRING,
      // 必须是URL地址
      isUrl: true,
    },
    // 创建时间
    createdAt: {
      // 创建时间
      type: DataTypes.DATE,
      // 默认是当前的时间
      defaultValue: Date.now,
    },
    // 更新时间
    updatedAt: {
      // 更新时间
      type: DataTypes.DATE,
      // 默认是当前的时间
      defaultValue: Date.now,
    },
  },
  {
    // Other model options go here
  }
);

async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// sequelize.sync({ force: true });

module.exports = {
  UserModel,
};

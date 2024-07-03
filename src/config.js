const DB_URL = process.env.DB_URL;

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// 所有的配置相关的信息，都这个文件里面
// 给别的文件使用
module.exports = {
  DB_URL,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
};

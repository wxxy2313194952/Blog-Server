// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'lime_db',
})
// const db = mysql.createPool({
//   host: '47.97.40.176',
//   user: 'root',
//   password: 'xiangyang020713',
//   database: 'lime_db',
// })

// 向外共享 db 数据库连接对象
module.exports = db

// db.query('select 1',(err,result) => {
//   if (err) return console.log(err.result);
//   console.log(result);
// })
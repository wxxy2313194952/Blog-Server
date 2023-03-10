// 导入 mysql 模块
const mysql = require('mysql')

const config = require('../config')

// 创建数据库连接对象
const db = mysql.createPool(config.dbInfo)

// 向外共享 db 数据库连接对象
module.exports = db
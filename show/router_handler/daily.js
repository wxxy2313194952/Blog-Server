// 动态路由模块处理函数
// 导入数据库操作模块
const db = require('../../db/index');

// 导入处理路径的核心模块
const path = require('path')

// 引入时间day.js
const dayjs = require('dayjs');

// 获取动态接口处理函数
exports.getDailyList = (req, res) => {
  let pageFir = req.query.pageSize * (req.query.pageNo - 1)
  let pageSec = req.query.pageSize
  const sql = `select daily_table.*,users_table.nickname,users_table.user_pic from daily_table,users_table 
    where daily_table.is_delete=0 and daily_table.user_id = users_table.id limit ${pageFir},${pageSec}`
  db.query(sql, (err, result) => {
    if (err) res.cc(err)
    for (let i = 0; i < result.length; i++) {
      result[i].time = dayjs(result[i].time).format('YYYY年MM月DD日 HH:mm')
    }
    res.send({
      code: '200',
      message: '获取动态列表成功！',
      data: result
    })
  })
}

// 获取动态总条数处理函数
exports.getDailyNum = (req, res) => {
  const sql = `select id from daily_table where is_delete=0`
    db.query(sql,(err,result) => {
      if (err) res.cc(err)
      res.send({
        code: '200',
        message: '获取动态列表成功！',
        data: result.length
      })
    })
}

// 定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用

// 导入数据库操作模块
const db = require('../../db/index');

// 引入时间day.js
const dayjs = require('dayjs');

/**
 * 留言
 */
 exports.addMessage = (req, res) => {
  let sjc = new Date()
  let date = sjc.getTime()
  let { content,name,email } = req.body
  // console.log(req.body);
  const Info = {
    // 内容
    content,
    // 创建时间
    name,
    email,
    time: date
  }
  const sql = `insert into messsage_table set ?`
  db.query(sql, Info, (err, result) => {
    if (err) res.cc(err)
    if (result.affectedRows !== 1) res.cc('留言失败')
    res.cc("留言成功",200)
  })
}

/**
 * 获取留言列表
 */
exports.getMessageList = (req, res) => {  
  const { pageNo, pageSize } = req.query
  
  const sql = `select * from message_table order by id desc limit ${pageSize * (pageNo - 1)},${pageSize}`
  db.query(sql, (err, result) => {
      if (err) res.cc(err)
      result.forEach(el => {
        el.time = dayjs(el.time).format('YYYY年MM月DD日 HH:mm')
      })
      res.send({
        code: 200,
        message: '获取留言列表成功',
        data: result
      })
    })
}

// 获取留言总数
exports.getMessageNum = (req, res) => {
  const sql = 'select id from message_table'
  db.query(sql, (err, result) => {
    if (err) res.cc(err)
    res.send({
      code: 200,
      message: "获取留言总数成功",
      data: result.length
    })
  })
}

// 定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用

// 导入数据库操作模块
const db = require('../../db/index');
const axios = require('axios');
// 引入时间day.js
const dayjs = require('dayjs');
// 导入配置文件
const config = require('../../config')

/**
 * 留言
 */
exports.addMessage = (req, res) => {
  let { content, name, email, city, avatar } = req.body 
  const Info = {
    // 内容
    content,
    // 创建时间
    name,
    email,
    time: new Date().getTime(),
    city,
    avatar
  }
  let request_data = {
    msgtype: "text",
    text: {
      content: `类型：留言\n昵称：${Info.name}\n邮箱：${Info.email == '' ? '未填' : Info.email}\n内容：${Info.content}`
    }
  }
  const sql = `insert into message_table set ?`
  db.query(sql, Info, (err, result) => {
    if (err) res.cc(err)
    if (result.affectedRows !== 1) res.cc('留言失败')
    res.cc("留言成功", 200)
    // 向对应的 Webhook Url 发送对应的数据结构
    try {
      axios.post(config.weixinURL,request_data)
    } catch (err) {
      console.log(err)
    }
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
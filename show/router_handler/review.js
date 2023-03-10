// 定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用

// 导入数据库操作模块
const db = require('../../db/index');
const axios = require('axios');
// 引入时间day.js
const dayjs = require('dayjs');
// 导入配置文件
const config = require('../../config')

// 用户评论
exports.leaveReview = (req, res) => {
  const sql = `insert into review set ?`
  const time = new Date().getTime()
  const info = {
    content: req.body.content,
    article_id: req.body.article_id,
    time,
    name: req.body.name,
    email: req.body.email,
    web: req.body.web,
    city: req.body.city,
    avatar: req.body.avatar,
  }
  let request_data = {
    msgtype: "text",
    text: {
      content: `类型：评论\n评论文章：${req.body.title}\n昵称：${info.name}\n邮箱：${info.email == '' ? '未填' : info.email}\n评论内容：${info.content}`
    }
  }
  new Promise((resolve, reject) => {
    db.query(sql, info, (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) res.cc('评论失败')
      resolve()
    })
  }).then(() => {
    res.cc("评论成功", 200)
    try {
      axios.post(config.weixinURL,request_data)
    } catch (err) {
      console.log(err)
    }
  })
}

// 获取评论列表
exports.getReviewList = (req, res) => {
  const sql = `select * from review where article_id=? order by id desc`
  db.query(sql, req.params.id, (err, result) => {
    if (err) return res.cc(err)
    result.forEach(el => {
      el.time = dayjs(el.time).format('YYYY年MM月DD日 HH:mm')
    })
    res.send({
      code: 200,
      data: result,
      message: `获取文章${req.params.id}评论列表成功`
    })
  })
}

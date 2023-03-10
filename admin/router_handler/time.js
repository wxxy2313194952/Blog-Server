// 文章路由模块处理函数

// 导入数据库操作模块
const db = require('../../db/index')

// 引入时间day.js
const dayjs = require('dayjs')

function decideRules(rules) {
  return rules == 'super'//if (!decideRules(req.user.rules)) return res.cc('无权限')
}

// 获取时间轴列表处理函数
exports.getTimeList = (req,res) => {
  const sql = 'select * from time_table'
  db.query(sql,(err,result) => {
    if (err) return res.cc(err)
    result.forEach(el => {
      el.date = dayjs(el.date).format('YYYY年MM月DD日')
    })
    res.send({
      code: 200,
      message: '获取时间轴列表成功',
      data: result
    })
  })
}

// 获取时间轴总数
exports.getTimeNum = (req, res) => {
  const sql = 'select id from time_table'
  db.query(sql, (err, result) => {
    if (err) res.cc(err)
    res.send({
      code: 200,
      message: "获取时间轴总数成功",
      data: result.length
    })
  })
}

// 删除时间轴
exports.delTime = (req, res) => {
  if (!decideRules(req.user.rules)) return res.cc('无权限')
  const sql = `delete from time_table where id=${req.params.id}`
  db.query(sql,(err,result) => {
    if (err) res.cc(err) 
    if(result.affectedRows == 1) res.cc("删除成功",200) 
  })
}

// 编辑时间轴
exports.editTime = (req, res) => {
  if (!decideRules(req.user.rules)) return res.cc('无权限')
  const sql = `update time_table set ? where id=?`
  db.query(sql, [{ content: req.query.content }, req.query.id], (err, result) => {
    if (err) res.cc(err)
    if (result.affectedRows !== 1) res.cc('编辑时间轴失败')
    res.cc('编辑时间轴成功', 200)
  })
}

// 添加时间轴
exports.addTime = (req, res) => {
  if (!decideRules(req.user.rules)) return res.cc('无权限')
  const sql = `insert into time_table set ?`
  let data = {
    content: req.body.content,
    date: new Date().getTime()
  }
  db.query(sql, data, (err, result) => {
    if (err) res.cc(err)
    if (result.affectedRows !== 1) res.cc('添加时间轴失败')
    res.cc('添加时间轴成功', 200)
  })
}
 

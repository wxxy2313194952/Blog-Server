// 导入数据库操作模块
const db = require('../../db/index')
// 引入时间day.js
const dayjs = require('dayjs');

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

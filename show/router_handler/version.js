// 定义更新日志路由处理函数，供 /router/version 模块进行调用

// 导入数据库操作模块
const db = require('../../db/index');

// 引入时间day.js
const dayjs = require('dayjs');

// 获取列表接口处理函数
exports.getVerList = (req, res) => {
  const sql = `select * from version_table where status = 0`
  db.query(sql, (err, result) => {
    if (err) res.cc(err)
    for (let i = 0; i < result.length; i++) {
      result[i].time = dayjs(result[i].time).format('YYYY年MM月DD日 HH:mm')
    }
    res.send({
      code: 200,
      data: result
    })
  })
}

// 修改列表接口处理函数




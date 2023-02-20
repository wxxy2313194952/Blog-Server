// 定义全局组件Left路由处理函数，供 /router/left 模块进行调用

// 导入数据库操作模块
const db = require('../../db/index');

// 获取标签云接口处理函数
exports.getLableList = (req, res) => {
  const sql = 'select id,name from tag where is_delete=0'
  db.query(sql, (err, result) => {
    if (err) return res.cc(err)
    res.send({
      code: '200',
      message: '获取标签云列表成功！',
      data: result
    })
  })
}
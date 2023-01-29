// 定义文章标签处理函数，供 /router/tag 模块进行调用

// 导入数据库操作模块
const db = require('../../db/index')


// 获取标签列表接口处理函数
exports.getTagList = (req,res) => {
  const sql = 'select id,name from tag where is_delete=0'
  db.query(sql,(err,result) => {
    if (err) return res.cc(err)
    res.send({
      code: 200,
      message: '获取文章标签列表成功',
      data: result
    })
  })
}

// 增加标签接口处理函数
exports.tagAdd = (req, res) => {
  const sql = "select * from tag where name=?"
  const str = 'insert into tag set ?'
  new Promise((resolve,reject) => {
    db.query(sql,req.body.name,(err,result) => {
      if (err) reject(err)
      if (result.length === 1) reject(`已有标签名${req.body.name}`)
      resolve()
    })
  }).then(() => {
    db.query(str,req.body,(err,result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc('新增标签失败！')
      res.cc('新增标签成功！', 200)
    })
  },err => {
    res.cc(err)
  })
}
// 删除标签接口处理函数
exports.tagDelete = (req, res) => {
  const sql = "update tag set is_delete=1 where name=?"
  db.query(sql, req.body.name, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除标签失败！')
    res.cc('删除标签成功！', 200)
  })
}
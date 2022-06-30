// 定义和文章分类的路由处理函数，供 /router/artcate 模块进行调用

// 导入数据库操作模块
const db = require('../db/index');

// 获取获取文章分类一级列表接口处理函数
exports.getCatesFirst = (req, res) => {
  // 定义 sql 语句
  const sql = 'select * from artcate_first_table where is_delete=0'
  db.query(sql, (err, result) => {
    if (err) return res.cc(err)
    res.send({
      code: 200,
      message: '获取一级分类成功',
      data: result
    })
  })
}

// 获取获取文章分类 二级 列表接口处理函数
exports.getCatesSecond = (req, res) => {
  // 定义 sql 语句
  const sql = 'select * from artcate_second_table where is_delete=0'
  db.query(sql, (err, result) => {
    if (err) return res.cc(err)
    res.send({
      code: 200,
      message: '获取二级分类成功',
      data: result
    })
  })
}

// 新增二级分类处理函数
exports.addCatesSecond = (req, res) => {
  // 定义查重的 SQL 语句
  const sql = 'select * from artcate_second_table where name=?'
  new Promise((resolve, reject) => {
    db.query(sql, req.body.name, (err, result) => {
      if (err) reject(err)
      if (result.length === 1) reject(`已有分类名${req.body.name}`)
      resolve()
    })
  }).then(() => {
    const sqlStr = `insert into artcate_second_table set ?`
    db.query(sqlStr, req.body, (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc('新增文章分类失败！')
      res.cc('新增文章分类成功！', 200)
    })
  }, value => {
    return res.cc(value)
  })
}

// 删除二级文章分类的处理函数
exports.deleteCatesSecond = (req, res) => {
  // 定义标记删除的 SQL 语句
  const sql = `update artcate_second_table set is_delete=1 where name=?`
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.body.name, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
    res.cc('删除文章分类成功！', 200)
  })
}
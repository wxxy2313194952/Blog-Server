// 定义和文章分类的路由处理函数，供 /router/artcate 模块进行调用

// 导入数据库操作模块
const db = require('../../db/index');

/**
 * 获取文章分类
 * 返回数据：
 * [
 *   {"id": 1,"name": "学习笔记","is_delete": 0},
 *   {"id": 2,"name": "生活记录","is_delete": 0},
 *   {"id": 3,"name": "更新记录","is_delete": 0}
 * ]
 */
exports.getArticleClass = (req, res) => {
  // 定义 sql 语句
  const sql = 'select id,name from artcate_class_table where is_delete=0'
  db.query(sql, (err, result) => {
    if (err) return res.cc(err)
    res.send({
      code: 200,
      message: '获取分类成功',
      data: result
    })
  })
}

/**
 * 获取标签
 * 返回示例:
 * [
 *   {"id": 1,"name": "Vue","is_delete": 0},
 *   {"id": 2,"name": "React","is_delete": 0},
 *   {"id": 3,"name": "javascript","is_delete": 0}
 * ]
 */
exports.getArticleTag = (req, res) => {
  // 定义 sql 语句
  const sql = 'select id,name from tag where is_delete=0'
  db.query(sql, (err, result) => {
    if (err) return res.cc(err)
    res.send({
      code: 200,
      message: '获取标签成功',
      data: result
    })
  })
}

// 新增文章标签
exports.addArticleTag = (req, res) => {
  // 定义查重的 SQL 语句
  const sql = 'insert into tag set ?'
  db.query(sql, req.body, (err, result) => {
    if (err) res.cc(err)
    if (result.affectedRows != 1) res.cc(`添加标签失败`)
  })
  res.cc('添加文章标签成功！', 200)
}

// 编辑文章标签
exports.editArticleTag = (req, res) => {
  // 定义标记删除的 SQL 语句
  const sql = `update tag set name=? where id=?`
  console.log(req.body);
  // 调用 db.query() 执行 SQL 语句
  db.query(sql,[req.body.name,req.body.id], (err, results) => {
    console.log(err);
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('编辑文章标签失败！')
    res.cc('编辑文章标签成功！', 200)
  })
}

// 删除文章标签
exports.delArticleTag = (req, res) => {
  // 定义标记删除的 SQL 语句
  const sql = `delete from tag where id=?`
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.body.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章标签失败！')
    res.cc('删除文章标签成功！', 200)
  })
}
// 新增文章分类
exports.addArticleClass = (req, res) => {
  // 定义查重的 SQL 语句
  const sql = 'insert into artcate_class_table set ?'
  db.query(sql, req.body, (err, result) => {
    if (err) res.cc(err)
    if (result.affectedRows != 1) res.cc(`添加失败`)
  })
  res.cc('添加文章分类成功！', 200)
}

// 编辑文章分类
exports.editArticleClass = (req, res) => {
  // 定义标记删除的 SQL 语句
  const sql = `update artcate_class_table set name=? where id=?`
  console.log(req.body);
  // 调用 db.query() 执行 SQL 语句
  db.query(sql,[req.body.name,req.body.id], (err, results) => {
    console.log(err);
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('编辑文章分类失败！')
    res.cc('编辑文章分类成功！', 200)
  })
}

// 删除文章分类
exports.delArticleClass = (req, res) => {
  // 定义标记删除的 SQL 语句
  const sql = `delete from artcate_class_table where id=?`
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.body.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
    res.cc('删除文章分类成功！', 200)
  })
}
// 文章路由模块处理函数

// 导入数据库操作模块
const db = require('../../db/index')

// 引入时间day.js
const dayjs = require('dayjs')

function decideRules(rules) {
  return rules == 'super'//if (!decideRules(req.user.rules)) return res.cc('无权限')
}

/**
 * 获取评论列表
 */
exports.getReviewList = (req, res) => {  
  const { pageNo, pageSize } = req.query
  const str = `select id,title from article_table`
  const sql = `select * from review order by id desc limit ${pageSize * (pageNo - 1)},${pageSize}`
  new Promise((resolve, reject) => {
    db.query(str,(err,result) => {
      if (err) reject(err)
      resolve(result)
    })
  }).then(article => {
    db.query(sql, (err, result) => {
      if (err) res.cc(err)
      result.forEach(el => {
        el.time = dayjs(el.time).format('YYYY年MM月DD日 HH:mm')
        article.forEach(it => {
          if(el.article_id == it.id) el.article_id = it.title
        })
      })
      res.send({
        code: 200,
        message: '获取评论列表成功',
        data: result
      })
    })
  }).catch(err => {
    res.cc(err)
  })
}

// 获取评论总数
exports.getReviewNum = (req, res) => {
  const sql = 'select id from review'
  db.query(sql, (err, result) => {
    if (err) res.cc(err)
    res.send({
      code: 200,
      message: "获取评论总数成功",
      data: result.length
    })
  })
}

// 删除评论
exports.delReview = (req, res) => {
  if (!decideRules(req.user.rules)) return res.cc('无权限')
  const sql = `delete from review where id=${req.params.id}`
  db.query(sql,(err,result) => {
    if (err) res.cc(err) 
    if(result.affectedRows == 1) res.cc("删除成功",200) 
  })
}

// 编辑评论
exports.editReview = (req, res) => {
  if (!decideRules(req.user.rules)) return res.cc('无权限')
  const sql = `update review set ? where id=?`
  db.query(sql, [{ content: req.query.content }, req.query.id], (err, result) => {
    if (err) res.cc(err)
    if (result.affectedRows !== 1) res.cc('编辑评论失败')
    res.cc('编辑评论成功', 200)
  })
}
 

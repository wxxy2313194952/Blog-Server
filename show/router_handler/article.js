// 定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用

// 导入数据库操作模块
const db = require('../../db/index');

// 引入时间day.js
const dayjs = require('dayjs');

// 获取文章详情
exports.getArticle = (req, res) => { 
  const sql = `select * from article_table where is_delete=0 and id=?`
  const sqlTag = "select * from tag where is_delete=0"
  const str = `select * from tag_relationship where is_delete=0`
  new Promise((resolve, reject) => {
    db.query(sql, req.params.id, (err, result) => {
      if (err) reject(err) 
      result[0].create_time = dayjs(result[0].create_time).format('YYYY年MM月DD日 HH:mm')
      result[0].last_time = dayjs(result[0].last_time).format('YYYY年MM月DD日 HH:mm')
      result[0].tags = []
      db.query(sqlTag,(err,resTag) => {
        if (err) res.cc(err)
        resolve({resArr:result[0],resTag})
      })
    })
  }).then(({ resArr, resTag }) => {
    db.query(str, (err, result) => { 
      if (err) res.cc(err)
      result.forEach(el => {
        if (el.article_id == resArr.id) {
          resTag.forEach(item => {
            if (item.id == el.tag_id) {
              resArr.tags.push(item.name)
            }
          })
        }
      })
      res.send({
        code: 200,
        message: '获取文章列表成功~',
        data: resArr
      })
    })
  },err => {
    res.cc(err)
  })
}

/**
 * 获取文章列表
 * 解构出 分页器当前页数pageNo 每一页需要展示多少条数据pageSize
 * limit 偏移量(0开始) 查询数据条数
 */
 exports.getArticleList = (req, res) => {  
  const {pageNo,pageSize} = req.query
  const sql = `select * from article_table where article_table.is_delete=0 
    order by id desc limit ${pageSize * (pageNo - 1)},${pageSize}`
  const sqlTag = "select * from tag where is_delete=0"
  const str = `select * from tag_relationship where is_delete=0`
  new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(err)
      result.forEach(el => {
        el.create_time = dayjs(el.create_time).format('YYYY年MM月DD日 HH:mm')
        el.last_time = dayjs(el.last_time).format('YYYY年MM月DD日 HH:mm')
        el.tags = []
      })
      db.query(sqlTag,(err,resTag) => {
        if (err) res.cc(err)
        resolve({resArr:result,resTag})
      })
    })
  }).then(({resArr,resTag}) => {
    db.query(str, (err, result) => {
      if(err) res.cc(err)
      resArr.forEach(el => {
        result.forEach(item => {
          if (el.id == item.article_id) {
            resTag.forEach(date => {
              if (date.id == item.tag_id) {
                el.tags.push(date.name)
              }
            })
          }
        })
      });
      res.send({
        code: 200,
        message: '获取文章列表成功~',
        data: resArr
      })
    })
  },err => {
    res.cc(err)
  })
}

// 获取文章总数接口处理函数
exports.getArticleNum = (req, res) => {
  // console.log(req.socket.remoteAddress) //获取IP
  const sql = 'select id from article_table where is_delete=0';
  db.query(sql, (err, result) => {
    if (err) res.cc(err)
    res.send({
      code: 200,
      message: "获取文章总数成功",
      data: result.length
    })
  })
}
// 文章路由模块处理函数

// 导入数据库操作模块
const db = require('../db/index');

// 导入处理路径的核心模块
const path = require('path')

// 引入时间day.js
const dayjs = require('dayjs');

// 新增文章处理函数
exports.addArticle = (req, res) => {
  if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')
  // TODO：证明数据都是合法的，可以进行后续业务逻辑的处理
  // 处理文章的信息对象
  // 时间

  let sjc = new Date()
  let pub_date = sjc.getTime()
  // console.log(pub_date);
  const articleInfo = {
    // 标题、内容、发布状态、所属分类的Id
    ...req.body,
    // 文章封面的存放路径
    cover_img: path.join('/uploads', '/articlecover', req.file.filename),
    // 文章的发布时间
    pub_date,
    // 文章作者的Id
    author_id: req.user.id,
    // 点赞
    like_count: 0,
    // 留言
    message_count: 0,
    // 浏览量
    look_count: 0,
  }
  const sql = `insert into article_table set ?`
  new Promise((resolve, reject) => {
    db.query(sql, articleInfo, (err, result) => {
      if (err) reject(err)
      // if (result.affectedRows !== 1) reject('发布新文章失败！')
    })
    // console.log(req.body);
    resolve()
  }).then(() => {
    const str = 'select id from article_table order by id desc'
    db.query(str, (err, result) => {
      if (err) return res.cc(err)
      const inSql = 'insert into tag_relationship (article_id,tag_id) values ?'
      let article = Number(result[0].id)
      let articleInfo = []
      for (let i = 0; i < req.body.tag.length; i++) {
        articleInfo.push([article, Number(req.body.tag[i])])
      }
      db.query(inSql, [articleInfo], (err, results) => {
        if (err) return res.cc(err)
        res.cc('发布文章成功！', 200)
      })
    })
  }, err => {
    res.cc(err)
  })

}
// 文章详情界面获取文章信息
exports.getArticle = (req, res) => {
  // 多表查询文章列表 sql 语句
  const sql = `select article_table.*,users_table.nickname from article_table,users_table 
    where article_table.id = ? and article_table.author_id = users_table.id`
  // 多表查询文章标签 sql 语句
  const mySql = `select name,tag_id from tag_relationship,tag 
    where tag_relationship.tag_id = tag.id and article_id=? and tag_relationship.is_delete = 0`
  new Promise((resolve, reject) => {
    db.query(sql, req.params.id, (err, results) => {
      if (err) reject(err)
      let pub_date = results[0].pub_date
      pub_date = dayjs(pub_date).format('YYYY年MM月DD日 HH:mm')
      db.query(mySql, req.params.id, (err, result) => {
        if (err) return res.cc(err)
        res.send({
          code: 200,
          data: {
            ...results[0],
            pub_date,
            tag: result
          },
        })
        resolve(results[0].look_count)
      })
    })
  }).then(look => {
    const sqlStr = 'update article_table set look_count=? where id=?'
    db.query(sqlStr, [++look, req.params.id], (err, result) => {
      if (err) return res.cc(err)
    })
  }, (err) => {
    res.cc(err)
  })
}
// 获取文章列表接口
exports.getArticleList = (req, res) => {
  let pageFir = req.query.pageSize * (req.query.pageNo - 1)
  let pageSec = req.query.pageSize
  const sql = `select article_table.*,users_table.nickname from article_table,users_table 
    where article_table.author_id = users_table.id and article_table.is_delete=0 order by article_table.id desc
    limit ${pageFir},${pageSec}`
  const str = `select tag_relationship.article_id,tag.\`name\` from tag_relationship,tag 
    where tag_relationship.is_delete=0 and tag_relationship.tag_id = tag.id`
  new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(err)
      for (let i = 0; i < result.length; i++) {
        result[i].pub_date = dayjs(result[i].pub_date).format('YYYY年MM月DD日 HH:mm')
      }
      resolve(result)
    })
  }).then(value => {
    db.query(str, (err, result) => {
      if (err) return res.cc(err)
      
      for (let i = 0; i < value.length; i++) {
        let tagList = []
        for (let j = 0; j < result.length; j++) {
          if (value[i].id == result[j].article_id) {
            tagList.push(result[j].name)
          }
        }
        value[i].tag = tagList
      }
      res.send({
        code: '200',
        message: '获取文章列表成功！',
        data: value
      })
    })
  }, err => {
    res.cc(err)
  })
}
// 获取文章总数接口处理函数
exports.getArticleNum = (req, res) => {
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





// exports.add = (req, res) => {
//   const inSql = 'insert into tag_relationship (article_id,tag_id) values ?'
//   let article = Number(req.body.article_id)
//   let articleInfo = []
//   for (let i = 0; i < req.body.tag.length; i++) {
//     articleInfo.push([article, Number(req.body.tag[i])])
//   }
//   db.query(inSql, [articleInfo], (err, result) => {
//     if (err) return res.cc(err)
//     res.cc('发布文章成功！', 200)
//   })
// }
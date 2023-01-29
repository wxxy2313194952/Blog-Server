// 文章路由模块处理函数

// 导入数据库操作模块
const db = require('../../db/index')

// 导入处理路径的核心模块
const path = require('path')

// 引入时间day.js
const dayjs = require('dayjs')

/**
 * 文章处理函数
 * 标签传递的JSON字符串，在后端进行处理
 * 先入标签文章映射表 tag_relationship
 * [{"id":1,"name":"标签一","type":"success"},
 *  {"id":2,"name":"标签二","type":"success"},
 *  {"id":3,"name":"标签三","type":"info"},
 *  {"id":4,"name":"标签四","type":"warning"},
 *  {"id":5,"name":"标签五","type":"danger"}]
 */
exports.addArticle = (req, res) => {
  if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')
  // TODO：证明数据都是合法的，可以进行后续业务逻辑的处理
  // 处理文章的信息对象
  // 时间
  // console.log(req.file)
  let sjc = new Date()
  let date = sjc.getTime()
  // console.log(pub_date);
  let { title, content, describe, state, classification, label } = req.body
  // console.log(req.body);
  let labelReq = JSON.parse(label)
  const articleInfo = {
    // 标题
    title,
    // 内容
    content,
    // 摘要
    describe,
    // 发布状态
    state,
    // 所属分类的Id
    classification,
    // 标签后续添加
    // 文章封面的存放路径
    cover_img: path.join('/uploads', '/articlecover', req.file.filename),
    // 文章的创建时间
    create_time: date,
    // 文章的最终修改时间
    last_time: date,
    // 留言
    message_count: 0,
    // 浏览量
    look_count: 0
  }
  // console.log(articleInfo)
  const sqlArticle = `insert into article_table set ?`
  const sqlTag = `insert into tag_relationship (article_id,tag_id) values (?,?)`
  new Promise((resolve, reject) => {
    db.query(sqlArticle, articleInfo, (err, result) => {
      if (result.affectedRows !== 1) reject('上传文章失败')
      if (err) reject(err)
      resolve(result.insertId)
      // console.log(result)
    })
  }).then(artId => {
    return new Promise((resolve, reject) => {
      labelReq.forEach(el => {
        db.query(sqlTag, [artId, el.id], (err, result) => {
          if (result.affectedRows !== 1) reject('上传文章(标签)失败')
          if (err) reject(err)
        })
      })
      resolve()
    })
  },err => {
    res.cc(err)
  }).then(() => {
    res.cc('发布文章成功！',200)
  },err => {
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
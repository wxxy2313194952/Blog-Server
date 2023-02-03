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
  console.log(req.socket.remoteAddress) //获取IP
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

// 删除文章
exports.delArticle = (req,res) => {
  const sql = `update article_table set is_delete=1 where id=${req.params.id}`
  db.query(sql,(err,result) => {
    if (err) res.cc(err) 
    if(result.affectedRows == 1) res.cc("删除成功",200) 
  })
}

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
 * 编辑文章
 * 标签label为数组
 */
exports.editArticle = (req, res) => {
  let sjc = new Date()
  let date = sjc.getTime()
  let { title, content, describe, classification, label } = req.query
  let labelReq = JSON.parse(label)
  const articleInfo = {
    // 标题
    title,
    // 内容 
    content,
    // 摘要
    describe,
    // 所属分类的Id
    classification,
    // 文章的最终修改时间
    last_time: date,
  }
  const delSql = `delete from tag_relationship where article_id=${req.query.id}`
  const sqlArticle = `update article_table set ? where id=?`
  const sqlTag = `insert into tag_relationship (article_id,tag_id) values (?,?)`
  new Promise((resolve, reject) => {
    db.query(delSql,(err,result) => {
      if (err) reject(err)
      console.log(result.affectedRows);
      if (result.affectedRows != 0) {
        resolve()
      }
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      db.query(sqlArticle, [articleInfo, req.query.id], (err, result) => {
        if (result.affectedRows !== 1) reject('更新文章失败')
        if (err) reject(err)
        resolve()
      })
    })
  },err => {
    res.cc(err)
  }).then(() => {
    return new Promise((resolve, reject) => {
      labelReq.forEach(el => {
        db.query(sqlTag, [req.query.id, el.id], (err, result) => {
          if (result.affectedRows !== 1) reject('更新文章(标签)失败')
          if (err) reject(err)
        })
      })
      res.cc("编辑成功", 200)
      resolve()
    })
  },err => {
    res.cc(err)
  }).catch(err => {
    res.cc(err)
  })
}


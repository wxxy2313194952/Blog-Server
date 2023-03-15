// 导入数据库操作模块
const db = require('../../db/index');

// 引入时间day.js
const dayjs = require('dayjs');

// 获取
exports.getArtMain = (req, res) => {
  const sql = 'select id,title,`describe` from article_table where id=? or id=? or id=?'
  db.query(sql, [37,46,47], (err, result) => {
    if (err) return res.cc(err)
    res.send({
      code: '200',
      message: '获取成功！',
      data: result
    })
  })
}
// 获取
exports.getArtOther = (req, res) => {
  const sql = 'select id,title,`describe`,cover_img,message_count,classification,create_time,look_count from article_table where id=? or id=? or id=?'
  const classSQL = `select * from artcate_class_table`
  
  new Promise((resolve, reject) => {
    db.query(sql, [37, 46, 47], (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  }).then(artList => {
    db.query(classSQL, (err, result) => {
      if (err) reject(err)
      artList.forEach(el => {
        el.create_time = dayjs(el.create_time).format('YYYY年MM月DD日 HH:mm')
        result.forEach(cla => {
          if(el.classification == cla.id) el.classification = cla.name
        });
      })
      res.send({
        code: '200',
        message: '获取成功！',
        data: artList
      })
    })
  }).catch(e => {
    res.cc(e)
  })
  
}
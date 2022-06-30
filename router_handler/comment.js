// 定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用

// 导入数据库操作模块
const db = require('../db/index');

// 引入时间day.js
const dayjs = require('dayjs');

// 获取留言模块接口处理函数
exports.getCommentList = (req, res) => {
  // 定义 sql 语句
  let pageFir = req.query.pageSize * (req.query.pageNo - 1)
  let pageSec = req.query.pageSize
  const sql = `select comment_table.*,users_show_table.nickname from comment_table,users_show_table 
    where comment_table.status=0 and comment_table.owner_user_id = users_show_table.id 
    limit ${pageFir},${pageSec}`
  // 每页显示的数量pageSize   当前页码pageNo
  new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {//[],
      if (err) reject(err)
      if (result.length < 1) return res.cc('无数据')
      for (let i = 0; i < result.length; i++) {
        result[i].created_time = dayjs(result[i].created_time).format('YYYY年MM月DD日 HH:mm')
      }
      resolve(result)
    })
  }).then(value => {
    res.send({
      code: 200,
      message: "获取留言信息成功",
      data: value
    })
  }, err => {
    res.cc(err)
  })
};

// 获取留言总条数接口处理函数
exports.getCommentNum = (req, res) => {
  const sql = 'select id from comment_table where status=0';
    db.query(sql, (err, result) => {
      if (err) res.cc(err)
      res.send({
        code: 200,
        message: "获取留言总条数成功",
        data: result.length
      })
    })
}

// 写留言接口处理函数
exports.leaveMessage = (req, res) => {
  // 接收表单数据
  const userInfo = req.body;
  // console.log(req.user);
  // 定义接收用户数据
  let userTable = {}
  // 定义 sql 语句
  const sql = 'select * from users_table where username=?';
  new Promise((resolve, reject) => {
    db.query(sql, req.user.username, (err, result) => {
      if (err) reject(err)
      // console.log(result[0]);
      userTable = result[0]
      // console.log(userTable.username);
      resolve(userTable)
    })
  }).then(userTable => {
    // 定义 mySql 语句
    const sql_1 = 'insert into comment_table set ?';
    db.query(sql_1, {
      owner_user_id: userTable.username,
      content: userInfo.content,
      created_at: new Date(),
      nickname: userTable.nickname,
      user_pic: userTable.user_pic
    }, (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc('留言出错啦，稍后再试吧~~~');
      res.cc('留言成功！', 200)
    })
  }, err => {
    res.cc(err)
  })
}

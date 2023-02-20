// 定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用

// 导入数据库操作模块
const db = require('../../db/index');

//导入bcryptjs密码加密这个包
const bcrypt = require('bcryptjs');

//导入生成Token的包
const jwt = require('jsonwebtoken');

//导入全局配置文件
const config = require('../../config');

function decideRules(rules) {
  return rules == 'super'
}

// 注册接口处理函数 
exports.reguser = (req, res) => {
  // 接收表单数据
  // console.log(req.body);
  const userInfo = req.body;
  const sqlStr = 'select * from users_table where username=?';
  db.query(sqlStr, userInfo.username, (err, result) => {
    if (err) {
      res.cc(err.message)
    }
    // 判断用户名是否被占用
    if (result.length > 0) {
      res.cc("用户名重复，换一个吧~~~")
    }
    // 调用bcrypt.hashSync()对密码进行加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10);
    //定义插入新用户的 SQL 语句
    const sql = 'insert into users_table set ?';
    db.query(sql, {
      username: userInfo.username,
      password: userInfo.password,
      nickname: '大佬你好',
      avatar: '/uploads/user_pic/mypice.jpg'
    }, (err, result) => {
      if (err) {
        return res.cc(err.message);
      }
      // 判断影响行数不为 1 的话
      if (result.affectedRows !== 1) {
        return res.cc(err.message);
      }
      res.cc('注册成功！', 200);
    })
  })
};


// 登录接口处理函数
exports.login = (req, res) => {
  // 接收表单数据
  const userInfo = req.body;
  // userInfo = JSON.parse(userInfo)
  // console.log(userInfo);
  // console.log(req);
  // 定义 sql 语句查询用户名
  const sql = 'select * from users_table where username=?'
  // 执行 sql 语句
  db.query(sql, userInfo.username, (err, result) => {
    if (err) return res.cc(err)
    //执行 SQL 语句成功，但是查询到数据条数不等于 1
    if (result.length !== 1) {
      return res.cc('用户名或密码错误，请重试')
    }
    //判断密码是否一致
    const compareResult = bcrypt.compareSync(userInfo.password, result[0].password)
    if (!compareResult) return res.cc('用户名或密码错误，请重试')
    // 服务端生成 token 字符串
    // 保护用户隐私，需要剔除敏感信息，只保留 username
    const user = {
      ...result[0],
      password: null,
    }
    // console.log(user);
    // 生成 token 字符串
    const tokenSter = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn
    });
    // 返回结果 携带token
    res.send({
      success:true,
      code: 200,
      message: '登陆成功！',
      data: {
        Token: 'Bearer ' + tokenSter
      }
    })
  })
};

// 获取用户信息
exports.getUserInfo = (req, res) => {
  res.send({
    code: 200,
    message: '获取用户信息成功！',
    data: {
      ...req.user,
      host: `http://${req.host}:3080`
    }
  })
}

// 退出登录
exports.logout = (req, res) => {
  res.send({
    code: 200,
    message: '退出登录成功',
  })
}
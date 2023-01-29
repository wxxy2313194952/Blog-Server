// 引入express
const express = require('express');
// 注册路由
const router = express.Router();

// 引入用户路由处理函数模块
const routerUser = require('../router_handler/user');

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../../schema/user')


// 登录接口
router.post('/user/login', routerUser.login);

// 注册接口
router.post('/user/reguser', expressJoi(reg_login_schema), routerUser.reguser);

// 获取用户信息接口
router.get('/user/getinfo', routerUser.getUserInfo);

// 退出登录
router.post('/user/logout', routerUser.logout);

// 暴露当前路由模块
module.exports = router;
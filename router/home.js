// 引入express
const express = require('express');
// 注册路由
const router = express.Router();

// 引入用户路由处理函数模块
const routerHome = require('../router_handler/home');



// 登录接口
// router.post('/login', routerHome);


// 暴露当前路由模块
module.exports = router;
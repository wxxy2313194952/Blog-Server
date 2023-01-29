// 引入express
const express = require('express');
// 注册路由
const router = express.Router();

// 引入用户路由处理函数模块
const routerDaily = require('../router_handler/daily');


// 获取动态接口
router.get('/api/daily/getdailylist', routerDaily.getDailyList)
// 获取动态总条数接口
router.get('/api/daily/getdailynum', routerDaily.getDailyNum)




// 暴露当前路由模块
module.exports = router;
// 引入express
const express = require('express')
// 注册路由
const router = express.Router()

// 引入用户路由处理函数模块
const routerTime = require('../router_handler/time');


// 获取标签列表接口
router.get('/time/gettimelist', routerTime.getTimeList)



// 暴露当前路由模块
module.exports = router
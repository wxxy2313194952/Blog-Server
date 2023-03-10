// 文章路由模块 
const express = require('express');
const router = express.Router();

// 引入用户路由处理函数模块
const routerAccess = require('../router_handler/access');

// 上传访客行为
router.post('/access/setaccess', routerAccess.setAccessInfo)

// // 上传访客行为
// router.post('/access/info', routerAccess.Info)


// 暴露当前路由模块
module.exports = router;
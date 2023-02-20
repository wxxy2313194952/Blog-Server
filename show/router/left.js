// 引入express
const express = require('express');
// 注册路由
const router = express.Router();

// 引入用户路由处理函数模块
const routerLeft = require('../router_handler/left');



// 获取标签云接口
router.get('/left/getlablelist', routerLeft.getLableList);


// 暴露当前路由模块
module.exports = router;
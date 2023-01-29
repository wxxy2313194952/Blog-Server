// 引入express
const express = require('express');
// 注册路由
const router = express.Router();

// 引入更新日志路由处理函数模块
const routerVersion = require('../router_handler/version');



// 获取列表接口
router.get('/api/verlist', routerVersion.getVerList);

// 修改列表接口


// 暴露当前路由模块
module.exports = router;
// 引入express
const express = require('express');
// 注册路由
const router = express.Router();

// 引入用户路由处理函数模块
const routerRight = require('../router_handler/right');


// 获取热门文章接口
router.get('/right/gethotarticle', routerRight.getHotArticle)

// 获取博客信息接口
router.get('/right/getinfo', routerRight.getInfo);



// 暴露当前路由模块
module.exports = router;
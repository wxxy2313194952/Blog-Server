// 引入express
const express = require('express');
// 注册路由
const router = express.Router();

const routerHome = require('../router_handler/home');

// 获取三个大图文章
router.get('/home/getartmain', routerHome.getArtMain);
// 获取三个普通文章
router.get('/home/getartother', routerHome.getArtOther);


// 暴露当前路由模块
module.exports = router;
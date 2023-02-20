// 引入express
const express = require('express');
// 注册路由
const router = express.Router();

// 引入用户路由处理函数模块
const routerArticle = require('../router_handler/article');


// 获取文章列表
router.get('/article/getarticlelist', routerArticle.getArticleList)
// 获取文章总数接口
router.get('/article/getarticlenum', routerArticle.getArticleNum)
// 获取文章信息
router.get('/article/getarticle/:id', routerArticle.getArticle)


// 暴露当前路由模块
module.exports = router; 
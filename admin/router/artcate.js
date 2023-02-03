// 文章分类路由
// 引入express
const express = require('express');
// 注册路由
const router = express.Router();

// 引入用户路由处理函数模块
const routerArtcate = require('../router_handler/artcate');

// 获取文章分类
router.get('/artcate/getarticleclass', routerArtcate.getArticleClass)

// 获取标签
router.get('/artcate/getarticletag', routerArtcate.getArticleTag)

// 新增文章分类
router.post('/artcate/addarticleclass', routerArtcate.addArticleClass)

// 编辑文章分类
router.post('/artcate/editarticleclass', routerArtcate.editArticleClass)

// 删除文章分类
router.post('/artcate/delarticleclass', routerArtcate.delArticleClass)

// 新增文章标签
router.post('/artcate/addarticletag', routerArtcate.addArticleTag)

// 编辑文章标签
router.post('/artcate/editarticletag', routerArtcate.editArticleTag)

// 删除文章标签
router.post('/artcate/delarticletag', routerArtcate.delArticleTag)


// 暴露当前路由模块
module.exports = router;
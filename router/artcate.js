// 文章分类路由
// 引入express
const express = require('express');
// 注册路由
const router = express.Router();

// 引入用户路由处理函数模块
const routerArtcate = require('../router_handler/artcate');

// 获取文章分类 一级 列表
router.get('/api/article/getcatesfirst', routerArtcate.getCatesFirst)

// 获取文章分类 二级 列表
router.get('/api/article/getcatessecond', routerArtcate.getCatesSecond)

// 新增二级分类
router.post('/api/article/addcatessecond', routerArtcate.addCatesSecond)

// 删除二级文章分类的路由
router.post('/api/article/deletecatessecond', routerArtcate.deleteCatesSecond)


// 暴露当前路由模块
module.exports = router;
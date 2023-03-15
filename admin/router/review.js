// 文章路由模块 
const express = require('express');
const router = express.Router();

// 引入用户路由处理函数模块
const routerReview = require('../router_handler/review');

// 获取评论列表
router.get('/review/getreviewlist', routerReview.getReviewList)
// 获取评论总数
router.get('/review/getreviewnum', routerReview.getReviewNum)
// 删除评论
router.get('/review/delreview', routerReview.delReview)
// 编辑评论
router.post('/review/editreview', routerReview.editReview)

// 暴露当前路由模块
module.exports = router;
// 引入express
const express = require('express');
// 注册路由
const router = express.Router();

// 引入用户路由处理函数模块
const routerReview = require('../router_handler/review');

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象  expressJoi(review_schema)
const { review_schema } = require('../../schema/review')

// 游客评论
router.post('/review/leavereview', expressJoi(review_schema), routerReview.leaveReview)
// 获取评论列表
router.get('/review/getreviewlist/:id', routerReview.getReviewList)

// 暴露当前路由模块
module.exports = router; 
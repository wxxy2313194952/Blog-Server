// 引入express
const express = require('express');
// 注册路由
const router = express.Router();

// 引入用户路由处理函数模块
const routerComment = require('../router_handler/comment');


// 获取留言模块接口
router.get('/api/leave/getcommentlist',routerComment.getCommentList)

// 获取留言总条数接口
router.get('/api/leave/getcommentnum',routerComment.getCommentNum)

// 写留言接口
router.post('/my/leavemessage',routerComment.leaveMessage)



// 暴露当前路由模块
module.exports = router;
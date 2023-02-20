// 文章路由模块 
const express = require('express');
const router = express.Router();

// 引入用户路由处理函数模块
const routerMessage = require('../router_handler/message');

// 获取留言列表
router.get('/message/getmessagelist', routerMessage.getMessageList)
// 获取留言总数
router.get('/message/getmessagenum', routerMessage.getMessageNum)
// 删除留言
router.get('/message/delmessage/:id', routerMessage.delMessage)
// 编辑留言
router.post('/message/editmessage', routerMessage.editMessage)

// 暴露当前路由模块
module.exports = router;
// 引入express
const express = require('express');
// 注册路由
const router = express.Router();

// 引入用户路由处理函数模块
const routerMessage = require('../router_handler/message');

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象  expressJoi(message_schema)
const { message_schema } = require('../../schema/message')

// 发布留言
router.post('/message/add', expressJoi(message_schema), routerMessage.addMessage)
// 获取留言列表
router.get('/message/getmessagelist', routerMessage.getMessageList) 
// 获取留言总数
router.get('/message/getmessagenum', routerMessage.getMessageNum)

// 暴露当前路由模块
module.exports = router;
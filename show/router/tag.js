// 引入express
const express = require('express')
// 注册路由
const router = express.Router()

// 引入用户路由处理函数模块
const routerTag = require('../router_handler/tag');


// 获取标签列表接口
router.get('/tag/gettaglist', routerTag.getTagList)

// 增加标签接口
router.post('/tag/tagadd', routerTag.tagAdd)

// 删除标签接口
router.post('/tag/tagdelete', routerTag.tagDelete)



// 暴露当前路由模块
module.exports = router
// 文章路由模块 
const express = require('express');
const router = express.Router();

// 引入用户路由处理函数模块
const routerAccess = require('../router_handler/access');

// 上传访客行为
router.post('/access/setaccess', routerAccess.setAccessInfo)
// 获取访客总数接口
router.get('/access/getaccessnum', routerAccess.getAccessNum)
// 获取访问列表
router.get('/access/getaccesslist', routerAccess.getAccessList)
// 删除访问记录
router.get('/access/delaccess/:id', routerAccess.delAccess)


// 暴露当前路由模块
module.exports = router;
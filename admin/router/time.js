const express = require('express');
const router = express.Router();

// 引入用户路由处理函数模块
const routerTime = require('../router_handler/time');

// 获取时间轴列表
router.get('/time/gettimelist', routerTime.getTimeList)
// 获取时间轴总数
router.get('/time/gettimenum', routerTime.getTimeNum)
// 删除时间轴
router.get('/time/deltime/:id', routerTime.delTime)
// 编辑时间轴
router.post('/time/edittime', routerTime.editTime)
// 添加时间轴
router.post('/time/addtime', routerTime.addTime)

// 暴露当前路由模块
module.exports = router;
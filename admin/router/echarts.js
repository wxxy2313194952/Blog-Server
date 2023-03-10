const express = require('express');
const router = express.Router();

// 引入echarts路由处理函数模块
const routerEcharts = require('../router_handler/echarts');

// 折线图表统计
router.get('/echarts/getlinecharts', routerEcharts.getLineCharts);
// 获取过去七天日期
router.get('/echarts/getlastweek', routerEcharts.getLastWeek);
// 饼图统计 用户行为
router.get('/echarts/getpiebehavior', routerEcharts.getPieBehavior);
// 饼图统计 用户菜单点击
router.get('/echarts/getpiemenu', routerEcharts.getPieMenu);

// 暴露当前路由模块
module.exports = router;
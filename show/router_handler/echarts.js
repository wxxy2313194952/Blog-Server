// 导入数据库操作模块
const db = require('../../db/index');

const dayjs = require('dayjs');


// 总数据统计
exports.getUserData = (req, res) => {
  
  const todayStr = dayjs().subtract(0, 'day').format('MM/DD/YYYY')
  const yesterdayStr = dayjs().subtract(1, 'day').format('MM/DD/YYYY')
  const last7daysStr = dayjs().subtract(6, 'day').format('MM/DD/YYYY')

  const todayNum = Date.parse(todayStr)
  const yesterdayNum = Date.parse(yesterdayStr)
  const last7daysNum = Date.parse(last7daysStr)
  const oneDayNum = 86400000

  // 今天的浏览量
  const todaySql = `select id from access_info where time>${todayNum} and time<${todayNum + oneDayNum}`
  // 昨天的浏览量
  const yesterdaySql = `select id from access_info where time>${yesterdayNum} and time<${yesterdayNum + oneDayNum}`
  // 近七天的浏览量
  const last7daysSql = `select id from access_info where time>${last7daysNum}`
  // 今日评论量
  const todayReviewSql = `select id from review where time>${todayNum} and time<${todayNum + oneDayNum}`
  // 今日留言
  const todayMessageSql = `select id from message_table where time>${todayNum} and time<${todayNum + oneDayNum}`

  function selectPV (sql) {
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) return reject(err)
        return resolve(result.length)
      })
    })
  }

  Promise.all([
    selectPV(todaySql),
    selectPV(yesterdaySql),
    selectPV(last7daysSql),
    selectPV(todayReviewSql),
    selectPV(todayMessageSql)
  ]).then(PVresult => {
    res.send({
      code: 200,
      message: '成功',
      data: {
        todayPV: PVresult[0],
        yesterdayPV: PVresult[1],
        last7daysPV: PVresult[2],
        todayReviewNUM: PVresult[3],
        todayMessageNUM: PVresult[4]
      }
    })
  }).catch(err => {
    res.cc(err)
  })
}

// 接口处理函数 折线图表统计
exports.getLineCharts = (req, res) => {
  // 向前推七天 
  const last7DateStr = dayjs().subtract(6, 'day').format('MM/DD/YYYY')
  // 七天前的时间戳
  const last7DateNum = Date.parse(last7DateStr)
  const oneDayNum = 86400000

  function fun (time) {
    return new Promise((resolve, reject) => {
      const sql = `select id from access_info where time>${time} and time<${time + oneDayNum} order by id desc`
      db.query(sql, (err, result) => {
        if (err) return reject(err)
        return resolve(result.length)
      })
    })
  }
  Promise.all([
    fun(last7DateNum),
    fun(last7DateNum + oneDayNum),
    fun(last7DateNum + oneDayNum * 2),
    fun(last7DateNum + oneDayNum * 3),
    fun(last7DateNum + oneDayNum * 4),
    fun(last7DateNum + oneDayNum * 5),
    fun(last7DateNum + oneDayNum * 6),
  ]).then((last7daysArr) => {
    res.send({
      code: 200,
      message: '成功',
      data: last7daysArr
    })
  }).catch(err => {
    res.cc(err)
  })
}

// 获取前七天日期
exports.getLastWeek = (req, res) => {
  let arr = []
  for (let i = 6; i >= 1; i--) {
    arr.push(dayjs().subtract(i, 'day').format('YYYY/MM/DD'))
  }
  arr.push(dayjs().format('YYYY/MM/DD'))
  res.send({
    code: 200,
    message: "成功",
    data: arr
  })
}

// 饼图统计 用户行为
exports.getPieBehavior = (req, res) => {
  // 向前推req.query.day天 
  const lastDateStr = dayjs().subtract(req.query.day - 1, 'day').format('MM/DD/YYYY')
  // req.query.day天前的时间戳
  const lastDateNum = Date.parse(lastDateStr)

  const sql = `select user_behavior from access_info where time>${lastDateNum} and user_behavior<200`
  new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  }).then((lastArr) => {
    /**
     * 100：获取文章列表1
     * 101：浏览文章1
     * 102：博客留言1
     * 103：评论文章1
     * 104：切换菜单
     * 105：切换饼图1
     * 106：切换折线图1
     * 107：查看源码1
     * 108：登录后台1
     * 500: 无
     */
    let result = [
      { value: 0, name: "获取文章列表" },
      { value: 0, name: "浏览文章" },
      { value: 0, name: "博客留言" },
      { value: 0, name: "评论文章" },
      { value: 0, name: "切换菜单" },
      { value: 0, name: "切换饼图" },
      { value: 0, name: "切换折线图" },
      { value: 0, name: "查看源码" },
      { value: 0, name: "登录后台" },
    ]
    lastArr.forEach(el => {
      switch (el.user_behavior) {
        case 100:
          result[0].value++
          break;
        case 101:
          result[1].value++
          break;
        case 102:
          result[2].value++
          break;
        case 103:
          result[3].value++
          break;
        case 104:
          result[4].value++
          break;
        case 105:
          result[5].value++
          break;
        case 106:
          result[6].value++
          break;
        case 107:
          result[7].value++
          break;
        case 108:
          result[8].value++
          break;
      }
    });
    res.send({
      code: 200,
      message: '成功',
      data: result
    })
  }).catch(err => {
    res.cc(err)
  })
}

// 饼图统计 用户菜单点击
exports.getPieMenu = (req, res) => {
  // 向前推req.query.day天 
  const lastDateStr = dayjs().subtract(req.query.day - 1, 'day').format('MM/DD/YYYY')
  // req.query.day天前的时间戳
  const lastDateNum = Date.parse(lastDateStr)

  const sql = `select user_menu from access_info where time>${lastDateNum} and user_menu<200`
  new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  }).then((lastArr) => {
    /**
     * 100：首页1
     * 101：文章1
     * 102：留言1
     * 103：时间轴1
     * 104：访客统计1
     * 105：管理后台1
     * 500: 空
     */
    let result = [
      { value: 0, name: "首页" },
      { value: 0, name: "文章" },
      { value: 0, name: "留言" },
      { value: 0, name: "时间轴" },
      { value: 0, name: "访客统计" },
      { value: 0, name: "管理后台" }
    ]
    lastArr.forEach(el => {
      switch (el.user_menu) {
        case 100:
          result[0].value++
          break;
        case 101:
          result[1].value++
          break;
        case 102:
          result[2].value++
          break;
        case 103:
          result[3].value++
          break;
        case 104:
          result[4].value++
          break;
        case 105:
          result[5].value++
          break;
      }
    });
    res.send({
      code: 200,
      message: '成功',
      data: result
    })
  }).catch(err => {
    res.cc(err)
  })
}


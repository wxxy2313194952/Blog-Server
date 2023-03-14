// 导入数据库操作模块
const db = require('../../db/index');

const dayjs = require('dayjs');

// 接口处理函数 折线图表统计
exports.getLineCharts = (req, res) => {
  // 向前推n天 
  const lastDateStr = dayjs().subtract(req.query.day - 1, 'day').format('MM/DD/YYYY')
  // n天前的时间戳
  const lastDateNum = Date.parse(lastDateStr)
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
  let arr = []
  for (let i = 0; i < req.query.day; i++) {
    arr.push(fun(lastDateNum + oneDayNum * i))
  }
  Promise.all(arr).then((lastdaysArr) => {
    res.send({
      code: 200,
      message: '成功',
      data: lastdaysArr
    })
  }).catch(err => {
    res.cc(err)
  })
}

// 获取前七天日期
exports.getLastWeek = (req, res) => {
  let arr = []
  for (let i = req.query.day - 1; i >= 1; i--) {
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

  const sql = `select user_behavior from access_info where time>${lastDateNum} and user_behavior>200 and user_behavior<300`
  new Promise((resolve,reject) => {
    db.query(sql,(err,result) => {
      if (err) return reject(err)
      resolve(result)
    })
  }).then((lastArr) => {
    /**
      * user_behavior用户行为
      * 201 菜单切换
      * 202 查看管理端源码
      * 203 查看访客列表下一页
      * 204 查看文章列表下一页
      * 205 查看留言列表下一页
      * 206 查看评论列表下一页
      * 500: 无
      */
    let result = [
      { value: 0, name: "菜单切换" },
      { value: 0, name: "查看管理端源码" },
      { value: 0, name: "查看访客列表下一页" },
      { value: 0, name: "查看文章列表下一页" },
      { value: 0, name: "查看留言列表下一页" },
      { value: 0, name: "查看评论列表下一页" },
    ]
    lastArr.forEach(el => {
      switch (el.user_behavior) {
        case 201:
          result[0].value++
          break;
        case 202:
          result[1].value++
          break;
        case 203:
          result[2].value++
          break;
        case 204:
          result[3].value++
          break;
        case 205:
          result[4].value++
          break;
        case 206:
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

// 饼图统计 用户菜单点击
exports.getPieMenu = (req, res) => {
  // 向前推req.query.day天 
  const lastDateStr = dayjs().subtract(req.query.day - 1, 'day').format('MM/DD/YYYY')
  // req.query.day天前的时间戳
  const lastDateNum = Date.parse(lastDateStr)

  const sql = `select user_menu from access_info where time>${lastDateNum} and user_menu<300 and user_menu>200`
  new Promise((resolve,reject) => {
    db.query(sql,(err,result) => {
      if (err) return reject(err)
      resolve(result)
    })
  }).then((lastArr) => {
    /**
      * 201 首页
      * 202 访客统计
      * 203 文章编辑
      * 204 文章列表
      * 205 文章详情
      * 206 文章修改
      * 207 图片编辑
      * 208 时间轴管理
      * 209 分类管理
      * 210 标签管理
      * 211 留言管理
      * 212 评论管理
      * 213 首页编辑
      * 500: 空
      */
    let result = [
      { value: 0, name: "首页" },
      { value: 0, name: "访客统计" },
      { value: 0, name: "文章编辑" },
      { value: 0, name: "文章列表" },
      { value: 0, name: "文章详情" },
      { value: 0, name: "文章修改" },
      { value: 0, name: "图片编辑" },
      { value: 0, name: "时间轴管理" },
      { value: 0, name: "分类管理" },
      { value: 0, name: "标签管理" },
      { value: 0, name: "留言管理" },
      { value: 0, name: "评论管理" },
      { value: 0, name: "首页编辑" },
    ]
    lastArr.forEach(el => {
      switch (el.user_menu) {
        case 201:
          result[0].value++
          break;
        case 202:
          result[1].value++
          break;
        case 203:
          result[2].value++
          break;
        case 204:
          result[3].value++
          break;
        case 205:
          result[4].value++
          break;
        case 206:
          result[5].value++
          break;
        case 207:
          result[6].value++
          break;
        case 208:
          result[7].value++
          break;
        case 209:
          result[8].value++
          break;
        case 210:
          result[9].value++
          break;
        case 211:
          result[10].value++
          break;
        case 212:
          result[11].value++
          break;
        case 213:
          result[12].value++
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

/** 
 * 饼图统计 访问浏览器占比
 * 访问浏览器
 * Chrome Safari Firefox QQ WeChat Edge 
 */ 
exports.getPieBowser = (req, res) => {
  // 向前推req.query.day天 
  const lastDateStr = dayjs().subtract(req.query.day - 1, 'day').format('MM/DD/YYYY')
  // req.query.day天前的时间戳
  const lastDateNum = Date.parse(lastDateStr)

  const sql = `select browser from access_info where time>${lastDateNum}`
  new Promise((resolve,reject) => {
    db.query(sql,(err,result) => {
      if (err) return reject(err)
      resolve(result)
    })
  }).then((lastArr) => {
    let result = [
      { value: 0, name: "QQ Bowser" },
      { value: 0, name: "Safari" },
      { value: 0, name: "Firefox" },
      { value: 0, name: "Edge" },
      { value: 0, name: "Chrome" },
      { value: 0, name: "WeChat" },
      { value: 0, name: "其他" }
    ]
    lastArr.forEach(el => {
      if (el.browser.indexOf("QQ") != -1) {
        result[0].value++
      } else if (el.browser.indexOf("Safari") != -1) {
        result[1].value++
      } else if (el.browser.indexOf("Firefox") != -1) {
        result[2].value++
      } else if (el.browser.indexOf("Edge") != -1) {
        result[3].value++
      } else if (el.browser.indexOf("Chrome") != -1) {
        result[4].value++
      } else if (el.browser.indexOf("WeChat") != -1) {
        result[5].value++
      } else {
        result[6].value++
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

/**
 * 饼图统计 访问操作系统占比
 * Android Windows iOS Linux macOS 其他
 */
exports.getPieOS = (req, res) => {
  // 向前推req.query.day天 
  const lastDateStr = dayjs().subtract(req.query.day - 1, 'day').format('MM/DD/YYYY')
  // req.query.day天前的时间戳
  const lastDateNum = Date.parse(lastDateStr)

  const sql = `select os_name from access_info where time>${lastDateNum}`
  new Promise((resolve,reject) => {
    db.query(sql,(err,result) => {
      if (err) return reject(err)
      resolve(result)
    })
  }).then((lastArr) => {
    let result = [
      { value: 0, name: "Android" },
      { value: 0, name: "Windows" },
      { value: 0, name: "iOS" },
      { value: 0, name: "macOS" },
      { value: 0, name: "Linux" },
      { value: 0, name: "其他" }
    ]
    lastArr.forEach(el => {
      if (el.os_name.indexOf("Android") != -1) {
        result[0].value++
      } else if (el.os_name.indexOf("Windows") != -1) {
        result[1].value++
      } else if (el.os_name.indexOf("iOS") != -1) {
        result[2].value++
      } else if (el.os_name.indexOf("macOS") != -1) {
        result[3].value++
      } else if (el.os_name.indexOf("Linux") != -1) {
        result[4].value++
      } else {
        result[5].value++
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

// 文章浏览量排名
exports.getArtLookRanking = (req, res) => {
  const sql = `select title,look_count,message_count from article_table order by look_count desc`
  db.query(sql,(err,result) => {
    if (err) return res.cc("获取失败")
    let arrY = []
    let arrXLook = []
    let arrXMess = []
    result.forEach(el => {
      arrY.push(el.title)
      arrXLook.push(el.look_count)
      arrXMess.push(el.message_count)
    })
    res.send({
      code: 200,
      message: "获取文章浏览量排名成功",
      data: {arrY,arrXLook,arrXMess}
    })
  })
}

// 文章评论排名
exports.getArtMessRanking = (req, res) => {
  const sql = `select title,look_count,message_count from article_table where is_delete=0 order by message_count desc`
  db.query(sql,(err,result) => {
    if (err) return res.cc("获取失败")
    let arrY = []
    let arrXLook = []
    let arrXMess = []
    result.forEach(el => {
      arrY.push(el.title)
      arrXLook.push(el.look_count)
      arrXMess.push(el.message_count)
    })
    res.send({
      code: 200,
      message: "获取文章评论排名成功",
      data: {arrY,arrXLook,arrXMess}
    })
  })
}


/**
 * 
 * 
 * user_behavior用户行为
 * 201 菜单切换
 * 202 查看管理端源码
 * 203 查看第n页访客列表
 * 204 查看第n页文章列表
 * 205 查看第n页留言列表
 * 206 查看第n页评论列表
 * 
 * 
 * user_menu 用户菜单点击
 * 201 首页
 * 202 访客统计
 * 203 文章编辑
 * 204 文章列表
 * 205 文章详情
 * 206 文章修改
 * 207 图片编辑
 * 208 时间轴管理
 * 209 分类管理
 * 210 标签管理
 * 211 留言管理
 * 212 评论管理
 * 213 首页编辑
 * 
 * 
 * 文章浏览量排名
 * 文章评论排名
 * 
 * 
 */
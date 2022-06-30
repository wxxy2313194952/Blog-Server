// 定义全局组件Right路由处理函数，供 /router/right 模块进行调用

// 导入数据库操作模块
const db = require('../db/index');

// 引入时间day.js
const dayjs = require('dayjs');

// 热门文章就扣处理函数
exports.getHotArticle = (req,res) => {
  
}

// 博客信息接口处理函数
exports.getInfo = (req, res) => {
  const sql = "select * from article_table where is_delete=0"
  new Promise((resolve, reject) => {
    const date = dayjs(new Date())
    // console.log(date);
    let day = date.diff('2022-05-10', 'day')
    let info = {
      //访问总量
      sum: 0,
      // 评论总数
      message: 0,
      // 文章数量
      articleNum: 0,
      // 运行天数
      day,
      // 最后更新
      lastUpdate: 0
    }
    db.query(sql, (err, result) => {
      let i
      for (i = 0; i < result.length; i++) {
        info.sum += result[i].look_count
        info.message += result[i].message_count
      }
      info.articleNum = result.length
      info.lastUpdate = result[i - 1].pub_date
      // 获取时间戳差值
      const date_now = dayjs(new Date())
      const sjc = Date.now() - result[i - 1].pub_date
      // console.log("shuju");
      // console.log(result[i - 1].pub_date);
      // console.log("当前");
      // console.log(Date.now());
      // 大于一周
      if (sjc >= 604800000) {
        let day_pub = date_now.diff(dayjs(result[i - 1].pub_date), 'week')
        info.lastUpdate = `${day_pub}星期前`
      }
      // 小于一周
      if (sjc <= 604800000) {
        let day_pub = date_now.diff(dayjs(result[i - 1].pub_date), 'day')
        info.lastUpdate = `${day_pub}天前`
      }
      // 小于一天
      if (sjc <= 86400000) {
        let day_pub = date_now.diff(dayjs(result[i - 1].pub_date), 'hour')
        info.lastUpdate = `${day_pub}小时前`
      }
      // 小于一小时
      if (sjc <= 3600000) {
        info.lastUpdate = '刚刚'
      }
      resolve(info)
    })
  }).then(info => {
    res.send({
      code: '200',
      message: '获取博客信息成功！',
      data: {
        ...info
      }
    })
  }, err => {
    res.cc(err)
  })

}
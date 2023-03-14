// 访问记录
// const axios = require('axios');
// 导入数据库操作模块
const db = require('../../db/index')

// 获取IP
function setUserIP (req) {
  let getClientIp = function (req) {
    return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress || '';
  };
  var src_ip = getClientIp(req);
  if (src_ip != '' && src_ip != null) {
    if (src_ip.substr(0, 7) == "::ffff:") {
      src_ip = src_ip.substr(7);
    }
  }
  if (src_ip == "::1") {
    src_ip = "127.0.0.1";
  }
  return src_ip;
}



/**
 * 上传访客行为
 * @param {*} show_type 操作类型
 * @param {*} platform_type 平台类型 "desktop"`, `"tablet"` or `"mobile"
 * @param {*} os_name 操作系统
 * @param {*} browser 访问设备 浏览器
 */
exports.setAccessInfo = (req, res) => {
  let sjc = new Date()
  let date = sjc.getTime()
  let { show_type, platform_type, os_name, browser, city, OSVersion, BrowserVersion, user_behavior, user_menu } = req.body
  const articleInfo = {
    show_type,
    platform_type,
    os_name: os_name + " " + OSVersion,
    browser: browser + " " + BrowserVersion,
    time: date,
    ip: setUserIP(req),
    city,
    user_behavior,
    user_menu
  }
  // console.log(req)
  const sqlArticle = `insert into access_info set ?`
  new Promise((resolve, reject) => {
    db.query(sqlArticle, articleInfo, (err, result) => {
      if (result.affectedRows !== 1) reject('添加访问记录失败')
      if (err) reject(err)
      resolve()
    })
  }).then(() => {
    res.cc('添加访问记录成功！', 200)
  }, err => {
    res.cc(err)
  })
}


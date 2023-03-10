//配置全局文件

exports.Token = {
  //加密解密Token的秘钥
  jwtSecretKey: 'woxinxiangyang',
  //Token的有效期
  expiresIn: '12h',
}

exports.weixinURL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=e10b0ff8-d967-49e5-a020-30a11d21ab3e'

exports.dbInfo = {
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'lime_db',
}
// exports.dbInfo = {
//   host: '124.223.92.248',
//   user: 'root',
//   password: 'XIANGyang020713!',
//   database: 'lime_db',
// }

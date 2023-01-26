// 引入express
const express = require('express')
// 引入cors跨域中间件
const cors = require('cors')
// 注册服务器实例对象
const app = express()
//注册为全局中间件
app.use(cors())

// 托管静态数据
app.use('/uploads', express.static('./uploads'))

// 错误中间件使用:
// 解析 FormData 格式的中间件uploads\user_pic\mypice.jpg
const multer = require('multer')
//导入joi
const joi = require('joi')


//配置解析表单数据中间件，只能解析application/x-www-form-urlencoded格式
//内置中间件
app.use(express.urlencoded({ extended: false }))

app.use(express.json());

//路由之前封装res.cc函数
app.use((req, res, next) => {
  res.cc = function (err, code = 300) {
    res.send({
      code,
      message: err instanceof Error ? err.message : err
    });
  };
  next()
})

// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// unless指定以 /admin/user/login 和 /uploads/ 接口不需要进行 Token 身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/admin\/user\/login|^\/uploads\//] }))



// 引入登录模块路由
const userRouter = require('./router/user')
// 注册登录模块路由
app.use('/admin',userRouter)

// 引入留言模块路由
const commentRouter = require('./router/comment')
app.use(commentRouter)

// 引入文章分类模块路由
const ArtcateRouter = require('./router/artcate')
app.use(ArtcateRouter)

// 引入文章模块路由
const ArticleRouter = require('./router/article')
app.use(ArticleRouter)

// 引入主页模块路由
const HomeRouter = require('./router/home')
app.use(HomeRouter)

// 引入全局组件Left模块路由
const LeftRouter = require('./router/left')
app.use('/api',LeftRouter)

// 引入全局组件Right模块路由
const RightRouter = require('./router/right')
app.use('/api', RightRouter)

// 引入动态模块路由
const DailyRouter = require('./router/daily')
app.use(DailyRouter)

// 引入文章标签模块
const TagRouter = require('./router/tag')
app.use(TagRouter)

// 引入更新日志模块
const VerRouter = require('./router/version')
app.use(VerRouter)




// 定义错误级别中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  //身份认证失败后的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  // 当遇到一个multer错误 
  if (err instanceof multer.MulterError) return res.cc(err)
  //未知错误
  res.cc(err)
})

//启动服务器
app.listen(3080,() => {
  console.log('express for http://127.0.0.1:3080')
})
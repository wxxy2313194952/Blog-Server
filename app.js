// 引入express
const express = require('express')
// 引入cors跨域中间件
const cors = require('cors')
// 注册服务器实例对象
const app = express()
//注册为全局中间件
app.use(cors())



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
// 使用 .unless({ path: [/^\/api\//] }) 指定以 /api 开头的接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\/|^\/uploads\//] }))



// 引入登录模块路由
const userRouter = require('./router/user')
// 注册登录模块路由
app.use('/api',userRouter)

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



app.use(express.json());
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
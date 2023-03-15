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
// unless指定以 /admin/user/login , /uploads/ , /api/ 接口不需要进行 Token 身份认证
app.use(expressJWT({ secret: config.Token.jwtSecretKey }).unless({ path: [/^\/admin\/user\/login|^\/uploads\/|^\/api\/|^\/admin\/user\/reguser/] }))



// 引入登录模块路由
const userRouter = require('./admin/router/user')
// 注册登录模块路由
app.use('/admin',userRouter)

// 引入访问信息模块路由
const accessRouter = require('./admin/router/access')
app.use('/admin',accessRouter)

// 引入文章分类模块路由
const ArtcateRouter = require('./admin/router/artcate')
app.use('/admin',ArtcateRouter)

// 引入文章模块路由
const ArticleRouter = require('./admin/router/article')
app.use('/admin', ArticleRouter)

// 引入留言模块路由
const MessageRouter = require('./admin/router/message')
app.use('/admin', MessageRouter)

// 引入评论模块路由
const ReviewAdminRouter = require('./admin/router/review')
app.use('/admin', ReviewAdminRouter)

// 引入时间轴模块
const TimeAdminRouter = require('./admin/router/time')
app.use('/admin', TimeAdminRouter)

// 引入后台数据可视化模块路由
const EchartsAdminRouter = require('./admin/router/echarts')
app.use('/admin', EchartsAdminRouter)

/********************** 前台相关路由 ******************************/

// 引入前台文章相关路由
const articleShowRouter = require('./show/router/article')
app.use('/api', articleShowRouter)

// 引入留言模块路由
const messageShowRouter = require('./show/router/message')
app.use('/api',messageShowRouter)

// 引入前台数据可视化模块路由
const EchartsRouter = require('./show/router/echarts')
app.use('/api',EchartsRouter)

// 引入全局组件Left模块路由
const LeftRouter = require('./show/router/left')
app.use('/api',LeftRouter)

// 引入全局组件Right模块路由
const RightRouter = require('./show/router/right')
app.use('/api', RightRouter)

// 引入文章评论模块路由
const ReviewRouter = require('./show/router/review')
app.use('/api',ReviewRouter)

// 引入标签云模块
const TagRouter = require('./show/router/tag')
app.use('/api', TagRouter)

// 引入游客访问记录模块
const AccessRouter = require('./show/router/access')
app.use('/api', AccessRouter)

// 引入时间轴模块
const TimeRouter = require('./show/router/time')
app.use('/api',TimeRouter)

// 引入时间轴模块
const HomeRouter = require('./show/router/home')
app.use('/api',HomeRouter)


// 定义错误级别中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.send({
    code: 400,
    message: "表单输入格式错误"
  })
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
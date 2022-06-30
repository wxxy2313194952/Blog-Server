// 文章路由模块 
const express = require('express');
const router = express.Router();


// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// // 磁盘存储引擎 (DiskStorage) 控制文件的存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/articlecover'))
  },
  filename: function (req, file, cb) {
    //获取文件后缀
    var extname = path.extname(file.originalname)
    cb(null, file.fieldname + '_' + Date.now() + extname)
  }
})

// // 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ storage: storage })

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
// const upload = multer({ dest: path.join(__dirname, '../uploads') })

// 引入用户路由处理函数模块
const routerArticle = require('../router_handler/article');

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { add_article_schema } = require('../schema/article')

// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/my/article/add', upload.single('cover_img'), expressJoi(add_article_schema), routerArticle.addArticle)
// 获取文章信息路由
router.get('/api/article/get/:id', routerArticle.getArticle)
// 首页获取文章列表
router.get('/api/article/getarticlelist',routerArticle.getArticleList)
// 获取文章总数接口
router.get('/api/article/getarticlenum',routerArticle.getArticleNum)



// router.post('/api/add',routerArticle.add)


// 暴露当前路由模块
module.exports = router;
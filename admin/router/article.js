// 文章路由模块 
const express = require('express');
const router = express.Router();

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')


// 文章发布 磁盘存储引擎 (DiskStorage) 控制文件的存储
const articleStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/articlecover'))
  },
  filename: function (req, file, cb) {
    //获取文件后缀
    var extname = path.extname(file.originalname)
    cb(null, file.fieldname + '_' + Date.now() + extname)
  }
})
// 编辑文章图片上传 磁盘存储引擎 (DiskStorage) 控制文件的存储
const pictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, `../../uploads/articlePicture`))
  },
  filename: function (req, file, cb) {
    //获取文件后缀
    var extname = path.extname(file.originalname)
    cb(null, Date.now() + extname)
  }
})
// // 发布新文章图片上传 磁盘存储引擎 (DiskStorage) 控制文件的存储
// const articlePictureStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const picturePath = path.join(__dirname, `../../uploads/articlePicture/Temporary`)
//     // 创建文件夹
//     fs.mkdir( picturePath, {recursive: true}, (err, path) => {})
//     cb(null, picturePath)
//   },
//   filename: function (req, file, cb) {
//     //获取文件后缀
//     var extname = path.extname(file.originalname)
//     cb(null, Date.now() + extname)
//   }
// })

// // 创建文章发布 multer 的实例对象
const articleUpload = multer({ storage: articleStorage })
// // 创建文章图片 multer 的实例对象
const pictureUpload = multer({ storage: pictureStorage })
// // 创建文章图片 multer 的实例对象
// const articlePictureUpload = multer({ storage: articlePictureStorage })

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
// const upload = multer({ dest: path.join(__dirname, '../uploads') })

// 引入用户路由处理函数模块
const routerArticle = require('../router_handler/article');

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { add_article_schema } = require('../../schema/article')

// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/article/add', articleUpload.single('cover_img'), expressJoi(add_article_schema), routerArticle.addArticle)
// 获取文章列表
router.get('/article/getarticlelist', routerArticle.getArticleList)
// 获取文章总数接口
router.get('/article/getarticlenum', routerArticle.getArticleNum)
// 删除文章
router.get('/article/delarticle/:id', routerArticle.delArticle)
// 获取文章信息
router.get('/article/getarticle/:id', routerArticle.getArticle)
// 编辑文章
router.post('/article/editarticle', routerArticle.editArticle)
// 编辑时文章上传图片接口
router.post('/article/addpicture', pictureUpload.single('mypicture'), routerArticle.addPicture)
// 新发布时时文章上传图片接口
// router.post('/article/addarticlepicture', articlePictureUpload.single('mypicture'), routerArticle.addArticlePicture)
// router.post('/article/addpicture', routerArticle.addPicture)

// 暴露当前路由模块
module.exports = router;
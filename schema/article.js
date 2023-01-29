const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 分别定义 标题、分类Id、内容、发布状态的校验规则
const title = joi.string().required()
const content = joi.string().required()
const describe = joi.string().required()
const state = joi.string().valid('已发布', '草稿').required()
const classification = joi.number()
const label = joi.string().required()

// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    content,
    describe,
    state,
    classification,
    label
  }
}
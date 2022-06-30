## 一、lime_server

### 1. 登录模块

1. 数据库字段：

   ```txt
   1.账号
   2.密码
   3.验证码
   ```

2. ​

### 2. 注册模块

1. ​



## 二、 Browser

### 1. markdown语法展示

```bash
$npm install marked
```





## 三、 api接口文档

### 说明

1. 项目根路径为：
2. 以 `/api`  开头的请求路径，不需要访问权限
3. 以 `/my`  开头的请求路径，需要访问权限

* PK 主键唯一标识
* NN 值不允许为空
* UQ 值唯一
* AI 值自动增长

### 1. 首页

#### 1.1获取文章信息

**简要描述**

* 获取文章信息

**请求url**

* /api/

**请求方式**

* GET

**参数**

* 无

**返回示例**

```js
{
  "code": 200,
  "message": "获取文章列表成功"，
  "data":{
    "username":
  }
}
```

**返回参数说明**

| 参数名       | 类型     | 说明    |
| --------- | ------ | ----- |
| code      | int    | 返回状态  |
| message   | string | 描述信息  |
| data      | object | 返回体数据 |
| +username | string | 用户名   |

#### 1.2获取右侧IDcard信息

**简要描述**

- 获取文章信息

**请求url**

- /api/

**请求方式**

- GET

**参数**

- 无

**返回示例**

```js
{
  "code": 200,
  "message": "获取文章列表成功"，
  "data":{
    "username":
  }
}
```

**返回参数说明**

| 参数名       | 类型     | 说明    |
| --------- | ------ | ----- |
| code      | int    | 返回状态  |
| message   | string | 描述信息  |
| data      | object | 返回体数据 |
| +username | string | 用户名   |







### 2.登录注册 

#### 2.1注册

**简要描述**

- 注册用户接口

**请求url**

- /api/reguser

**请求方式**

- POST

**请求体**

| 参数名      | 类型     | 必选   | 说明   |
| :------- | ------ | ---- | ---- |
| username | string | 是    | 用户名  |
| password | string | 是    | 密码   |
| qqid     | string | 否    | qq号  |
|          |        |      |      |

**返回示例**

```js
{
  "code": 200,
  "message": "注册成功"，
}
```

**返回参数说明**

| 参数名       | 类型     | 说明     |
| --------- | ------ | ------ |
| code      | int    | 200：成功 300：失败|
| message   | string | 返回信息描述  |



#### 2.2登录

**简要描述**

- 用户登录接口

**请求url**

- /api/login

**请求方式**

- POST

**请求体**

| 参数名      | 类型     | 必选   | 说明   |
| :------- | ------ | ---- | ---- |
| username | string | 是    | 用户名  |
| password | string | 是    | 密码   |


**返回示例**

```js
{
  "code": 200,
  "message": "登录成功"，
}
```

**返回参数说明**

| 参数名       | 类型     | 说明     |
| --------- | ------ | ------ |
| code      | int    | 200：成功 300：失败 |
| message   | string | 返回信息描述  |


### 3. 留言板模块

#### 3.1获取留言板信息

**简要描述**

* 获取留言板信息

**请求url**

* /api/message

**请求方式**

* GET

**参数**

* 无

**返回示例**

```js
{
  "code": 200,
  "message": "获取留言信息成功"，
  "data":[
    {
      "id":1, 
      "owner_user_id": "", 
      "target_user_id": "", 
      "content": "",  
      "likeCount": "", 
      "created_at": "", 
      "status": "", 
    },
    {
      "id":2,
      "owner_user_id": "",
      "target_user_id": "",
      "content": "",
      "likeCount": "",
      "created_at": "",
      "status": "",
    },
  ]
}
```

**返回参数说明**

| 参数名       | 类型     | 说明    |
| :--------- | :------ | :----- |
| code      | int    | 返回状态 200:成功 300：失败  |
| message   | string | 描述信息  |
| data      | object | 返回体数据 |
| + id | string | 评论的主键唯一标识  |
| + owner_user_id| string | 发表评论的用户id |
| + target_user_id | string |  评论的目标用户id  |
| + content | string |  评论内容  |
| + likeCount | int |  点赞量  |
| + created_at | string |  创建时间 new Date();  |
| + status | bool |  状态 0: 正常  1:删除   |


#### 3.2写留言

**简要描述**

- 写留言接口

**请求url**

- /my/leavemessage

**请求方式**

- POST

**请求体**

| 参数名          | 类型   | 必选 | 说明   |
| :-------       | ------ | ---- | ---- |
| target_user_id | string |  否  |评论的目标用户id |
| content        | string |  是  |评论内容  |


**返回示例**

```js
{
  "code": 200,
  "message": "留言成功！"，
}
```

**返回参数说明**

| 参数名       | 类型     | 说明     |
| --------- | ------ | ------ |
| code      | int    | 200：成功 300：失败 |
| message   | string | 返回信息描述  |


#### 3.3 点赞接口  （再添加一张表）

**简要描述**

- 点赞接口

**请求url**

- /my/likecount

**请求方式**

- POST

**请求体**

| 参数名 | 类型   | 必选 | 说明   |
| :---- | ------ | ---- | ---- |
| id    | string |  是  | 要点赞的评论id |




**返回示例**

```js
{
  "code": 200,
  "message": "点赞成功！"，
}
```

**返回参数说明**

| 参数名       | 类型     | 说明     |
| --------- | ------ | ------ |
| code      | int    | 200：成功 300：失败 |
| message   | string | 返回信息描述  |


### 4. 文章分类模块

#### 4.1获取文章分类 *一级* 列表

**简要描述**

* 获取文章分类一级列表

**请求url**

* /api/article/getcatesfirst

**请求方式**

* GET

**请求参数**

* 无

**返回示例**

```js
{
    "code": 200,
    "message": "获取一级分类成功",
    "data": [
        {
            "id": 1,
            "name": "学习笔记",
            "is_delete": 0
        },
        {
            "id": 2,
            "name": "生活记录",
            "is_delete": 0
        },
        {
            "id": 3,
            "name": "更新记录",
            "is_delete": 0
        }
    ]
}
```

**返回参数说明**

| 参数名       | 类型     | 说明    |
| :--------- | :------ | :----- |
| code      | int    | 返回状态 200:成功 300：失败  |
| message   | string | 描述信息  |
| data      | object | 返回体数据 |
| + id | string | 分类名的主键唯一标识  |
| + name| string | 分类名 |
| + is_delete | int |  是否被删除 0：没有被删除 1：被删除  |


#### 4.2获取文章分类 *二级* 列表

**简要描述**

* 获取文章分类二级列表

**请求url**

* /api/article/getcatessecond

**请求方式**

* GET

**请求参数**

* 无

**返回示例**

```js
{
    "code": 200,
    "message": "获取二级分类成功",
    "data": [
        {
            "id": 1,
            "name": "数据结构",
            "is_delete": 0
        },
        {
            "id": 2,
            "name": "javascript",
            "is_delete": 0
        },
        {
            "id": 4,
            "name": "vue2",
            "is_delete": 0
        }
    ]
}
```

**返回参数说明**

| 参数名       | 类型     | 说明    |
| :--------- | :------ | :----- |
| code      | int    | 返回状态 200:成功 300：失败  |
| message   | string | 描述信息  |
| data      | object | 返回体数据 |
| + id | string | 分类名的主键唯一标识  |
| + name| string | 分类名 |
| + is_delete | int |  是否被删除 0：没有被删除 1：被删除  |



#### 4.3新增二级分类

**简要描述**

* 新增二级分类

**请求url**

* /api/article/addcatessecond

**请求方式**

* POST

**请求体**

| 参数名 | 类型   | 必选 | 说明   |
| :---- | ------ | ---- | ---- |
| name    | string |  是  | 增加的分类名 |

**返回示例**

```js
{
    "code": 200,
    "message": "新增文章分类成功！",
}
```

**返回参数说明**

| 参数名       | 类型     | 说明    |
| :--------- | :------ | :----- |
| code      | int    | 返回状态 200:成功 300：失败  |
| message   | string | 描述信息  |


#### 4.4删除二级文章分类

**简要描述**

* 新增二级分类

**请求url**

* /api/article/deletecatessecond

**请求方式**

* POST

**请求体**

| 参数名 | 类型   | 必选 | 说明   |
| :---- | ------ | ---- | ---- |
| name    | string |  是  | 要删除的分类名 |

**返回示例**

```js
{
    "code": 200,
    "message": "删除文章分类成功！",
}
```

**返回参数说明**

| 参数名       | 类型     | 说明    |
| :--------- | :------ | :----- |
| code      | int    | 返回状态 200:成功 300：失败  |
| message   | string | 描述信息  |


### 5. 文章发布模块

#### 5.1发布文章

**简要描述**

* 新增发布文章

**请求url**

* /my/article/add

**请求方式**

* POST

**请求体**

| 参数名     | 类型       | 必选 | 说明    |
| :----     | ------     | ---- | ----    |
| title     | string     |  是  | 文章标题 |
| content   | string     |  是  | 文章内容 |
| cover_img | blob二进制  |  是  | 文章封面 |
| state     | string     |  是  | 状态，可选值为：已发布、草稿 |
| cate_f_id | int        |  是  | 所属一级分类 Id |
| cate_s_id | int        |  是  | 所属二级分类 Id |

**返回示例**

```js
{
    "code": 200,
    "message": "发布文章成功！"
}
```

**返回参数说明**

| 参数名       | 类型     | 说明    |
| :--------- | :------ | :----- |
| code      | int    | 返回状态 200:成功 300：失败  |
| message   | string | 描述信息  |









/*

<template>

  <div class="outer">

​    <div>article</div>

​    <div class="hljs" v-html="hlDiv"></div><!--  ="code" -->

  </div>

</template>

<script>

import marked from "marked";

import hljs from "highlight.js";

import javascript from "highlight.js/lib/languages/javascript";

import "highlight.js/styles/monokai-sublime.css";

export default {

  name: "height",

  data() {

​    return {

​      code: "```javascript\nfunction(){\n\tconsole.log(123)\n}\n```",

​    };

  },

  mounted() {

​    let renderer = new marked.Renderer()

​    marked.setOptions({

​      renderer,

​      highlight: function (code) {

​        return hljs.highlightAuto(code).value;

​      },

​      pedantic: false,

​      gfm: true,

​      tables: true,

​      breaks: false,

​      sanitize: false,

​      smartLists: true,

​      smartypants: false,

​      xhtml: false,

​    });

  },

  computed: {

​    hlDiv(){

​      return marked(this.code, { sanitize: true })

​    }

  }

  

};

</script>

<style>

.outer {

  margin-top: 85px;

  height: 900px;

}

</style>

*/
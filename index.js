/**
 * 入口模块
 */
const express = require('express')
// 引入日志中间件
const morgan = require('morgan')

// 创建主应用
const app = express()

// 模板引擎的设置
app.set('view engine', 'html')
app.set('views', `${__dirname}/views`)
app.engine('html', require('ejs').renderFile)

// 静态资源的配置（静态文件中间件）
app.use(express.static('static'))

// 日志中间件
const morganMiddleware  = morgan('short')
app.use(morganMiddleware)

// 调用中间件
app.use(/\/(index)?/, require('./router/index'))
app.use('/blog', require('./router/blog'))
app.use('/search', require('./router/search'))
app.use('/article', require('./router/article'))

// 如果没有匹配的路由就重定向到404页面
// app.use(function (req, res) {
//   res.redirect(301, '/404')
// })

// 404页面
app.use(function (req, res) {
  res.status(404).render('404')
})

app.listen(8087)

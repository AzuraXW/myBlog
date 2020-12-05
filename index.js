/**
 * 入口模块
 */
const blogApp = require('./router/blog')
const path = require('path')
const express = require('express')
// 创建主应用
const app = express()

// 模板引擎的设置
app.set('view engine', 'html')
app.set('views', `${__dirname}/views`)
app.engine('html', require('ejs').renderFile)

// 静态资源的配置
app.use(express.static('static'))

// 调用首页子应用
app.use(/\/(index)?/, require('./router/index'))
app.use("/blog", require('./router/blog'))
app.use("/search", require('./router/search'))

app.use("/404", function(req, res) {
    res.status(404).render('404')
})

app.use(function(req, res) {
    res.redirect(301, '/404');
})

app.listen(3000)

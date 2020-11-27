/**
 * 入口模块
 */

const express = require('express')
// 创建主应用
const app = express()

// 模板引擎的设置
app.set('view engine', 'html')
app.set('views', `${__dirname}/views`)
app.engine('html', require('ejs').renderFile)

// 静态资源的配置
app.use(express.static('static/'))

// 调用首页子应用
app.use(/\/(index)?/, require('./router/index'))

app.listen(3000)

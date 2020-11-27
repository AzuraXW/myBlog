/**
 * 首页子应用（首页路由）
*/

const express = require('express')

const indexApp = express()

// 主页路由
indexApp.get('/', (req, res) => {
  res.render('index')
})

module.exports = indexApp

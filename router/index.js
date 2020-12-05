/**
 * 首页子应用（首页路由）
*/

const express = require('express')
const article = require('../middleware/blog')

const indexApp = express()

// 主页路由
indexApp.get('/', [article.getHot, article.getList], (req, res) => {
  let {hots, list} = req
  res.render('index', {hots, list})
})

module.exports = indexApp

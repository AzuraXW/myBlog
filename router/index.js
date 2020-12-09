/**
 * 首页子应用（首页路由）
*/

const express = require('express')
const indexApp = express.Router()

const blog = require('../middleware/blog')

// 主页路由
indexApp.get('/', [blog.getHot, blog.getListByCategoryPagination], (req, res) => {
  const { hots, list } = req
  res.render('index', { hots, list })
})

module.exports = indexApp

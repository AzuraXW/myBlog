/**
 * 搜索子应用
 */
const express = require('express')
const url = require('url')
// 搜索子应用
const searchApp = express()
const category = require('../middleware/category')
const blog = require('../middleware/blog')

function returnPathname (req) {
  const myurl = url.parse(req.url)
  return myurl.pathname
}

searchApp.get('/', [category.getCategoryList, blog.getListByCategoryPagination, blog.getPageMsg, blog.handlePage], (req, res) => {
  // 如果没有搜索关键字
  if (!req.query.k) {
    res.redirect(301, '/404')
    return
  }
  const { CategoryList, list, totalPageResult, pageHref } = req
  res.render('blog', {
    CategoryList,
    list,
    pathname: returnPathname(req),
    id: req.params.id,
    totalPageResult,
    pageHref,
    p: req.query.p || 1,
    k: req.query.k,
    href: url.parse(req.url).href
  })
})

module.exports = searchApp

/**
 * 文章子应用
 */
const express = require('express')
const url = require('url')
// 文章子应用
const blogApp = express()
const category = require('../middleware/category')
const blog = require('../middleware/blog')

function returnPathname (req) {
  const myurl = url.parse(req.url)
  return myurl.pathname
}

blogApp.use([category.getCategoryList, blog.getListByCategoryPagination, blog.getPageMsg, blog.handlePage])

// 文章分类路由
blogApp.get('/category/:categoryId', (req, res) => {
  const { CategoryList, list, totalPageResult, pageHref } = req
  // 判断时候存在该分类ID
  const categoryFlag = CategoryList.find(item => {
    return item.category_id === req.params.categoryId
  })

  // 如果不存在，就重定向到404页面
  if (!categoryFlag) {
    res.redirect(301, '/404')
    return
  }

  res.render('blog', {
    CategoryList,
    list,
    pathname: returnPathname(req),
    id: req.params.id,
    totalPageResult,
    pageHref,
    p: req.query.p || 1,
    k: req.query.k
  })
})

// 文章列表（全部分类）
blogApp.get('/', (req, res) => {
  const { CategoryList, list, totalPageResult, pageHref } = req
  res.render('blog', {
    CategoryList,
    list,
    pathname: returnPathname(req),
    id: req.params.id,
    totalPageResult,
    pageHref,
    p: req.query.p || 1,
    k: req.query.k
  })
})

module.exports = blogApp

/**
 * 文章子应用
 */
const express = require('express')
const url = require('url')
// 文章子应用
const blogApp = express()
const category = require('../middleware/category')
const blog = require('../middleware/blog')

function returnPathname(req) {
  let myurl = url.parse(req.url)
  return myurl.pathname;
}

// 文章列表页
blogApp.get('/', [category.getCategoryList, blog.getListByCategoryPagination, blog.getPageMsg], (req, res) => {
  let { CategoryList, list, totalPageResult } = req
  res.render('blog', {
    CategoryList,
    list,
    pathname: returnPathname(req),
    id: req.params.id, 
    totalPageResult,
    p: req.query.p || 1,
    k: req.query.k
  })
})

blogApp.get('/category/:id', [category.getCategoryList, blog.getListByCategoryPagination, blog.getPageMsg], (req, res) => {
  let { CategoryList, list, totalPageResult } = req

  // 判断时候存在该分类ID
  const categoryFlag = CategoryList.find(item => {
    return item['category_id'] == req.params.id
  })
  // 如果不存在，就重定向到404页面
  if(!categoryFlag) {
    res.redirect(301, '/404');
    return;
  }

  res.render('blog', {
    CategoryList, 
    list, 
    pathname: returnPathname(req), 
    id: req.params.id, 
    totalPageResult,
    p: req.query.p || 1,
    k: req.query.k
  })
})

blogApp.get('/search/', [category.getCategoryList, blog.getListByCategoryPagination, blog.getPageMsg], (req, res) => {
  let { CategoryList, list, totalPageResult } = req
  res.render('blog', {
    CategoryList, 
    list, 
    pathname: returnPathname(req), 
    id: req.params.id, 
    totalPageResult,
    p: req.query.p || 1,
    k: req.query.k
  })
})

module.exports = blogApp
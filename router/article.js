/** 
 * 文章路由
 */
const express = require('express')
const articleApp = express()
const article = require('../middleware/article')

// 访问具体的文章详情
articleApp.get('/:id', [article.getArticleById, article.getPrevArticle, article.getNextArticle], function (req, res, next) {
  const { article, prevArticle, nextArticle } = req
  res.render('article', {
    article,
    prevArticle,
    nextArticle
  })
})

module.exports = articleApp

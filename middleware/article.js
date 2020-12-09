const Article = require('../model/article')

module.exports = {
  getArticleById: (req, res, next) => {
    const id = req.params.id
    Article.getArticleById(id).then(results => {
      req.article = results
      next()
    }).catch(err => {
      if (err.code === 110) {
        // 没有该文章
        res.redirect(301, '/404')
      }
      next(err)
    })
  },

  getPrevArticle: (req, res, next) => {
    const id = req.params.id
    Article.getPrevArticle(id).then(result => {
      req.prevArticle = result
      next()
    }).catch(err => {
      next(new Error(err))
    })
  },

  getNextArticle: (req, res, next) => {
    const id = req.params.id
    Article.getNextArticle(id).then(result => {
      req.nextArticle = result
      next()
    }).catch(err => {
      next(new Error(err))
    })
  },
}

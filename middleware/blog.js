const Article = require('../model/blog');

/**
 * 文章中间件
 */
module.exports = {
    getHot: (req, res, next) => {
        Article.getHot(4).then(results => {
            req.hots = results
            next()
        }).catch(err => {
            next(err)
        })
    },

    getList: (req, res, next) => {
        Article.getList().then(results => {
            req.list = results
            next()
        }).catch(err => {
            next(err);
        })
    },

    getListByCategory: (req, res, next) => {
        let id = req.params.id
        Article.getListByCategory(id).then(results => {
            req.list = results
            next()
        }).catch(err => {
            next(err)
        })
    },

    getListByCategoryPagination: (req, res, next) => {
        let id = req.params.id
        let p = req.query.p || 1
        let k = req.query.k || null
        Article.getListByCategoryPagination(5, k, id, p).then(results => {
            req.list = results
            next()
        }).catch(err => {
            next(err)
        })
    },


    getPageMsg: (req, res, next) => {
        let k = req.query.k
        Article.maxPage(k, req.params.id).then(res => {
            req.totalPageResult = res
            next()
        }).catch(err => {
            next(err)
        })
    }
}
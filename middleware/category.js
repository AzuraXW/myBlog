const Category = require('../model/category')

module.exports = {
    getCategoryList: (req, res, next) => {
        Category.getCategoryList().then(results => {
            req.CategoryList = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}
const Category = require('../model/category')

module.exports = {
  // 分类目录中间件
  getCategoryList: (req, res, next) => {
    Category.getCategoryList().then(results => {
      req.CategoryList = results
      next()
    }).catch(err => {
      console.log(err)
      next(err)
    })
  }
}

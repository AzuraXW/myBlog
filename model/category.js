const Model = require('./model')

module.exports = class Category extends Model {
  static getCategoryList () {
    const sql = 'SELECT name, category_id from category'

    return new Promise((resolve, reject) => {
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        console.error('获取分类目录失败', err.message)
        reject(err)
      })
    })
  }
}

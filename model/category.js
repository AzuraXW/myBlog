const Model = require('./model')

module.exports = class Category extends Model {
    static getCategoryList() {
        let sql = 'SELECT name, category_id from category'

        return new Promise((resolve, reject) => {
            this.query(sql).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
const Model = require('./model')

module.exports = class Login extends Model {
    static findBlogUser(username) {
        return new Promise((resolve, reject) => {
            const sql = 'select username, password from bloguser where username = ?'
            this.query(sql, username).then(results => {
                resolve(results[0])
            }).catch(err => {
                reject('[FIND ERROR]: 没有找到此用户' + err)
            })
        })
    }
}
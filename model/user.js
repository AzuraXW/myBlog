const Model = require('./model')

module.exports = class User extends Model {
    static getUserInfo(username) {
        return new Promise((resolve, reject) => {
            const sql = 'select username, email from bloguser where username = ?'
            this.query(sql, username).then(results => {
                resolve(results[0])
            }).catch(err => {
                reject(err)
            })
        })
    }
}

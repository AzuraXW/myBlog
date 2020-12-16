const Model = require('./model')

class Register extends Model {
    static createUser(username, password, email) {
        return new Promise((resolve, reject) => {
            let sql = 'insert into bloguser(username, password, email) values(?, ?, ?)'
            this.query(sql, [username, password, email]).then(result => {
                if(result.affectedRows > 0) {
                    resolve({
                        code: '200',
                        msg: '成功创建用户'
                    })
                } else {
                    reject({
                        code: '403',
                        msg: '创建用户失败'
                    })
                }
            })
        })
    }
}

module.exports = Register
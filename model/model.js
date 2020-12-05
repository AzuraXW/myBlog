const mysql = require('mysql');
const mysql_config = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'blog'
}
module.exports = class Model {
    // 连接对象
    static conn = null;

    /**
     * 连接数据库
     */
    static connection() {
        Model.conn = mysql.createConnection(mysql_config)
        Model.conn.on('error', function(err) {
            console.log("重新连接数据库")
            Model.conn = mysql.createConnection(mysql_config)
        })
        Model.conn.connect(err => {
            if(err) {
                console.log('数据库连接失败' + err)
            }
        })
    }

    /**
     * 关闭数据库连接
     */
    static end() {
        if(null !== Model) {
            Model.conn.end()
        }
    }

    /**
     * 执行sql语句
     * @param {*} sql 
     * @param {*} params 
     */
    static query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.connection();

            Model.conn.query(sql, params, (err, results) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    }
}
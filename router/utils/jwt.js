const jwt = require('jsonwebtoken')
const { getCookies } = require('./cookie')

const jwtkey = 'wangweinice' // token生成的密钥

/**
 * token生成函数
 *
 * @param {*} data
 * @return {*} 
 */
const jwtSign = (data) => {
    const token = jwt.sign(data, jwtkey, { expiresIn: 60 * 24 })
    return token
}

// token验证函数
const jwtCheck = (req, res, next) => {
    // 从cookie中获取token
    const token = getCookies(req.headers.cookie, 'token')
    jwt.verify(token, jwtkey, (err, data) => {
        if(err) {
            // 无效token
            res.send({
                success: false,
                msg: 'token信息错误'
            })
        } else {
            // 将token保存在req中，方便之后的中间件使用
            req.jwtInfo = data
            next()
        }
    })
}

module.exports = {
    jwtSign,
    jwtCheck
}
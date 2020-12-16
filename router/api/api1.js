/** 
 * 前台接口
 */
const bcrypt = require('bcrypt')
const express = require('express')
const apiv1 = express()
// 数据模型
const regModel = require('../../model/register')
const loginModel = require('../../model/login')
const userModel = require('../../model/user')
// 工具函数
const { jwtSign, jwtCheck } = require('../utils/jwt')
const { getCookies } = require('../utils/cookie')

// 注册接口
apiv1.post('/reg', async function(req, res, next) {
    const { username, password, pwdagain, email } = req.body

    // 4-16位的数字字母下划线汉字
    const usernameReg = /^([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/   
    // 8-16位，至少包含一个大写字母、小写字母，一个数字和一个特殊字符（!@#$%^&*?）
    const passwordReg = /^.*(?=.{8,16})(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?]).*$/ 
    // 匹配邮箱地址
    const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    // 对客户端的数据进行验证
    if (!usernameReg.test(username)) {
        res.send({
            success: false,
            msg: '用户名不符合格式'
        })
        return
    }
    if (!passwordReg.test(password)) {
        res.send({
            success: false,
            msg: '密码不符合格式'
        })
        return
    } else if(password !== pwdagaina) {
        res.send({
            success: false,
            msg: '两次密码不一致'
        })
        return
    }
    if(emailReg.test(email)) {
        res.send({
            success: false,
            msg: '邮箱不符合格式'
        })
        return
    }

    let extistUser = await loginModel.findBlogUser(username)
    if(extistUser) {
        // 用户已经存在
        res.send({
            success: false,
            msg: '用户已经存在'
        })
        return
    }
    // 生成密文密码
    const hashPwd = bcrypt.hashSync(password, 10)
    regModel.createUser(username, hashPwd, email).then(result => {
        console.log(result)
        if (result.code === '200') {
            res.send({
                success: true,
                msg: '注册成功！'
            })
        } else {
            res.send({
                success: false,
                msg: '注册失败'
            })
        }
    })
})

// 登录接口
apiv1.post('/login', (req, res, next) => {
    const { username, password } = req.body

    if(username && password) {
        loginModel.findBlogUser(username).then(userInfo => {
            // console.log(userinfo)
            if(!userInfo) {
                res.send({
                    success: false,
                    msg: '查无此用户'
                })
                return
            }
            // 将数据库中的密文密码解码与客户端传过来的密码进行比对
            const isPwdValid = bcrypt.compareSync(password, userInfo.password)
            // 密码比对成功
            if(isPwdValid) {
                // 生成token，token中包含用户名和用户id
                const token = jwtSign({username: userInfo.username, _id: userInfo.id})
                // 设置请求头cookie
                res.setHeader('Set-Cookie', `token=${token};path=/;httponly`)
                res.send({
                    success: true,
                    msg: '登录成功！',
                    token
                })
            } else {
                res.send({
                    success: false,
                    msg: '密码错误！'
                })
            }
        })
    } else {
        res.send({
            success: false,
            msg: '登录参数错误'
        })
    }
})

// 验证用户登录状态
apiv1.post('/login/status', jwtCheck, (req, res, next) => {
    res.send({
        success: true,
        msg: '该用户已登录'
    })
})

// 获取用户信息
apiv1.post('/user/info', jwtCheck, (req, res, next) => {
    // jwtInfo包含验证通过后的用户的用户名
    const { username } = req.jwtInfo
    userModel.getUserInfo(username).then(userinfo => {
        res.json({
            success: true,
            msg: '获取成功！',
            data: {
                info: userinfo
            }
        })
    })
})



module.exports = apiv1
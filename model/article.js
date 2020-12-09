const Model = require('./model')
// 时间处理器
const moment = require('moment')
moment.locale('zh-cn')
const md = require('./utils/markdown')

module.exports = class Article extends Model {

  /**
   * 根据给定ID返回文章详情
   *
   * @static
   * @param {String} articleId  文章Id
   * @return {*} 
   */
  static getArticleById (articleId) {
    return new Promise((resolve, reject) => {

      // 判断是否有该文章
      const existSql = 'select id from article where id=' + articleId
      this.query(existSql).then(results => {
        if(!results[0]) {
          reject({
            code: 110,
            msg: '没有该文章'
          })
        }
      })

      const sql = `SELECT a.id, a.title, a.content, a.time, a.hits, c.name as category, c.category_icon, a.category_id FROM article a, category c WHERE a.id = ${articleId} and a.category_id = c.category_id`
      this.query(sql).then(results => {
        results[0].time = moment(results[0].time).format('LLLL')
        results[0].content = md.render(results[0].content)
        resolve(results[0])
      }).catch(err => {
        console.error('获取文章详情失败', err.message)
        reject(err)
      })
    })
  }

  /**
   * 返回上一篇文章详情
   *
   * @static
   * @param {String} currentArticleId 当前文章的Id
   * @return {*} 
   */
  static getPrevArticle(currentArticleId) {
    return new Promise((resolve, reject) => {
      const sql = `select id, title from article where id < ${currentArticleId} order by id desc limit 1`
      this.query(sql).then(results => {
        let article = results[0]
        console.log(article)
        // 如果结果集为空，则是第一篇
        if(!article) {
          article = {
            id: '#',
            title: '已经是第一篇了'
          }
        } else {
          article.title = '上一篇：' + article.title
        }
        resolve(article)
      }).catch(err => {
        console.error('获取上一篇文章失败', err.message)
        reject(err)
      })
    })
  }

  /**
   * 返回下一篇文章详情
   *
   * @static
   * @param {String} currentArticleId 当前文章的Id
   * @return {*} 
   */
  static getNextArticle(currentArticleId) {
    return new Promise((resolve, reject) => {
      const sql = `select id, title from article where id > ${currentArticleId} limit 1`
      this.query(sql).then(results => {
        let article = results[0]

        // 如果结果集为空，则是最后一篇
        if(!article) {
          article = {
            id: '#',
            title: '已经是最后一篇了'
          }
        } else {
          article.title = '下一篇：' + article.title
        }
        resolve(article)
      }).catch(err => {
        console.error('获取下一篇文章失败', err.message)
        reject(err)
      })
    })
  }
}

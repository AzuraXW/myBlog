const Model = require('./model');
// 时间处理器
const moment = require('moment')
moment.locale('zh-cn')

function handleTimeFormat(lists) {
    lists.forEach((list) => {
        list.time = moment(list.time).format('LL')
    })
    return lists
}
module.exports = class Blog extends Model {
    /**
     * 文章数据模型
     * @param {*} num 
     */
    static pageNum = 5
    static getHot(num) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT article.id, article.title, article.content, article.time, category.name as category FROM article, category WHERE article.category_id = category.category_id AND hot = 1 LIMIT ?';
            this.query(sql, num).then((results) => {
                results = handleTimeFormat(results)
                resolve(results);
            }).catch(err => {
                console.error("获取热门推荐文章失败:"+ err.message)
                reject(err)
            })
        })
    }

    /**
     * 获取文章列表（不具备分页、分类功能）
     */
    static getList() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT article.id, article.title, article.content, article.time, category.name as category, category.category_icon, article.category_id FROM article, category WHERE article.category_id = category.category_id ORDER BY time DESC';
            this.query(sql).then((results) => {
                resolve(results);
            }).catch(err => {
                console.error("获取文章列表失败:"+ err.message)
                reject(err)
            })
        })
    }

    /**
     * 获取分类文章列表（不具备分页功能）
     * @param {*} id 类别Id
     */
    static getListByCategory(id) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT article.id, article.title, article.content, article.time, category.name as category, category.category_icon, article.category_id FROM article, category WHERE article.category_id = ${id} and article.category_id = category.category_id`;
            this.query(sql).then((results) => {
                resolve(results);
            }).catch(err => {
                console.error("获取分类文章列表失败:"+ err.message)
                reject(err)
            })
        })
    }

    /**
     * 返回文章列表
     *
     * @static
     * @param {String} pageNum   分页条数
     * @param {String} [keyword=null]  搜索关键字
     * @param {String} [categoryId=null]  分类Id
     * @param {String} [page=1]  当前页码
     * @return {Promise} 返回一个成功或者失败的Promise 
     */
    static getListByCategoryPagination(pageNum, keyword = null, categoryId = null, page = 1) {
        if(pageNum !== this.pageNum) this.pageNum = pageNum
        return new Promise((resolve, reject) => {
            if(page <= 0) {
                reject({
                    code: 34,
                    msg: '页码不合法'
                })
            }

            let sql = ''
            if (categoryId) {
                sql = `SELECT article.id, article.title, article.content, article.time, category.name as category, category.category_icon, article.category_id FROM article, category WHERE article.category_id = ${categoryId} and article.category_id = category.category_id LIMIT ${(page - 1) * pageNum}, ${pageNum}`;
            } else {
                sql = `SELECT article.id, article.title, article.content, article.time, category.name as category, category.category_icon, article.category_id FROM article, category WHERE article.category_id = category.category_id LIMIT ${(page - 1) * pageNum}, ${pageNum}`;
            }
            if(keyword) {
                sql = `SELECT article.id, article.title, article.content, article.time, category.name as category, category.category_icon, article.category_id FROM article, category WHERE article.category_id = category.category_id and article.title LIKE `+ `'%${keyword}%'` +` LIMIT ${(page - 1) * pageNum}, ${pageNum}`;
            }
            this.query(sql).then((results) => {
                results = handleTimeFormat(results, 'time')
                console.log(results)
                resolve(results);
            }).catch(err => {
                console.error("获取分页列表失败:"+ err.message)
                reject(err)
            })
        })
    }

    /**
     * 获取最大页码和总记录数
     *
     * @static
     * @param {*} keyword  搜索关键字
     * @param {*} categoryId  分类Id
     * @return {Promise} 
     */
    static maxPage(keyword, categoryId) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(title) as total FROM article'
            if(categoryId) {
                sql = 'SELECT COUNT(title) as total FROM article WHERE category_id = ' + categoryId
            }
            if(keyword) {
                sql = 'SELECT COUNT(title) as total FROM article WHERE' + ` article.title LIKE '%${keyword}%'`
            }
            this.query(sql).then((results) => {
                resolve({
                    totalPage :Math.ceil(results[0].total / this.pageNum) || 1,
                    total: results[0].total
                });
            }).catch(err => {
                console.error("获取最大页数失败"+ err.message);
                reject(err)
            })
        })
    }

    static handlePage(curPage, maxPage) {
        curPage = parseInt(curPage)
        // 判断页码合法性
        // console.log(curPage, maxPage)
        if (curPage <= 0 || curPage > maxPage) {
            return;
        }


        let prevPage = parseInt(curPage) - 1;
        let nextPage = parseInt(curPage) + 1;
        if(prevPage <= 0) {
            prevPage = '#'
        }
        if(nextPage > maxPage) {
            nextPage = '#'
        }

        return {
            prevPage,
            nextPage
        }
    }
}
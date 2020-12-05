const Model = require('./model');

module.exports = class Article extends Model {
    /**
     * 文章数据模型
     * @param {*} num 
     */
    static pageNum = 5
    static getHot(num) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT article.id, article.title, article.content, article.time, category.name as category FROM article, category WHERE article.category_id = category.category_id AND hot = 1 LIMIT ?';
            this.query(sql, num).then((results) => {
                resolve(results);
            }).catch(err => {
                console.log("获取热门推荐文章失败:"+ err.message);
            })
        })
    }

    /**
     * 获取文章列表
     */
    static getList() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT article.id, article.title, article.content, article.time, category.name as category, category.category_icon, article.category_id FROM article, category WHERE article.category_id = category.category_id ORDER BY time DESC';
            this.query(sql).then((results) => {
                resolve(results);
            }).catch(err => {
                console.log("获取文章列表失败:"+ err.message);
            })
        })
    }

    /**
     * 获取分类文章列表
     * @param {*} id 类别Id
     */
    static getListByCategory(id) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT article.id, article.title, article.content, article.time, category.name as category, category.category_icon, article.category_id FROM article, category WHERE article.category_id = ${id} and article.category_id = category.category_id`;
            this.query(sql).then((results) => {
                resolve(results);
            }).catch(err => {
                console.log("获取分类文章列表失败:"+ err.message);
            })
        })
    }

    static getListByCategoryPagination(pageNum, keyword = null, categoryId = null, page = 1) {
        if(pageNum !== this.pageNum) this.pageNum = pageNum
        return new Promise((resolve, reject) => {
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
                resolve(results);
            }).catch(err => {
                console.log("获取分页列表失败:"+ err.message);
            })
        })
    }

    /**
     * 获取最大页数和总记录数
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
                console.log(results[0].total)
                resolve({
                    totalPage :Math.ceil(results[0].total / this.pageNum) || 1,
                    total: results[0].total
                });
            }).catch(err => {
                console.log("获取最大页数失败"+ err.message);
            })
        })
    }
}
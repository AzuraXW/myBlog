const Blog = require('../model/blog')

/**
 * 文章中间件
 */
module.exports = {
  // 热门新闻中间件
  getHot: (req, res, next) => {
    Blog.getHot(4).then(results => {
      req.hots = results
      next()
    }).catch(err => {
      console.error(err)
      next(err)
    })
  },

  // 获取文章列表，分页条数（默认为5），查询关键字（可选），分类ID（可选）， 当前页码（默认为1）
  getListByCategoryPagination: (req, res, next) => {
    const categoryId = req.params.categoryId || null
    const p = req.query.p || 1
    const k = req.query.k || null
    Blog.getListByCategoryPagination(5, k, categoryId, p).then(results => {
      req.list = results
      next()
    }).catch(err => {
      console.error(err.msg)
      if(err.code === 34) {
        // 页码不合法
        res.redirect(301, '/404')
      }
      next(err)
    })
  },

  // 分页中间件，最大页码和总记录数
  getPageMsg: (req, res, next) => {
    const k = req.query.k
    Blog.maxPage(k, req.params.id).then(res => {
      req.totalPageResult = res
      next()
    }).catch(err => {
      console.error(err)
      next(err)
    })
  },

  // 处理页码边界情况，如果当前页码不合法，就跳转到404页面
  handlePage: (req, res, next) => {
    const k = req.query.k
    const curPage = req.query.p || 1
    // 获得处理后的前后页码
    const page = Blog.handlePage(curPage, req.totalPageResult.totalPage)

    // 如果页码不合法
    if(!page) {
      res.redirect(301, '/404')
      return
    }

    let { prevPage, nextPage } = page
    const pageHref = {
      prevBtnDisabled: prevPage === '#',
      nextBtnDisabled: nextPage === '#',
    }
    // 搜索页面的分页按钮链接
    if(k) {
      pageHref.prev = `/search?k=${k}&p=${prevPage}`
      pageHref.next = `/search?k=${k}&p=${nextPage}`
    } else {
      pageHref.prev = `?p=${prevPage}`
      pageHref.next = `?p=${nextPage}`
    }

    req.pageHref = pageHref
    next()
  }
}

const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')
const multiquote = require('./markdown-it-multiquote')
const imageflow = require('./markdown-it-imageflow')
const li = require('./markdown-it-li')
const linkfoot = require('./markdown-it-linkfoot')
const table = require('./markdown-it-table-container')

const md = new MarkdownIt({
  html: false, // 在源码中启用 HTML 标签
  xhtmlOut: true, // 使用 '/' 来闭合单标签 （比如 <br />）。
  // 这个选项只对完全的 CommonMark 模式兼容。
  breaks: true, // 转换段落里的 '\n' 到 <br>。
  langPrefix: 'language-', // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
  linkify: true, // 将类似 URL 的文本自动转换为链接。
  // 启用一些语言中立的替换 + 引号美化
  typographer: false,
  // 高亮函数，会返回转义的 HTML。
  // 如果源字符串未更改，且应该进行外部的转义，或许返回 ''
  // 如果结果以 <pre ... 开头，内部包装器则会跳过。
  highlight: function (str, lang) {
    if (lang) {
      try {
        return `<pre class="custom"><code class="hljs">${hljs.highlight(lang, str).value}</code></pre>`
      } catch (__) {}
    }
    return '' // 使用额外的默认转义
  }
})
multiquote(md)
imageflow(md)
li(md)
linkfoot(md)
table(md)

module.exports = md

function makeRule (md) {
  return function replaceListItem () {
    md.renderer.rules.list_item_open = function replaceOpen () {
      return '<li><section>'
    }
    md.renderer.rules.list_item_close = function replaceClose () {
      return '</section></li>'
    }
  }
}

module.exports = (md) => {
  md.core.ruler.push('replace-li', makeRule(md))
}

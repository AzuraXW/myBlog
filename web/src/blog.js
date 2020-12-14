$(function() {
    replaceSearchWrod()
    padSearchInput()
});

/**
 * 查找url中的get参数
 * @param {String} name 
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
 

/**
 * 高亮显示标题中的搜索关键字
 */
function replaceSearchWrod() {
    const pathname = location.pathname
    const keywordReg = /.+k=(\w+)&?.+/ig
    if(pathname == '/search') {
        const k = getQueryString('k')
        $.each($('.blog-item h4 a'), function(index, title) {
            $(title).html($(title).html().replace(new RegExp(`${k}`, 'i'), `<span style="color: red">$&</span>`))
        })
    }
}


function padSearchInput() {
    if(location.pathname === '/search') {
        $('.search-input').val(getQueryString('k'));
    }
}
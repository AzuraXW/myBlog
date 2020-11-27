$(function(){
    navWithBottom();
})
$('.navbar-toggler').click(function() {
    $(this).toggleClass('close');
})

/**
 * 根据页面滚动给顶部导航栏添加样式
 */
function navWithBottom() {
    let scrollTmp = document.documentElement.scrollTop||document.body.scrollTop;
    if(scrollTmp > 0) {
        $("#nav").addClass("bg-blur");
    }
    window.addEventListener("scroll", function() {
        scrollTmp = document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollTmp !== 0) {
            $("#nav").addClass("bg-blur");
        } else {
            $("#nav").removeClass("bg-blur");
        }
    })
}
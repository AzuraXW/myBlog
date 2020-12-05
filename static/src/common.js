$(function(){
    navWithBottom();
    goup();
    currentNavItemAcitve();
})
$('.navbar-toggler').click(function(e) {
    e.preventDefault();
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

function goup() {
    let scrollTmp;
    window.addEventListener("scroll", function() {
        scrollTmp = document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollTmp !== 0) {
            $('.goup').removeClass('fadeout').addClass('fadein');
            $(".goup").css({
                cursor: 'pointer'
            });
        } else {
            $(".goup").removeClass('fadein').addClass('fadeout');
            $(".goup").css({
                cursor: 'default'
            });
        }
    })
    $('.goup').click(function(e) {
        if(scrollTmp === 0) {
            return;
        }
        $('html, body').animate({
            scrollTop: '0'
        });
    })
}

function currentNavItemAcitve() {
    const pathname = location.pathname;
    $.each($(".navbar-nav li"), function(index, item) {
        if(pathname.includes($(item).find('a').attr('href'))) {
            $(item).addClass('active').siblings().removeClass('active');
        }
    })
}
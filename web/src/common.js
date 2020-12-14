let loginTmp = require('./template/login.ejs')

$(function(){
    navWithBottom();
    goup();
    currentNavItemAcitve();
    openLoginDialog();
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

function validateLogin(form) {
    console.log(form, form.validate)
    form.validate({
        // 验证规则
        rules: {
            user: {
                required : true
            },
            password: {
                required : true
            }
        },
        // 错误消息
        messages: {
            user: {
                required : '用户名不得为空'
            },
            password: {
                required : '密码不得为空'
            }
        },
        // 自定义提交
        submitHandler() {
            console.log('验证通过')
        }
    })
}

function openLoginDialog() {
    $('#open-login').click(function(){
        xdialog.open({
            title: '用户登录',
            class: 'login',
            body: loginTmp(),
            effect: 'fade_in_and_scale',
            buttons: {
                ok: {
                    text: '登录',
                    clazz: 'xd-button xd-ok login-submit'
                },
                cancel: {
                    text: '取消',
                    clazz: 'xd-button xd-cancel'
                }
            },
            aftershow: function(){
                
            },
            onok: function(e) {
                // 登录按钮
                validateLogin($('#login-form'))
                $('#login-form').eq(0).submit()
                return false;
            }
        });
    })
}
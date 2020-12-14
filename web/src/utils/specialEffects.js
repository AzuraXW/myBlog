/**
 * 首页打字效果
 */
export function typing() {
    const str_arr = ['天生我材必有用', '千金散尽还复来', '长风破浪会有时', '直挂云帆济沧海'];
    let index = 0;
    let i = 0;
    let slogan = $(".wrap-hreo-content .slogan");
    let curStr = str_arr[index];
    add();
    function add() {
        slogan.html("");
        let timer = setInterval(() => {
            if(i < curStr.length) {
                slogan.html(slogan.html() + curStr.substr(i, 1));
                i++;
            } else {
                clearInterval(timer);
                timer = null;
                setTimeout(() => {
                    sub();
                }, 1500);
            }
        }, 300)
    }
    function sub() {
        let timer = setInterval(() => {
            if(i >= 0) {
                slogan.html(curStr.substr(0, i));
                i--;
            } else {
                i = 0;
                clearInterval(timer);
                timer = null;
                index++;
                if (index >= str_arr.length) {
                    index = 0
                }
                curStr = str_arr[index];
                add();
            }
        }, 100);
    }
}
/**
 * 返回顶部
 */
export function goup() {
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
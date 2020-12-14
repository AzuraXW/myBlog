$(function(){
    $('.owl-carousel').owlCarousel({
        items : 1,
        itemsDesktop : [1199,1],
        itemsDesktopSmall : [979,1],
        itemsTablet : [768,1],
        itemsMobile : [479,1],
    });

    typing();
});

function typing() {
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
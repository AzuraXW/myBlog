$(function(){
    navWithBottom();
})

function navWithBottom() {
    window.addEventListener("scroll", function() {
        let scrollTmp = document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollTmp !== 0) {
            $("#nav").addClass("bg-blur");
        } else {
            $("#nav").removeClass("bg-blur");
        }
    })
}
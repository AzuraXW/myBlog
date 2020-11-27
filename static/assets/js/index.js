import {typing, goup} from './utils/specialEffects';

$(function(){
    $('.owl-carousel').owlCarousel({
        items : 1,
        itemsDesktop : [1199,1],
        itemsDesktopSmall : [979,1],
        itemsTablet : [768,1],
        itemsMobile : [479,1],
    });

    typing();
    goup();
});


gallery = function () {

    $('.js-gallery').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.js-gallery-nav'
    });

    $('.js-gallery-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.js-gallery',
        dots: true,
        centerMode: true,
        focusOnSelect: true
    });

};
/*
	mando.cookie.js: Plugins JavaScript
	------------
	Job:					Cookie Banner
	Template Version:		1.0
	Produced by:			Heidi Crook
	Start date:				05/01/2016
	------------ 
    Dependancies:           /js/dev/vendor/js.cookie.js
****************************************************************************************************/
cookieBanner = function () {
    var cookieNotice = $('.js-cookie'),
        cookieBtn = $('.js-cookie-btn');
    //If cookie doesnt exist show banner
    if (!Cookies.get("msCookie")) cookieNotice.addClass('is-visible');
    //Set cookie - opt-in in user doesnt need to click button
    Cookies.set('msCookie', 'true', { expires: 365, path: '/' });
    //Remove banner
    cookieBtn.on("click", function () {
        cookieNotice.removeClass('is-visible'); 
    });     
};

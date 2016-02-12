
navigation = function () {

    // Initial Variables
    // -------------------------------------------------------------

    var navToggle = $("[data-toggle='button']"),
        navTarget = navToggle.data("target");

    // Mobile Menu
    // -------------------------------------------------------------

    // If have have the PUSH type data attribute
    if ($('.js-navigation').data('type') === 'push') {

        // Clone the mobile menu to a variable
        var pushMenu = $('.js-navigation__menu').clone();
        // Add the push menu class
        pushMenu.addClass('c-navigation__menu-push');
        // Add it before the wrapper div
        $('.o-wrapper').before(pushMenu);
        // Add close button
        $(".c-navigation__menu-push js-navigation__menu-push #main-navigation").prepend('<li class="c-navigation__item"><a class="c-navigation__link" href="#close" data-action="close">&#10006; Close</a></li>');

        // Set the new menu as the target
        var navTargetPush = $('.js-navigation__menu-push');
        // Set the close button variable
        var closeButton = $("[data-action='close']");

        // Toggle the is-active and is-pushed classes on click
        navToggle.on("click", function(){
            $(this).toggleClass("is-active");
            $(navTargetPush).toggleClass("is-active");
            $('body').toggleClass("is-pushed");
        });

        // Close button
        closeButton.on('click', function(){
            navToggle.removeClass("is-active");
            navTargetPush.removeClass("is-active");
            $('body').removeClass("is-pushed");
        });

    // Otherwise we have a dropdown mennu type
    } else {

        // Toggle the is-active classes on click
        navToggle.on("click", function(){
            $(this).toggleClass("is-active");
            $(navTarget).toggleClass("is-active");
        });

    }

    // Mega Menu / Dropdown
    // -------------------------------------------------------------

    // Set the dropdown sub menu variable
    var dropToggle = $("[data-toggle='dropdown']");

    dropToggle.on("click", function(){
        $(this).parent().siblings().removeClass('is-active');
        $(this).parent().toggleClass('is-active');
    });

    // Catching Clicks
    // -------------------------------------------------------------
    // Stopping propogation isn't a good idea so we do this to detect
    // page clicks and close the menu, see the link below for details.
    // https://css-tricks.com/dangers-stopping-event-propagation/

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.c-navigation').length) {
            $('.js-navigation').find('.is-active').removeClass('is-active');
        }
    });

    // Window Resize
    // -------------------------------------------------------------
    // Hides all dropdowns when we resize the browser

    $(window).on('resize', function(){
        $('.js-navigation').find('.is-active').removeClass('is-active');
        $('body').removeClass("is-pushed");
        $('.js-navigation__menu-push').removeClass("is-active");
    });

};

navigation = function () {

    // Initial Variables
    // -------------------------------------------------------------

    var navToggle = $("[data-toggle='button']"),
        navTarget = navToggle.data('target'),
        dropToggle = $("[data-toggle='dropdown']");

    // Mobile Menu
    // -------------------------------------------------------------

    navToggle.on("click", function(){
        $(this).toggleClass("is-active");
        $(navTarget).toggleClass("is-active");
    });

    // Mega Menu / Dropdown
    // -------------------------------------------------------------

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
        $('.c-navigation').find('.is-active').removeClass('is-active');
      }
    });

    // Window Resize
    // -------------------------------------------------------------
    // Hides all dropdowns when we resize the browser

    $(window).on('resize', function(){
        $('.c-navigation').find('.is-active').removeClass('is-active');
    });

};
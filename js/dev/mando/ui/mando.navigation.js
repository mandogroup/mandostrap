
navigation = function () {

    // Grab our toggle and it's linked target
    var navToggle = $("[data-toggle='button']"),
    navTarget = navToggle.data('target');

    // On click toggle active classes to both
    navToggle.on("click", function(){
        $(this).toggleClass("active");
        $(navTarget).toggleClass("active");
    });

    // Stopping propogation isn't a good idea so we do this to detect
    // page clicks and close the menu, see the link below for details.
    // https://css-tricks.com/dangers-stopping-event-propagation/
    $(document).on('click', function(event) {
      if (!$(event.target).closest('.c-navigation').length) {
        $(navToggle).removeClass("active");
        $(navTarget).removeClass("active");
      }
    });

};
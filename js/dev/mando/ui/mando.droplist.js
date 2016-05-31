/*
    mando.droplist.js: Plugins JavaScript
    ------------
    Job:                    Drop List
    Template Version:       1.0
    Produced by:            Heidi Crook
    Start date:             03/03/2016
    ------------ 
    Dependancies:           
****************************************************************************************************/
dropList = function() {
  var droplistWrap = $('.js-droplist__wrap'),
    droplistSelect = $('.js-droplist__select');

  //turn select into a button
  $('.js-droplist__select').each(function() {
    $(this).replaceWith($('<button type="button" class="c-droplist__button js-droplist__button">' + $(this).html() + '</button>'));
  });


  //toggle class to open/close menu
   $('.js-droplist__button').on("click", function () {
    $this = $(this);

    $this.parent('.js-droplist__wrap').toggleClass('is-active');

   });

    $(document).on('click', function(event) {

        if (!$(event.target).closest('.js-droplist__wrap').length) {
            $('.js-droplist__wrap').removeClass('is-active');
        }

    });
};

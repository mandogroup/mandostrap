function componentTabs() {

  /*
   * List of Dom Elements for tabs
   */
  var elements  = {
    tabs       : $(".js-tabs"),
    tabLink    : $(".js-tabs-button"),
    tabWrapper : $(".js-tabs-panel")
  };

  /*
   * Setting default load state
   * Checks If hash is present in the Url
   */

  function tabDefaultState() {
    var hash = window.location.hash.substr(1);

    elements.tabs.each(function () {
      var $this = $(this);

      $this
        .find('.js-tabs-button')
        .first()
        .addClass("is-active")
        .attr("aria-selected", "true");

      $this
        .find('.js-tabs-panel')
        .first()
        .addClass("is-open")
        .attr("aria-hidden", "false");

      if (hash.length > 0){

        if($this.find('#'+hash).length){

          $this
            .find('.js-tabs-button')
            .removeClass("is-active")
            .attr("aria-selected", "false");

          $this
            .find('.js-tabs-panel')
            .removeClass("is-open")
            .attr("aria-hidden", "true");

          $this
            .find('.js-tabs-button[href^="#'+hash+'"]')
            .addClass("is-active")
            .attr("aria-selected", "true");

          $this
            .find('#'+hash)
            .addClass("is-open")
            .attr("aria-hidden", "false");
        }

      }

    });

  }

  /*
   * Click action to toggle between states on tabs panels.
   */

  function tabAction(){

    elements.tabLink.on("click", function() {

      var $this = $(this);
      var parent = $this.closest('.js-tabs');
      var tab_id = $this.attr('href');

      parent
        .find('.js-tabs-button')
        .removeClass('is-active')
        .attr("aria-selected","false");

      parent
        .find('.js-tabs-panel')
        .removeClass('is-open')
        .attr("aria-hidden","true");

      $this
        .addClass('is-active')
        .attr("aria-selected","true");

      parent
        .find(tab_id)
        .addClass('is-open')
        .attr("aria-hidden","false");
    });
  }

  this.init = function(){
    tabDefaultState();
    tabAction();
  };

}

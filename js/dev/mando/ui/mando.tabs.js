/*
	mando.footerTabs.js: Plugins JavaScript
	------------
	Job:					Tabs
	Template Version:		1.0
	Produced by:			Heidi Crook
	Start date:				17/11/2015
	------------ 
    Dependancies:           
****************************************************************************************************/


mandoTabs = function () {

    var activeMenuCssClass = "is-active",
        hiddenCssClass = "is-hidden",
        $parentContainer = $('.js-tabs'),
        $tabLink = $('.js-tabs__link'),
        $tabContent = $('.js-tabs__content'),
        $tabContentWrap = $('.js-tabs__content-wrap'),
        $defaultTab = $('.js-tabs__default');

    //Initial Hide Content
    $tabContent.addClass(hiddenCssClass);

    $tabLink.on("click", function (e) {
        $this = $(this);

        //Current Tab variable
        var currentTab = $this.attr('href');

        //Is the one I clicked it active
        if ($this.hasClass(activeMenuCssClass)) {
            $this.removeClass(activeMenuCssClass);
            $this.parents('.js-tabs').find('.js-tabs__content-wrap').slideUp();

        }
            //Nope
        else {

            $this.parents('.js-tabs').find('.js-tabs__content-wrap').slideUp(function () {
                $this.parents('.js-tabs').find('.js-tabs__content').addClass(hiddenCssClass);
                $(currentTab).removeClass(hiddenCssClass);
                $this.parents('.js-tabs').find('.js-tabs__content-wrap').slideDown();
            });

            $this.parents('.js-tabs').find('.js-tabs__link').not($this).removeClass(activeMenuCssClass);
            $this.addClass(activeMenuCssClass);

        }

        return false;

    });

    //Open default tab
    $defaultTab.addClass(activeMenuCssClass);
    $($defaultTab.attr('href')).removeClass(hiddenCssClass);


};
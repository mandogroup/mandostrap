/*
	mando.selects.js: Plugins JavaScript
	------------
	Job:					Custom Select Drop Arrow
	Template Version:		1.0
	Produced by:			Heidi Crook
	Start date:				10/01/2015
	------------ 
    Dependancies:           Requires CSS pointer events to be supported (IE11+)
****************************************************************************************************/

var select;

(function ($) {
    select = function () {
        // Detect pointer events
        var pointerEventsSupported = (function () {
            var element = document.createElement('x'),
                documentElement = document.documentElement,
                getComputedStyle = window.getComputedStyle,
                supports;

            if (!('pointerEvents' in element.style)) {
                return false;
            }

            element.style.pointerEvents = 'auto';
            element.style.pointerEvents = 'x';
            documentElement.appendChild(element);
            supports = getComputedStyle && getComputedStyle(element, '').pointerEvents === 'auto';
            documentElement.removeChild(element);

            return !!supports;
        })();

        // If supported add custom select wrapper
        if (pointerEventsSupported) {
            var selects = $('select.js-form-select').each(function () {
                var parentElements = $(this).parents(".c-form__element-control-select");

                if (parentElements.length <= 0) {
                    $(this).wrap('<div class="c-form__element-control-select" />');
                }
            });

        }

        //add disabled class to custom select
        $('select.js-form-select').parent('.c-form__element-control-select').removeClass('disabled');
        $('select.js-form-select:disabled').parent('.c-form__element-control-select').addClass('disabled');

        $('body').on('change', function () {
            $('select.js-form-select').parent('.c-form__element-control-select').removeClass('disabled');
            $('select.js-form-select').parent('.c-form__element-control-select').addClass('disabled');

        });

    

    };

})(jQuery);
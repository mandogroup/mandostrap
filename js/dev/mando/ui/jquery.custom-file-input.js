/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/
; (function ($, window, document, undefined) {

    $('.inputfile').each(function () {
        var $input = $(this),
            $label = $input.next('label'),
             labelVal = $label.html();

        //Reset function
        function resetFile() {
            $label.html(labelVal);
            $label.next($('.js-remove')).remove();
            //refire grunticon otherwise icon disappears
            grunticon.embedIcons(grunticon.getIcons(grunticon.getCSS(grunticon.href)));

        }

        $input.on('change', function (e) {
            var fileName = '';

            if (this.files && this.files.length > 1)
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
            else if (e.target.value)
                fileName = e.target.value.split('\\').pop();

            if (fileName) {
                $label.find('span').html(fileName);
                 if (!$('.js-remove')[0]) {
                     $('<button type="button" class="c-textbutton inputfile__remove js-remove">Remove document</button>').insertAfter($label);
                }
            }
            else {
                resetFile();
            }
            $('.js-remove').on("click", function () {
                $input.val('');
                resetFile();
            });
        });

        // Firefox bug fix
        $input.on('focus', function () {
            $input.addClass('has-focus');
        }).on('blur', function () {
            $input.removeClass('has-focus');
        });

    });

})(jQuery, window, document);
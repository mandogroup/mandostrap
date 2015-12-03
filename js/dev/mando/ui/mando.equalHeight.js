equalHeights = function () {

    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = [];

    function columnConform() {

        $('.js-equalheight > .js-equalheight-item').each(function () {
       
            var $el = $(this);
            $el.height('auto');
            var topPosition = $el.position().top;

            if (currentRowStart != topPosition) {

                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }

                rowDivs.length = 0;
                currentRowStart = topPosition;
                currentTallest = $el.height();
                rowDivs.push($el);

            } else {

                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);

            }
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }

        });

    }

    $(window).resize(function () {
        columnConform();
    });

    $(window).load(function () {
        columnConform();
    });

};
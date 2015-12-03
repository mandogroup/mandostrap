
/*
mando.video.js Options
------------
Job:					NWL
Template Version:		1.0
------------

*/

mandoVideo = function () {

    if (!$('.js-video-youtube').length) {
        return;
    } else {

        $('.js-video-youtube').each(function () {
            var $video = $(this);
            var videoID = $video.data('youtube');

            $video.html('<a class="js-video-launch c-video__youtube-launch" href="javascript:void(0);" style="opacity:0;"><span class="icon-play"></span><img alt="video thumbnail"></a>');
            $video.find('img').attr('src', 'http://img.youtube.com/vi/' + videoID + '/maxresdefault.jpg');
            $video.find('a.js-video-launch').fadeTo(500, 1);

        });
    }

    $('.js-video-launch').on('click', function () {
        var videoLaunchID = $(this).parent().data('youtube');
        $(this).fadeTo(500, 0).css('position', 'absolute');
        $(this).after('<div class="c-video-wrapper js-video-wrapper" style="opacity:0;"><iframe width="150" height="150" src="http://www.youtube.com/embed/' + videoLaunchID + '?autoplay=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe></div>');
        $(this).next('.js-video-wrapper').fadeTo(500, 1);
    });

};
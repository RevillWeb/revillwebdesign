$(function(){
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();
        var target = this.hash, $target = $(target);
        var offset = ($(window).scrollTop() <= 0) ? 120 : 40;
        $('html, body').stop().animate({
            'scrollTop': ($target.offset().top - offset)
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
    $(window).scroll(sticky);
});

function sticky() {
    var scrollTop = $(window).scrollTop();
    var $nav = $('.top-nav');
    if (scrollTop > 0 ) {
        $nav.addClass('stick');
    } else {
        $nav.removeClass('stick');
    }
}
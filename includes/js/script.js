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

    var $anchors = $('.anchor');
    var $nav = $('.top-nav');
    var sticky = function() {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > 0) {
            $nav.addClass('stick');
        } else {
            $nav.removeClass('stick');
        }
        $nav.find('a').removeClass('active');
        //Highlight the navigation item
        var $nearest = null;
        $anchors.each(function(index, item){
            var $item = $(item);
            var id = $item.prop('id');
            if (($item.offset().top - 40) <= scrollTop) {
                $nearest = $nav.find('a[href^="#'+ id +'"]');
            }
        });
        if ($nearest !== null) {
            $nearest.addClass('active');
        }
    }
    $(window).scroll(sticky);

    $('#sendMail').click(function(){
        var message = $('#message').val();
        var name = $('#name').val();
        var email = $('#email').val();
        var $errors = $('#sendErrors');
        $errors.hide().empty();
        var errors = [];
        if (message.length <= 0) {
            errors.push("Please don't send me a blank message");
        }
        if (name.length <= 0) {
            errors.push("Tell me your name, I need to know who I'm talking to!");
        }
        if (email.length <= 0) {
            errors.push("If you don't give me your e-mail, how can I get back to you!");
        }
        if (errors.length === 0) {
            $.ajax({
                'url': 'https://mandrillapp.com/api/1.0/messages/send.json',
                data: {
                    "key": "7seFMcwdpAurRXNGm2CXDw",
                    "message": {
                        "html": message,
                        "text": message,
                        "subject": "Enquiry from revillwebdesign.com",
                        "from_email": email,
                        "from_name": name,
                        "to": [
                            {
                                "email": "leon@revillwebdesign.com",
                                "name": "Leon Revill",
                                "type": "to"
                            }
                        ],
                        "headers": {
                            "Reply-To": email
                        },
                        "important": true
                    }
                }
            });
        } else {
            $.each(errors, function(key, error){
                $errors.append("<li>" + error + "</li>");
            });
            $errors.fadeIn();
        }
    });

});
/*
 * Author: ArtStyles Brands (ArtTemplate / ArtIcons)
 * URL: http://themeforest.net/user/artstyles
 * Template Name: Cascadia - Multipurpose Business Agency/Personal Portfolio
 * Version: 1.1
*/

/*
 * Main sliders
 * Autoresize textarea
 * objectFit
 * Collapse Active Class
 * Reviews Carousel
 * Payment Carousel
 * Brands Carousel
 * Cascading grid
 * PopUp
 * Progress Bar
 * Subscribe
 * Contacts
 * Scroll trigger
 * Detect if device is touchscreen
 * Skrollr
 *
*/

"use strict";

(function($) {

	// Main sliders
    var $item = $('.main-slider.carousel .item'); 
    var $wHeight = $(window).height();
    $item.eq(0).addClass('active');
    $item.height($wHeight); 
    $item.addClass('image-slider');

    $('.main-slider.carousel img').each(function() {
        var $src = $(this).attr('src');
        var $color = $(this).attr('data-color');
        $(this).parent().css({
           'background-image' : 'url(' + $src + ')',
           'background-color' : $color
        });
        $(this).remove();
    });

    $(window).on('resize', function (){
        $wHeight = $(window).height();
        $item.height($wHeight);
    });


    // Autoresize textarea
    var autoresizeInit = function() {
        var container = autosize(document.querySelectorAll('textarea'));
    };

    // objectFit
    var objectFitInit = function() {
        if ( $().objectFitPolyfill ) {
            $(".img-cover").objectFitPolyfill({fit: "cover"});
        };
    };

    //Collapse Active Class
    var collapseActiveInit = function() {
        if ( $().on ) {
            $('.panel-collapse').on('show.bs.collapse', function () {
                $(this).siblings('.panel-heading').addClass('active');
            });

            $('.panel-collapse').on('hide.bs.collapse', function () {
                $(this).siblings('.panel-heading').removeClass('active');
            });
        };
    };

    //Reviews Carousel
    var reviewsInit = function() {
        if ( $().owlCarousel ) {
            var owl = $("#reviews");

                owl.owlCarousel({
                    itemsCustom : [
                        [0, 1],
                        [1200, 2]
                    ],

                    //Autoplay
                    autoPlay : false,
                    stopOnHover : true,

                    // Navigation
                    navigation : false,
                    pagination : true,

                    //Mouse Events
                    dragBeforeAnimFinish : true,
                    mouseDrag : true,
                    touchDrag : true
                });
        };
    };

    //Payment Carousel
    var paymentInit = function() {
        if ( $().owlCarousel ) {
            var owl = $("#payment");

                owl.owlCarousel({
                    itemsCustom : [
                        [0, 1],
                        [680, 2],
                        [990, 3],
                        [1200, 4]
                    ],

                    //Autoplay
                    autoPlay : true,
                    stopOnHover : true,

                    // Navigation
                    navigation : false,
                    pagination : true,

                    //Mouse Events
                    dragBeforeAnimFinish : true,
                    mouseDrag : true,
                    touchDrag : true
                });
        };
    };

    //Brands Carousel
    var brandInit = function() {
        if ( $().owlCarousel ) {
            var owl = $("#brands");

                owl.owlCarousel({
                    itemsCustom : [
                        [0, 1],
                        [480, 2],
                        [680, 3],
                        [990, 4],
                        [1200, 5]
                    ],

                    //Autoplay
                    autoPlay : true,
                    stopOnHover : true,

                    // Navigation
                    navigation : false,
                    pagination : true,

                    //Mouse Events
                    dragBeforeAnimFinish : true,
                    mouseDrag : true,
                    touchDrag : true
                });
        };
    };

    //Cascading grid
    var masonryInit = function() {
        if ( $().masonry ) {
            $('.news-grid').masonry({
                itemSelector: '.news-item',
                isFitWidth: true,
                gutter: 30
            });
        };
    };

    // PopUp
    var popupInit = function() {
        if ( $().magnificPopup ) {
            $('.popup').magnificPopup({
                type: 'inline',

                fixedContentPos: false,
                fixedBgPos: true,

                overflowY: 'hidden',

                closeBtnInside: true,
                preloader: false,

                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-slide-bottom'
            });
        }
    };

    // Progress Bar
    var progressbarInit = function() {
        $(".progress div").each(function () {
            var display = $(this),
                currentValue = parseInt(display.text()),
                nextValue = $(this).attr("aria-valuenow"),
                diff = nextValue - currentValue,
                step = (0 < diff ? 1 : -1);
            if (nextValue == "0") {
                $(display).css("padding", "0");
            } else {
                $(display).css("color", "#fff").animate({
                    "width": nextValue + "%"
                }, "slow");
            }

            for (var i = 0; i < Math.abs(diff); ++i) {
                setTimeout(function () {
                    currentValue += step
                    display.html(currentValue + "%");
                }, 20 * i);
            }
        })
    };

    // Subscribe
    $("#subscribeForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formErrorSub();
            submitMSGSub(false, "You have not entered an email");
        } else {
            // everything looks good!
            event.preventDefault();
            subscribeForm();
        }
    });

    function subscribeForm(){
        // Initiate Variables With Form Content
        var email = $("#email-subscription").val();

        $.ajax({
            type: "POST",
            url: "php/form-subscribe.php",
            data: "&email=" + email,
            success : function(text){
                if (text == "success"){
                    formSuccessSub();
                } else {
                    formErrorSub();
                    submitMSGSub(false,text);
                }
            }
        });
    }

    function formSuccessSub(){
        $("#subscribeForm")[0].reset();
        submitMSGSub(true, "Message Submitted!");
    }

    function formErrorSub(){
        $("#subscribeForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    }

    function submitMSGSub(valid, msg){
        if(valid){
            var msgClasses = "style-text-success";
        } else {
            var msgClasses = "style-text-danger";
        }
        $("#msgSubmitSub").removeClass().addClass(msgClasses).text(msg);
    }

    // Contacts
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm(){
        // Initiate Variables With Form Content
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();

        $.ajax({
            type: "POST",
            url: "php/form-contact.php",
            data: "name=" + name + "&email=" + email + "&message=" + message,
            success : function(text){
                if (text == "success"){
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false,text);
                }
            }
        });
    }

    function formSuccess(){
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Submitted!");
    }

    function formError(){
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg){
        if(valid){
            var msgClasses = "style-text-success";
        } else {
            var msgClasses = "style-text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

    //Scroll trigger
    $(window).scroll(function() {
        $('.section-stats').each(function(){
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+800) {

                //countimator
                $(function() {
                    $(".digit").countimator();
                });
            }
        });

		//Animated Header
        $(function(){
            if ($(this).scrollTop() > 50){  
                $('.fixed-header').addClass("sticky");
            }
            else{
                $('.fixed-header').removeClass("sticky");
            }
        });
    });	

	//Anchor scroll
	$('a[href^="!#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
	
    // Dom Ready
    $(function() {
        autoresizeInit();
        objectFitInit();
        collapseActiveInit();
        reviewsInit();
        paymentInit();
        brandInit();
        masonryInit();
        popupInit();
        progressbarInit();
    });

})(jQuery);

// Detect if device is touchscreen
document.documentElement.className +=
(("ontouchstart" in document.documentElement) ? ' touch' : ' no-touch');

// Skrollr
var s=skrollr.init({
    forceHeight:false,

    mobileCheck: function() {
        return false;
    }
});
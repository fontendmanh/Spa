/*global $, window, document, setTimeout, WOW, jQuery*/
$(document).ready(function () {

    'use strict';
    // Defining used variables
    var skill            =   $('.skill'),
        accordionBox     =   $('.accordion-box'),
        accordion        =   $('.accordion'),
        accordionContent =   $('.acc-content');

     $(window).on('scroll', function () {
        var wScroll = $(window).scrollTop();

        if (wScroll > 0) {
            $('.navbar').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
        }
    });

    
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: (target.offset().top - 48)
            }, 1000, "easeInOutExpo");
            return false;
            }
        }
    });


    //Accordion Box
    if(accordionBox.length){
        $(this).on('click', '.acc-btn', function() {
            
            var outerBox = $(this).parents(accordionBox);
            var target = $(this).parents(accordion);
            
            if($(this).hasClass('active')!==true){
                $('.accordion .acc-btn').removeClass('active');
            }
            
            if ($(this).next(accordionContent).is(':visible')){
                return false;
            }else{
                $(this).addClass('active');
                $(outerBox).children(accordion).removeClass('active-block');
                $(outerBox).find(accordion).children('.acc-content').slideUp(300);
                target.addClass('active-block');
                $(this).next(accordionContent).slideDown(300);    
            }
        }); 
    }

    // animating progress values on scroll
    $(window).on('scroll', function () {
        var wScroll = $(window).scrollTop();

        if ($('.progress-bar').length) {
             if (wScroll > (skill.offset().top - 400)) {
                skill.each(function (i) {
                    setTimeout(function () {
                        skill.eq(i).find('.progress-bar').attr('style', 'width: ' + skill.eq(i).find('li.strength').text() + '');
                    }, 200 + (200 * i));
                });
            }
        };
       

    });

    //todo Fact Counter + Text Count
    // $('.counter').counterUp({
    //     delay: 10,
    //     time: 3000
    // });


    //Screenshoot slider
    $(".owl-carousel").owlCarousel({
        responsive: {
            0: {
                items: 1
            },
            991: {
                items: 3
            }
        },
        loop: true,
        center: true,
        dots: false,
        nav: true,
        margin: 0,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        autoplay: true
    });

	/*
	 * current year
	 */
    $("#year").text(new Date().getFullYear());
    
    /**
	 * magnific popup video
	 */
	var $lightboxIframeEl = $('[data-lightbox="iframe"]');
	if( $lightboxIframeEl.length > 0 ) {
		$lightboxIframeEl.magnificPopup({
			disableOn: 600,
			type: 'iframe',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
    }
    
    /*----------------------------------- 
    Count Down Active 
	----------------------------------*/ 
    var currentDate = new Date();
    var enddate = currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + " 22:00:00";
    $(".pro-countdown").attr("data-countdown", enddate);
	$('[data-countdown]').each(function() {
		var $this = $(this), finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function(event) {
			$this.html(event.strftime('<div class="countdown-wrap"><div class="day"><span class="number">%D</span><span class="text">Ngày</span></div><div class="hour"><span class="number">%H</span><span class="text">Giờ</span></div><div class="minute"><span class="number">%M</span><span class="text">Phút</span></div><div class="second"><span class="number">%S</span><span class="text">Giây</span></div></div>'));
		});
    });

});

//preloader
$(window).on('load', function(){
    //todo: check domain
    initResponsive();
    initAnimation();
    initNavbar();
    $("body").css("overflow","auto");
    $(".preloader").fadeOut(1000,function(){
        $(this).remove();
    });
});

function initResponsive() {
    if( typeof jRespond === 'undefined' ) {
        console.log('responsiveClasses: jRespond not Defined.');
        return true;
    }

    var jRes = jRespond([
        {
            label: 'smallest',
            enter: 0,
            exit: 479
        },{
            label: 'handheld',
            enter: 480,
            exit: 767
        },{
            label: 'tablet',
            enter: 768,
            exit: 991
        },{
            label: 'laptop',
            enter: 992,
            exit: 1199
        },{
            label: 'desktop',
            enter: 1200,
            exit: 10000
        }
    ]);
    var $body = $("body");
    jRes.addFunc([
        {
            breakpoint: 'desktop',
            enter: function() { $body.addClass('device-lg'); },
            exit: function() { $body.removeClass('device-lg'); }
        },{
            breakpoint: 'laptop',
            enter: function() { $body.addClass('device-md'); },
            exit: function() { $body.removeClass('device-md'); }
        },{
            breakpoint: 'tablet',
            enter: function() { $body.addClass('device-sm'); },
            exit: function() { $body.removeClass('device-sm'); }
        },{
            breakpoint: 'handheld',
            enter: function() { $body.addClass('device-xs'); },
            exit: function() { $body.removeClass('device-xs'); }
        },{
            breakpoint: 'smallest',
            enter: function() { $body.addClass('device-xxs'); },
            exit: function() { $body.removeClass('device-xxs'); }
        }
    ]);
}

function initAnimation() {
	var $dataAnimateEl = $('[data-animate]');
	if( $dataAnimateEl.length > 0 ){
        var $body = $("body");
        if( $body.hasClass('device-lg') || $body.hasClass('device-md') || $body.hasClass('device-sm') ){
            $dataAnimateEl.each(function(){
                var element = $(this),
                    animationOut = element.attr('data-animate-out'),
                    animationDelay = element.attr('data-delay'),
                    animationDelayOut = element.attr('data-delay-out'),
                    animationDelayTime = 0,
                    animationDelayOutTime = 3000;

                if( animationDelay ) { animationDelayTime = Number( animationDelay ) + 500; } else { animationDelayTime = 500; }
                if( animationOut && animationDelayOut ) { animationDelayOutTime = Number( animationDelayOut ) + animationDelayTime; }

                if( !element.hasClass('animated') ) {
                    element.addClass('not-animated');
                    var elementAnimation = element.attr('data-animate');
                    element.appear(function () {
                        setTimeout(function() {
                            element.removeClass('not-animated').addClass( elementAnimation + ' animated');
                        }, animationDelayTime);

                        if( animationOut ) {
                            setTimeout( function() {
                                element.removeClass( elementAnimation ).addClass( animationOut );
                            }, animationDelayOutTime );
                        }
                    },{accX: 0, accY: -120},'easeInCubic');
                }
            });
        }
	}
}

function initNavbar() {
    // Cache selectors
    var lastId,
    topMenu = $(".nav"),
    topMenuHeight = topMenu.outerHeight() + 15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { 
            return item; 
        }
    });

    // Bind to scroll
    $(window).scroll(function(){
        // Get container scroll position
        var fromTop = $(this).scrollTop()+topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });

        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#"+id+"']").parent().addClass("active");
        }                   
    });
}
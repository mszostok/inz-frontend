;(function () {
	
	'use strict';

	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-burger-nav-toggle', function(event){

			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');	
			} else {
				$(this).addClass('active');	
			}

			event.preventDefault();
			
		});

	};

	// Page Nav
	var clickMenu = function() {

		$('a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');
		    $('html, body').animate({
		        scrollTop: $('[data-section="' + section + '"]').offset().top
		    }, 1);

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-burger-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});

	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};
	var navigationSection = function() {

		var $section = $('div[data-section]');
		
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		    
		  	}
		}, {
		  	offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	// Window Scroll
	var windowScroll = function() {
		$(window).scroll(function(event){
		   	var header = $('#header-scroll'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 200 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top header-smooth-anim slideInDown');
			} else if ( scrlTop <= 300) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('header-smooth-anim slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top header-smooth-anim slideInDown slideOutUp');
					}, 400 );
				}
			} 
		});
	};



	// Animations

	// Services
	var servicesAnimate = function() {

		if ( $('#fh5co-our-services').length > 0 ) {	
			$('#fh5co-our-services .to-animate').each(function( k ) {
				
				var el = $(this);
				
				setTimeout ( function () {
					el.addClass('fadeInUp animated');
				},  k * 200, 'easeInOutExpo' );
				
			});
		}

	};
	var servicesWayPoint = function() {

		if ( $('#fh5co-our-services').length > 0 ) {
			$('#fh5co-our-services').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this).hasClass('animated') ) {


					setTimeout(servicesAnimate, 200);

					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '95%' } );
		}

	};


	// Features
	var featuresAnimate = function() {

		if ( $('#fh5co-features').length > 0 ) {	
			$('#fh5co-features .to-animate').each(function( k ) {
				
				var el = $(this);
				
				setTimeout ( function () {
					el.addClass('fadeInUp animated');
				},  k * 200, 'easeInOutExpo' );
				
			});
		}

	};
	var featuresWayPoint = function() {

		if ( $('#fh5co-features').length > 0 ) {
			$('#fh5co-features').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this).hasClass('animated') ) {


					setTimeout(function(){
						$('.animate-features-1').addClass('animated fadeIn');
					}, 100);
					setTimeout(function(){
						$('.animate-features-2').addClass('animated fadeIn');
					}, 200);
					setTimeout(featuresAnimate, 500);
					setTimeout(function(){
						$('.animate-features-3').addClass('animated fadeInUp');
					}, 1400);

					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '95%' } );
		}

	};



	// Document on load.
	$(function(){

		burgerMenu();
		clickMenu();
		windowScroll();
		navigationSection();

		servicesWayPoint();
		featuresWayPoint();
	});


}());
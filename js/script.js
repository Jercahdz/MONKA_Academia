$(document).ready(function(){

	"use strict";
	
	/* =================================
	BANNER ROTATOR IMAGE 
	=================================== */
	var slide = $('.carousel-inner .item');
	slide.each(function(){
		var src = $(this).find('img').attr('src');
		$(this).css('background-image', 'url(' + src + ')');
	});
	
	

	/* =================================
	LOADER 
	=================================== */
	$(".loader").delay(400).fadeOut();
    $(".animationload").delay(400).fadeOut("fast");
	
	
	/* =================================
	NAVBAR 
	=================================== */
	jQuery(window).scroll(function () {
		var top = jQuery(document).scrollTop();
		var batas = jQuery(window).height();

		if (top > batas) {
			jQuery('.navbar-main').addClass('stiky');
		} else {
			jQuery('.navbar-main').removeClass('stiky'); 
		}
	});
	
	
	/* =================================
	VERTICLE TEXT 
	=================================== */
	var current = 1; 
	var height = $('.info-item').height(); 
	var numberDivs = $('.info-item').children().length; 
	var first = $('.info-item div:nth-child(1)'); 
	setInterval(function() {
		var number = current * -height;
		first.css('margin-top', number + 'px');
		if (current === numberDivs) {
			first.css('margin-top', '0px');
			current = 1;
		} else current++;
	}, 5000);
	
	
	
	/* =================================
	OWL CAROUSEL
	=================================== */
	
	// Home - Shop
	var shop = $("#shop-caro");
	shop.owlCarousel({
		singleItem : true,
		autoPlay : 5000,
		pagination : false
	});
	
	// Home - Our Player
	var player = $("#player-caro");
	player.owlCarousel({
		items : 4,
		itemsMobile : [479,1],
		pagination : true,
		afterInit: playerInit
	});
	
	function playerInit(){
		$('#player-caro .owl-controls .owl-page').append('<a class="item-link"/>');
		var pafinatorsLink = $('#player-caro .owl-controls .item-link');
		$('#player-caro .owl-controls').prependTo('.player-pagination');
		$.each(this.owl.userItems, function (i) {
			$(pafinatorsLink[i]).text( i+1 );
		});
	}
	
	// About - Welcome
	var about = $("#about-caro");
	about.owlCarousel({
		singleItem : true,
		autoPlay : 5000,
		pagination : true
	});

	// About - History
	var history = $("#history-caro");
	history.owlCarousel({
		singleItem : true,
		pagination : true,
		afterInit: historyInit
	});
	
	function historyInit(){
		$('.history-caro .owl-controls .owl-page').append('<a class="item-link"/>');
		var pafinatorsLink = $('.history-caro .owl-controls .item-link');
		$('.history-caro .owl-controls').appendTo('.nav-history');
		$.each(this.owl.userItems, function (i) {
			$(pafinatorsLink[i]).text( $(this).find('.title').attr('data-year') );
		});
	}
	
	// Team - Primary
	var teams = $("#primary-team-caro");
	teams.owlCarousel({
		singleItem : true,
		pagination : false
	});
 
	var tom = $('#primary-nav .position');
	tom.each(function(e){
		$(this).on('click', function(){
			teams.trigger('owl.goTo', e);
			$(this).addClass('active').siblings().removeClass('active');
		});
	});
		  
	// Team - Secondary
	var teams2 = $("#secondary-team-caro");
	teams2.owlCarousel({
		singleItem : true,
		pagination : false
	});
 
	var tom2 = $('#secondary-nav .position');
	tom2.each(function(e){
		$(this).on('click', function(){
			teams2.trigger('owl.goTo', e);
			$(this).addClass('active').siblings().removeClass('active');
		});
	});
	
	
	
	/* =================================
	FAQ
	=================================== */
	$('.panel-heading a').on('click', function() {
		$('.panel-heading').removeClass('active');
		$(this).parents('.panel-heading').addClass('active');
	});
	
	
	
	/* =================================
	MAGNIFIC POPUP
	=================================== */
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1]
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
			  return item.el.attr('title') + '';
			}
		}
	});
});




  
  
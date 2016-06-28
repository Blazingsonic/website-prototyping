// ==========================================================================
// Variables
// ==========================================================================

// General

var isScrolling = false;
var menuOpen = false;

// URL

var currentUrl = document.location.pathname.match(/[^\/]+$/)[0];

// Offsets

// index.html

if (currentUrl === 'index.html') {
	var vrOffset = $('#vr').offset().top - 60;
	var vorteileOffset = $('#vorteile').offset().top - 60;
	var erlebnisOffset = $('#erlebnis').offset().top - 60;
	var ctaOffset = $('#cta').offset().top - 60;
}

// cta.html

if (currentUrl === 'cta.html') {
	var interesseOffset = $('#interesse').offset().top - 60;
	var commerceOffset = $('#commerce').offset().top - 60;
	var factsOffset = $('#facts').offset().top - 80;
	var contactOffset = $('#contact').offset().top - 80;
}

// ==========================================================================
// Tests
// ==========================================================================

console.log(currentUrl);

console.log(vrOffset);

console.log('This is a test');

// ==========================================================================
// SVG
// ==========================================================================

// Load SVG sprite

$.get("img/sprite/svg.svg", function(data) {
  	var div = document.createElement('div');
  	div.className += 'hide-svg-defs';
  	div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
	document.body.insertBefore(div, document.body.childNodes[0]);
});

// ==========================================================================
// Grid
// ==========================================================================

// Add click to grid button

$(document).ready(function() {
	$('.show-grid-button').on('click', function() {
		$('.gridlover-grid').toggle();
	});
});

// ==========================================================================
// Smoothscroll
// ==========================================================================

// Initialize all links with smoothscroll

$('a').smoothScroll({
	beforeScroll: function() {
		isScrolling = true; }
	}
);

$('a').smoothScroll({
	afterScroll: function() {
		isScrolling = false; }
	}
);

// ==========================================================================
// Navigation
// ==========================================================================

// Change active class on click event on main nav items

$(document).ready(function(){
	$('.main-nav li').click(function() {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});
});

// Adjust current nav item according to window height

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();

    console.log(scroll);

    if (isScrolling == false) {

    	if (currentUrl === 'index.html') {

    		if (scroll < vrOffset - 1) { // First section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(1)').addClass('active');
		    } else if (scroll >= vrOffset && scroll < erlebnisOffset) { // Second section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(2)').addClass('active');
		    } else if (scroll >= erlebnisOffset && scroll < ctaOffset) { // Third section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(3)').addClass('active');
		    } else if (scroll >= ctaOffset) { // Fourth section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(4)').addClass('active');
		    }

    	} else if (currentUrl === 'cta.html') {

    		if (scroll < commerceOffset - 1) { // First section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(1)').addClass('active');
		    } else if (scroll >= commerceOffset && scroll < factsOffset) { // Second section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(2)').addClass('active');
		    } else if (scroll >= factsOffset && scroll < contactOffset) { // Third section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(3)').addClass('active');
		    } else if (scroll >= contactOffset) { // Fourth section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(4)').addClass('active');
		    }

    	}

    }
});

// Adjust navbar position when pushy is clicked

$(document).ready(function() {
	$('.menu-btn').click(function() {
		console.log('menu-btn');
		var offsetTop = $(window).scrollTop();

		if (!menuOpen) {
			$('.header').css('top', offsetTop);
			menuOpen = true;
		} else if (menuOpen) {
			$('.header').css('top', 0);
			menuOpen = false;
		}
	});
	$('#container').click(function() {
		var offsetTop = $(window).scrollTop();
		console.log('container');
		if (menuOpen) {
			$('.header').css('top', 0);
			menuOpen = false;
		}
	});
});

// ==========================================================================
// Form interactions
// ==========================================================================

// Send form interaction

$(document).ready(function() {
	$('.btn-fake-submit').click(function() {
		$('.contact').hide();

		$('#contact').scrollView();

		var $recipeHeading = $('.recipe h2');
		var $recipeParagraph = $('.recipe p');
		var $recipeImg = $('.recipe div');
		var $recipeBtn = $('.recipe button');
		TweenMax.set($recipeHeading, {opacity: 0});
		TweenMax.set($recipeParagraph, {opacity: 0});
		TweenMax.set($recipeImg, {opacity: 0});
		TweenMax.set($recipeBtn, {y: '+=20', opacity: 0});
		TweenMax.to($recipeHeading, 1, {opacity: 1});
		TweenMax.to($recipeParagraph, 1, {opacity: 1}, 0);
		TweenMax.to($recipeImg, 1, {opacity: 1}, 0);
		TweenMax.to($recipeBtn, 0.5, {y: '0', opacity: 1});
		$('.recipe').show();
	});
});

// ==========================================================================
// Helper Functions
// ==========================================================================

// Scrolling function

$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 700);
  });
}

// ==========================================================================
// Animations
// ==========================================================================

// Animate menu icon on click

$('.menu').click(function() {
	$('.menu span:nth-child(2)').toggleClass('transparent');
	$('.menu span:nth-child(1)').toggleClass('rotate-top');
	$('.menu span:nth-child(3)').toggleClass('rotate-bottom');
});

// Simulate click on icon when other part of screen is clicked

$('.site-overlay').click(function() {
	$('.menu span:nth-child(2)').toggleClass('transparent');
	$('.menu span:nth-child(1)').toggleClass('rotate-top');
	$('.menu span:nth-child(3)').toggleClass('rotate-bottom');
});

$('.pushy-link').click(function() {
	$('.menu span:nth-child(2)').toggleClass('transparent');
	$('.menu span:nth-child(1)').toggleClass('rotate-top');
	$('.menu span:nth-child(3)').toggleClass('rotate-bottom');
});

// Animate vorteile from left to right

var $vorteil = $('.vorteil');
var vorteilFlag = false;
TweenMax.set($vorteil, {x: '-=50', opacity: 0});

$(window).scroll(function (event) {
	var scroll = $(window).scrollTop();
	if (scroll > vorteileOffset && vorteilFlag == false) {
		TweenMax.staggerTo($vorteil, 1,  {x: '0', opacity: 1}, 0.25);
		vorteilFlag = true;
	}
});

// Animate commerce steps from left to right

var $cStepAll = $('.commerce-journey-step');
var $cStepOdd = $('.commerce-journey-step:nth-child(odd)');
var $cStepEven = $('.commerce-journey-step:nth-child(even)');
var stepFlag = false;
TweenMax.set($cStepOdd, {x: '-=50', opacity: 0});
TweenMax.set($cStepEven, {x: '+=50', opacity: 0});

$(window).scroll(function (event) {
	var scroll = $(window).scrollTop();
	if (scroll > commerceOffset && stepFlag == false) {
		TweenMax.staggerTo($cStepAll, 1,  {x: '0', opacity: 1}, 0.25);
		stepFlag = true;
	}
});

// Animate facts from left to right

var $fact = $('.fl-item');
var factFlag = false;
TweenMax.set($fact, {y: '+=50', opacity: 0});

$(window).scroll(function (event) {
	var scroll = $(window).scrollTop();
	if (scroll > factsOffset - 90 && factFlag == false) {
		TweenMax.staggerTo($fact, 1,  {y: '0', opacity: 1}, 0.25);
		stepFlag = true;
	}
});














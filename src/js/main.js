// ==========================================================================
// General Functions
// ==========================================================================

// Global Variables

var isScrolling = false;
var menuOpen = false;

// Tests

var currentUrl = document.location.pathname.match(/[^\/]+$/)[0];
console.log(currentUrl);

console.log('This is a test');

// Load SVG sprite

$.get("img/sprite/svg.svg", function(data) {
  	var div = document.createElement('div');
  	div.className += 'hide-svg-defs';
  	div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
	document.body.insertBefore(div, document.body.childNodes[0]);
});

// Add click to grid button

$(document).ready(function() {
	$('.show-grid-button').on('click', function() {
		$('.gridlover-grid').toggle();
	});
});

// Smoothscroll

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

// Navigation Hint

$(document).ready(function(){
	$('.main-nav li').click(function() {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});
});

// Adjust current nav item according to window height

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();

    // Do something
    console.log(scroll);

    if (isScrolling == false) {

    	if (currentUrl === 'index.html') {

    		if (scroll < 599) { // First section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(1)').addClass('active');
		    } else if (scroll >= 599 && scroll < 2266) { // Second section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(2)').addClass('active');
		    } else if (scroll >= 2266 && scroll < 3085) { // Third section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(3)').addClass('active');
		    } else if (scroll >= 3085) { // Fourth section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(4)').addClass('active');
		    }

    	} else if (currentUrl === 'cta.html') {

    		if (scroll < 635) { // First section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(1)').addClass('active');
		    } else if (scroll >= 635 && scroll < 1943) { // Second section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(2)').addClass('active');
		    } else if (scroll >= 1943 && scroll < 2471) { // Third section
		    	$('.main-nav li').removeClass('active');
		    	$('.main-nav li:nth-child(3)').addClass('active');
		    } else if (scroll >= 2471) { // Fourth section
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
// Animations
// ==========================================================================

/* Parallax Rocket -------------------- */

// Controller

// $(function() {
//   var controller = new ScrollMagic.Controller();

//   var blockTween = new TweenMax.to('#test-animate a', 1.5, {
//     color: 'red'
//   });

//   var containerScene = new ScrollMagic.Scene({
//       triggerElement: '#container'
//     })
//     .setTween(blockTween)
//     .addTo(controller);
// });

/* Menu -------------------- */

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




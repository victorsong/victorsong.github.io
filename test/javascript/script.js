// Grid variables
var colCount = 3;
    gutterCount = colCount + 1;
    noGutterCol = $(window).width() / colCount;
    gutter = noGutterCol / 10; 
    col = noGutterCol - gutter - (gutter / colCount);
    doubleColGutter = ($(window).width() / 2) / 10;
    doubleCol = ($(window).width() / 2) - doubleColGutter - (doubleColGutter / 2);

// Mobile Breakpoint
	mobile = window.matchMedia("(max-width: 48rem)");

// Link Variables
    currentLinkPosition = $(window).height() * 0.35;
    baseline = 40;

// Get height of browser and add to sections
var browserHeightSections = function() {
	browserHeightTop = $(window).height() * 0.35
	browserHeightBottom = $(window).height() * 0.55
	if (mobile.matches) {
		$('section').css({
			"padding-top": browserHeightTop / 2,
			"padding-bottom": browserHeightBottom / 2
		})
	} else {
		$('section').css({
			"padding-top": browserHeightTop,
			"padding-bottom": browserHeightBottom
		})
	}
}

// Get progress of page in percentage
var percentProgress = function() {
	return $(window).scrollTop() / Math.max(($(document).height() - $(window).height()), 1);
}

// Scroll smoothly to sections
var scrollToIDs = function() {
	$('a[href*="#"]').on('click', function(e) {
		e.preventDefault()
		$('html, body').animate( {
			scrollTop: $($(this).attr('href')).offset().top,
		}, 700, 'swing')
	})
}

// Sets intial link positions
var linkPosition = function(idName, idLink, order){
	var initialPosition = $(window).height() - ((8 - order) * ($(window).height() / baseline));
	$(idLink).css({
		"top": initialPosition,
	})
}

var firstLinkPosition = function (idName) {
	$(idName).css({
		"top": currentLinkPosition,
	})
}

var hamburgerPosition = function() {
	$('#menuIcon').css({
		"padding": ($(window).width()/20),
	})
	$('#menuClose').css({
		"padding": ($(window).width()/20),
	})
}

// Color sections based on scroll
var sectionColors = function(backgroundColor, textColor, accentColor){
	$('body').css({
		"background-color": backgroundColor,
	})
	$('.nav').css({
		"color": accentColor,
	})
	$('a').css({
		"color": backgroundColor,
	})
	$('a').css({
		"background-color": accentColor,
	})
	$('a').mouseover(function() {
		$(this).css({
			"background-color": backgroundColor,
			"color": accentColor,
		}).mouseout(function() {
			$(this).css({
				"background-color": accentColor,
				"color": backgroundColor,
			})
		})
	})
	$('p').css({
		"color": textColor,
	})
	$('h1').css({
		"color": accentColor,
	})
	$('h2').css({
		"color": accentColor,
	})
	$('.buns').css({
		"stroke": backgroundColor,
	})
	$('.bacon').css({
		"stroke": backgroundColor,
	})
	$('#menuIcon').mouseover(function() {
		$('.buns').css({
			"stroke": accentColor,
		})
		$('.bacon').css({
			"stroke": accentColor,
		})
		$('header').css({
			"background-color": backgroundColor,
		})
		$(this).css({
			"cursor": "pointer",
		})
	}).mouseout(function() {
		$('.buns').css({
			"stroke": backgroundColor,
		})
		$('.bacon').css({
			"stroke": backgroundColor,
		})
		$('header').css({
			"background-color": accentColor,
		})
	})
	$('#menuClose').mouseover(function() {
		$(this).css({
			"cursor": "pointer",
		})
	})
	if (mobile.matches) {
		$('header').css({
			"background-color": accentColor,
		})
	}
}

// Mobile dropdown menu
var dropdown = function() {
	$('#menuIcon').click(function(){
		$('nav').css({
			"display": "block",
		})
		$('#menuIcon').css({
			"display": "none",
		})
		$('#menuClose').css({
			"display": "block",
		})
	})
	$('#menuClose').click(function(){
		$('nav').css({
			"display": "none",
		})
		$('#menuIcon').css({
			"display": "block",
		})
		$('#menuClose').css({
			"display": "none",
		})
	})
}

// Animates the links based on scroll position
var linkAnimation = function(idName, idLink, order){
	var threshold = $(window).height() / 2;
	    bottomPosition = $(window).height() - ((8 - order) * ($(window).height() / baseline));
	    sectionHeight = $(window).height();
	    topPosition = $(window).height() - ((baseline - order)) * ($(window).height() / baseline);
	    offsetTop = $(idName).offset().top - threshold
	    offsetBot = $(idName).offset().top + $(idName).outerHeight() - threshold;
	    scrollTop = $(window).scrollTop();
	// If not scrolled to section, link remains at bottom    
	if (scrollTop <= offsetTop) {
		$(idLink).css({
			"top": bottomPosition,
		})
	}
	// If currently scrolling within section, link should be active
	if (scrollTop > offsetTop && scrollTop < offsetBot) {
		$(idLink).css({
			"top": currentLinkPosition,
		})
	}
	// If scrolled past section, link moves to top
	if (scrollTop >= offsetBot) {
		$(idLink).css({
			"top": topPosition,
		})
	}
}

var scrollColorChange = function(idName, order, backgroundColor, textColor, accentColor){
	var threshold = $(window).height() / 2;
	    bottomPosition = $(window).height() - ((8 - order) * ($(window).height() / baseline));
	    sectionHeight = $(window).height();
	    topPosition = $(window).height() - ((baseline - order)) * ($(window).height() / baseline);
	    offsetTop = $(idName).offset().top - threshold
	    offsetBot = $(idName).offset().top + $(idName).outerHeight() - threshold;
	    scrollTop = $(window).scrollTop();
	    if (scrollTop > offsetTop && scrollTop < offsetBot) {
			sectionColors(backgroundColor, textColor, accentColor);
	}
}

// Lazyload function
var lazyload = function(threshold, image) {
	var imageOffset = $(image).offset().top;
	    topThreshold = imageOffset - threshold - $(window).height();
	    bottomThreshold = imageOffset + $(image).outerHeight() + threshold;
	if ($(window).scrollTop() > topThreshold && $(window).scrollTop() < bottomThreshold) {
		$(image).attr('src', $(image).attr('data-src'));
		$(image).css({
			"opacity": "1",
		});
	}
}

// Call functions
$(document).ready(function (){
	browserHeightSections();
	scrollToIDs();
	scrollColorChange('#intro', 1, '#eeebe1', '#333333', '#3b504f');
	$(".owl-carousel").owlCarousel({
		loop: true,
		margin: 10,
		lazyLoad: true,
		autoplay: true,
		autoplayTimeout: 2500,
		autoplayHoverPause: true,
		autoplaySpeed: 1000,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1400: {
				items: 3
			}
		}
	});

	if (mobile.matches) {
		hamburgerPosition();
		dropdown();
	} else {
		firstLinkPosition('#introLink');
		linkPosition('#pnc', '#pncLink', 2);
		linkPosition('#vestige', '#vestigeLink', 3);
		linkPosition('#animation', '#animationLink', 4);
		linkPosition('#ballroom', '#ballroomLink', 5);
		linkPosition('#resume', '#resumeLink', 6);
		linkAnimation('#intro', '#introLink', 1);
	}
})

$(window).scroll(function (){

	scrollColorChange('#intro', 1, '#eeebe1', '#333333', '#3b504f');
	scrollColorChange('#pnc', 2, '#eeebe1', '#333333', '#3b504f');
	scrollColorChange('#vestige', 3, '#222222', '#ffffff', '#ffd800');
	scrollColorChange('#animation', 4, '#9dc1c0', '#333333', '#361524');
	scrollColorChange('#ballroom', 5, '#32343b', '#ffffff', '#dbb5c6');
	scrollColorChange('#resume', 6, '#eeebe1', '#333333', '#3b504f');

	$('img').each(function() {
		lazyload(50, this);
	});

	if (mobile.matches) {

	} else {
		linkAnimation('#intro', '#introLink', 1);
		linkAnimation('#pnc', '#pncLink', 2);
		linkAnimation('#vestige', '#vestigeLink', 3);
		linkAnimation('#animation', '#animationLink', 4);
		linkAnimation('#ballroom', '#ballroomLink', 5);
		linkAnimation('#resume', '#resumeLink', 6);
	}
})
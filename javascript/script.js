var verified = true;

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
    baseline = 30;

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
		"padding": ($(window).width()/40),
	})
	$('header').css({
		"margin": ($(window).width()/40),
	})
	$('#menuClose').css({
		"padding": ($(window).width()/40),
	})
}

// Color nav based on scroll
var navColors = function(backgroundColor, textColor, accentColor){
	$('.nav, nav a').css({
		"color": backgroundColor,
	})
	$('nav a').css({
		"background-color": accentColor,
	})
	$('nav a').hover(function() {
		$(this).css({
			"background-color": backgroundColor,
			"color": accentColor,
		})
	}, function() {
		$(this).css({
			"background-color": accentColor,
			"color": backgroundColor,
		})
	})
	$('.buns, .bacon').css({
		"stroke": backgroundColor,
	})
	$('#menuIcon, #menuClose').hover(function() {
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
		$('nav, #menuClose, #menuBackground').css({
			"display": "block",
		})
		$('#menuIcon').css({
			"display": "none",
		})
	})
	$('nav a, #menuClose, #menuBackground').click(function(){
		$('nav, #menuClose, #menuBackground').css({
			"display": "none",
		})
		$('#menuIcon').css({
			"display": "block",
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
			navColors(backgroundColor, textColor, accentColor);
	}
}

var passwordProtection = function(idName, order, backgroundColor, textColor, accentColor){
	var threshold = $(window).height() / 2;
	    bottomPosition = $(window).height() - ((8 - order) * ($(window).height() / baseline));
	    sectionHeight = $(window).height();
	    topPosition = $(window).height() - ((baseline - order)) * ($(window).height() / baseline);
	    offsetTop = $(idName).offset().top - threshold
	    offsetBot = $(idName).offset().top + $(idName).outerHeight() - threshold;
	    scrollTop = $(window).scrollTop();
	    $('#pwButton').hover(function() {
	    	$(this).css({
				"cursor": "pointer",
				"background-color": backgroundColor,
				"color": accentColor,
				"border-color": accentColor,
			})
	    }, function() {
	    	$(this).css({
	    		"background-color": accentColor,
				"color": backgroundColor,
				"border-color": backgroundColor,
	    	})
	    })
	    if (scrollTop > offsetTop && scrollTop < offsetBot && verified == false) {
			$('#passwordModal').css({
				"display": "block",
			});
		} else {
			$('#passwordModal').css({
				"display": "none",
			})
		}
	$('#passwordModal').css({
		"margin-top": $(window).height()*0.35,
	})
}

var passwordEntry = function(idName) {
	var userPW = document.getElementById("userEnteredPW").value;
	if (userPW == '2019') {
		verified = true;
		$('#passwordModal').css({
			"display": "none",
		});
		$(idName).css({
			"filter": "none"
		})
	} else {
		document.getElementById("passwordText").innerHTML = "Wrong password, please try again."
	}
}

// Lazyload function
var lazyload = function(threshold, image) {
	var imageOffset = $(image).offset().top;
	    topThreshold = imageOffset - threshold - $(window).height();
	    bottomThreshold = imageOffset + $(image).outerHeight() + threshold;
	if ($(window).scrollTop() > topThreshold && $(window).scrollTop() < bottomThreshold) {
		$(image).removeClass("unloaded").addClass("loaded");
		$(image).attr('src', $(image).attr('data-src'));
		$(image).css({
			"opacity": "1",
		})
	}
}

// Timer function
var idleTime = 0;

var lazyloadTimer = function(threshold, image) {
	setInterval(function() {
		if (idleTime > 1 && $(image).attr("class") == "unloaded") {
			lazyload(threshold, image);
		}
	}, 100)
}

var idleInterval = setInterval(function() {
	idleTime = idleTime + 1;
}, 50) //.1s

// Owl Carousel 
$('.owl-carousel').on("click tap", function() {
	owl.trigger('stop.owl.autoplay');
	setInterval(function() {
		console.log(play);
		owl.trigger('play.owl.autoplay', [2000])
	}, 5000);
})

// Call functions
$(document).ready(function (){
	browserHeightSections();
	scrollToIDs();
	scrollColorChange('#intro', 1, '#3b504f', '#333333', '#eeebe1');
	$(".owl-carousel").owlCarousel({
		loop: true,
		margin: 10,
		autoplay: true,
		autoplayTimeout: 2500,
		autoplayHoverPause: true,
		autoplaySpeed: 2000,
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

	if (verified==false) {
		$('#pnc').css({
			"filter": "contrast(0%)"
		})
	}

	if (mobile.matches) {
		hamburgerPosition();
		dropdown();
	} else {
		firstLinkPosition('#introLink');
		linkAnimation('#intro', '#introLink', 1);
		linkPosition('#pnc', '#pncLink', 2);
		linkPosition('#vestige', '#vestigeLink', 3);
		linkPosition('#ballroom', '#ballroomLink', 4);
		linkPosition('#blur', '#blurLink', 5);
		linkPosition('#resume', '#resumeLink', 6);
	}
})

$(window).scroll(function (){
	if (verified == false) {
		passwordProtection('#pnc', 2, '#f7f8f9', '#333333', '#2a6296');
	}
	scrollColorChange('#intro', 1, '#3b504f', '#eeebe1', '#eeebe1');
	scrollColorChange('#pnc', 2, '#f7f8f9', '#333333', '#2a6296');
	scrollColorChange('#vestige', 3, '#ffffff', '#333333', '#111111');
	scrollColorChange('#ballroom', 4, '#044661', '#ffffff', '#ff9b9b');
	scrollColorChange('#blur', 5, '#111111', '#ffffff', '#dddddd');
	scrollColorChange('#resume', 6, '#eeebe1', '#333333', '#3b504f');

	$('.lazyload img, video').each(function() {
		lazyloadTimer(300, this);
	});
	idleTime = 0;

	if (mobile.matches) {

	} else {
		linkAnimation('#intro', '#introLink', 1);
		linkAnimation('#pnc', '#pncLink', 2);
		linkAnimation('#vestige', '#vestigeLink', 3);
		linkAnimation('#ballroom', '#ballroomLink', 4);
		linkAnimation('#blur', '#blurLink', 5);
		linkAnimation('#resume', '#resumeLink', 6);
	}
})
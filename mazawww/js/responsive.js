jQuery(document).ready(function() {
	"use strict";

	var submainResizeTimer = null;

	jQuery('.w-sections').each(function() {
		if ( ! jQuery(this).hasClass('nav_aside')) {
			var tabs = jQuery(this).find('.w-sections-item');
			tabs.css({'width': Math.round(10000/tabs.length)/100+'%'});
		}
	});

	window.resizeSubmain = function(){
		var frameVerticalMargins = {
				1600: 80,
				1440: 70,
				1366: 60,
				1280: 50,
				'default': 100
			},
			frameHorizontalMargins = {
				1600: 80,
				1440: 70,
				1366: 60,
				1280: 50,
				1024: 40,
				768: 30,
				600: 20,
				'default': 100
			},
			innerMargins = {
				1280: 50,
				1024: 40,
				768: 30,
				600: 20,
				'default': 60
			},
			H = jQuery(window).height()-0, // Browser window height
			W = jQuery(window).width()-0, // Browser window width
			a,
			b,
			c,
			matchedWidth = 100000,
			body = jQuery('body'),
			scrollHandlerPageTO = null;

		jQuery.each(frameVerticalMargins, function(w, margin){
			w = w-0;
			if (w !== 'default' && W <= w && matchedWidth > w) {
				matchedWidth = w;
				a = margin;
			}
		});
		if (a === undefined) {
			a = frameVerticalMargins.default;
		}

		window.a = a;

		body.removeClass('screen_1600 screen_1440 screen_1366 screen_1280 screen_1024 screen_768 screen_600');
		matchedWidth = 100000;
		jQuery.each(frameHorizontalMargins, function(w, margin){
			w = w-0;
			if (w !== 'default' && W <= w && matchedWidth > w) {
				matchedWidth = w;
				b = margin;
			}
		});
		if (b === undefined) {
			b = frameHorizontalMargins.default;
		} else {
			body.addClass('screen_'+matchedWidth);
		}


		matchedWidth = 100000;
		jQuery.each(innerMargins, function(w, margin){
			w = w-0;
			if (w !== 'default' && W <= w && matchedWidth > w) {
				matchedWidth = w;
				c = margin;
			}
		});
		if (c === undefined) {
			c = innerMargins.default;
		}

		jQuery('a[href^=#]').off('click').click(function(event) {
			event.preventDefault();
			event.stopPropagation();
			var link = this;
			jQuery.smoothScroll({
				offset: -a,
				scrollTarget: link.hash
			});
		});

		jQuery('.l-header .w-nav').each(function () {
			var navControl = jQuery(this).find('.w-nav-control'),
				navList = jQuery(this).find('.w-nav-list'),
				listHeight,
				listOpen = false;

			if (W <= 960) {
				if (body.hasClass('type_wide')) {
					navList.css({width: (W-2*b)+'px'});
				} else {
					navList.css({width: (W-2*b)+'px'});
				}
			} else {
				navList.css({width: ''});
			}


			navControl.off('click').click(function() {
				if (listOpen) {
					navList.animate({height: 0}, 250, function(){
						navList.css({height: '', display: ''});
					});
					listOpen = false;
				} else {
					if (!listHeight) {
						navList.css({opacity: 0, display: 'block'});
						listHeight = navList.height();
						navList.css({opacity: 1});

					}
					navList.css({height: 0, display: 'block'});
					navList.animate({height: listHeight}, 250, function(){
						navList.css({height: ''});
					});
					listOpen = true;
				}
			});

			navList.find('.w-nav-anchor').click(function(){
				if (listOpen) {
					navList.animate({height: 0}, 250, function(){
						navList.css({height: '', display: ''});
					});
					listOpen = false;
				}
			});


		});

		jQuery('.w-cart').each(function(){
			jQuery(this).css('top', a+'px');
			if ( ! body.hasClass('type_wide')) {
				jQuery(this).css({'left': b+'px', 'right':  b+'px'});
			} else {
				jQuery(this).css({'left': '', 'right':  ''});
			}
		});

		window.scrollHandlerPage = function(){
			//Check scroll position
			var scrollPosition	= parseInt(jQuery(window).scrollTop(), 10),
				offsetTolerance = a,
				topLinkStart;

			jQuery('.w-nav-item.active').removeClass('active');

			//Move trough each menu and check its position with scroll position then add current class
			jQuery('.w-nav-item a[href^=#]').each(function() {
				var thisHref = jQuery(this).attr('href');

				if (jQuery(thisHref).length) {
					var thisTruePosition = parseInt(jQuery(thisHref).offset().top, 10),
						thisPosition = thisTruePosition - offsetTolerance;

					if(scrollPosition >= thisPosition) {
						jQuery('.w-nav-item.active').removeClass('active');
						jQuery('.w-nav-item a[href='+ thisHref +']').parent().parent().addClass('active');

						jQuery('.w-cart').each(function(){
							if (jQuery(this).hasClass('status_empty')) {
								jQuery(this).css('display', '');
							}
						});
						jQuery(thisHref).find('.w-cart').css('display', 'block');
					}
				}
			});


			//If we're at the bottom of the page, move pointer to the last section
			var bottomPage	= parseInt(jQuery(document).height(), 10) - parseInt(jQuery(window).height(), 10);

			if(scrollPosition === bottomPage || scrollPosition >= bottomPage) {
				jQuery('.w-nav-item.active').removeClass('active');
				jQuery('.w-nav-item a[href^=#]:last').parent().parent().addClass('active');
			}

			if (body.hasClass('type_wide')) {
				topLinkStart = H - offsetTolerance;
			} else {
				topLinkStart = H - 2*offsetTolerance;
			}console.log(topLinkStart);

			if (scrollPosition >= topLinkStart) {
				jQuery('.w-toplink').animate({opacity: 1}, 150);
			} else {
				jQuery('.w-toplink').animate({opacity: 0}, 150);
			}
		};

		window.scrollHandlerPage();

		jQuery(window).scroll(function() {
			if (scrollHandlerPageTO !== false) {
				window.clearTimeout(scrollHandlerPageTO);
			}
			scrollHandlerPageTO = window.setTimeout(function(){
				window.scrollHandlerPage();
			}, 50);

		});

		jQuery('.l-main').css({'margin-top': a+'px'});

		if (body.hasClass('type_wide')) {
			jQuery('.l-main').css({'margin-bottom': '', 'margin-left': '', 'margin-right': ''});
			if (W > 960){
				jQuery('.w-columns-column').css({'min-height': H-a+'px'});
			} else {
				jQuery('.w-columns-column').css({'min-height': (H-a)/2+'px'});
			}
		} else {
			jQuery('.l-main').css({'margin-bottom': a+'px', 'margin-left': b+'px', 'margin-right': b+'px'});
			if (W > 960){
				jQuery('.w-columns-column').css({'min-height': H-2*a+'px'});
			} else {
				jQuery('.w-columns-column').css({'min-height': (H-2*a)/2+'px'});
			}
		}
		jQuery('.l-header').css({'height': a+'px'});
		jQuery('.l-header-h').css({'padding-top': (a - 50)/2+'px', 'padding-left': b+'px', 'padding-right': b+'px'});
		jQuery('.l-footer').css({'height': a+'px'});
		jQuery('.l-footer-h').css({'padding-top': (a - 50)/2+'px', 'padding-left': b+'px', 'padding-right': b+'px'});

		jQuery('.l-submain').each(function(){
			jQuery(this).imagesLoaded(function(){
				var content = jQuery(this).find('.l-content'),
					h = content.height(),
					submainH = jQuery(this).find('.l-submain-h'),
					contentBottomPadding;

				if (body.hasClass('no_pagesections')) {

					if (body.hasClass('type_wide')) {
						if (jQuery(this).hasClass('full_height')){
							if ( (H-h-a) >= 0) {
								jQuery(this).css('min-height', H-a+'px');
							} else {
								jQuery(this).css('min-height', '');
							}
						} else {
							submainH.css({'padding-top': c+'px', 'padding-bottom': c+'px'});

							if ( (H-h-a-2*c) >= 0) {
								jQuery(this).css('min-height', H-a+'px');
							} else {
								jQuery(this).css('min-height', '');
							}
						}
					} else {
						if (jQuery(this).hasClass('full_height')){
							if ( (H-h)/2-a >= 0) {
								jQuery(this).css('min-height', H-2*a+'px');
							} else {
								jQuery(this).css('min-height', '');
							}
						} else {
							submainH.css({'padding-top': c+'px', 'padding-bottom': c+'px'});

							if ( (H-h)/2-a-c >= 0) {
								jQuery(this).css('min-height', H-2*a+'px');
							} else {
								jQuery(this).css('min-height', '');
							}
						}
					}

					contentBottomPadding = submainH.css('padding-bottom');

					if (W > 600 && content.find('.for_btn.type_fixed').length) {
						submainH.css({'padding-bottom': '80px'});
					} else {
						submainH.css({'padding-bottom': contentBottomPadding});
					}

				} else  {
					if (body.hasClass('type_wide')) {
						if (jQuery(this).hasClass('full_height')){
							if ( (H-h-a) >= 0) {
								jQuery(this).css('min-height', H-a+'px');
							} else {
								jQuery(this).css('min-height', '');
							}
						} else {
							content.css({'padding-top': c+'px', 'padding-bottom': c+'px'});

							if ( (H-h-a-2*c) >= 0) {
								content.css('margin-top', (H-h-a)/2-c+'px');
								jQuery(this).css('min-height', H-a+'px');
							} else {
								content.css('margin-top', '');
								jQuery(this).css('min-height', '');
							}
						}
					} else {
						if (jQuery(this).hasClass('full_height')){
							if ( (H-h)/2-a >= 0) {
								jQuery(this).css('min-height', H-2*a+'px');
							} else {
								jQuery(this).css('min-height', '');
							}
						} else {
							content.css({'padding-top': c+'px', 'padding-bottom': c+'px'});

							if ( (H-h)/2-a-c >= 0) {
								content.css('margin-top', (H-h)/2-a-c+'px');
								jQuery(this).css('min-height', H-2*a+'px');
							} else {
								content.css('margin-top', '');
								jQuery(this).css('min-height', '');
							}
						}
					}

					contentBottomPadding = content.css('padding-bottom');

					if (W > 600 && content.find('.for_btn.type_fixed').length) {
						content.css({'padding-bottom': '80px'});
					} else {
						content.css({'padding-bottom': contentBottomPadding});
					}
				}



				jQuery(this).find('.w-portfolio').each(function() {
					var portfolioItemAnchors = jQuery(this).find('.w-portfolio-item-anchor');

					if (body.hasClass('type_wide')) {
						if (H < W) {
							portfolioItemAnchors.css({height: Math.round((H-a)/2)+'px'});
						} else {
							portfolioItemAnchors.css({height: Math.round((H-a)/3)+'px'});
						}
					} else {
						if (H < W) {
							portfolioItemAnchors.css({height: Math.round((H-2*a)/2)+'px'});
						} else {
							portfolioItemAnchors.css({height: Math.round((H-2*a)/3)+'px'});
						}
					}
				});



				jQuery(this).find('.w-sections').each(function() {
					var sectionsContainer = jQuery(this),
						tabsList = sectionsContainer.find('.w-sections-list'),
						tabs = tabsList.find('.w-sections-item'),
						sections = sectionsContainer.find('.w-sections-section'),
						scrollHandlerSectionTO = false;

					if (sectionsContainer.hasClass('nav_aside')) {
						var hhh = tabsList.height();
						tabsList.css('margin-top', -hhh/2);

						if (body.hasClass('type_wide')) {
							sections.css({'min-height': H-a});
						} else {
							sections.css({'min-height': H-2*a});
						}

					} else {
						tabsList.css({height: a});
						sections.css({'padding-top': a});

						if (body.hasClass('type_wide')) {
							sections.css({'min-height': H-a});
						} else {
							sections.css({'min-height': H-2*a});
						}
					}

					jQuery(sections).each(function() {
						var sectionH = jQuery(this).find('.w-sections-section-h'),
							hh = sectionH.height();

						if ( ! jQuery(this).hasClass('full_height')) {
							sectionH.css({'padding-top': c, 'padding-bottom': c});

							if (sectionsContainer.hasClass('nav_aside')) {
								if (body.hasClass('type_wide')) {
									if ((H - a - hh - 2*c) > 0) {
										sectionH.css({'margin-top': Math.round((H - a - hh - 2*c)/2)+'px'});
									} else {
										sectionH.css({'margin-top': ''});
									}
								} else {
									if ((H - 2*a - hh - 2*c) > 0) {
										sectionH.css({'margin-top': Math.round((H - 2*a - hh - 2*c)/2)+'px'});
									} else {
										sectionH.css({'margin-top': ''});
									}
								}
							} else {
								if (body.hasClass('type_wide')) {
									if ((H - 2*a - hh - 2*c) > 0) {
										sectionH.css({'margin-top': Math.round((H - 2*a - hh - 2*c)/2)+'px'});
									} else {
										sectionH.css({'margin-top': ''});
									}
								} else {
									if ((H - 3*a - hh - 2*c) > 0) {
										sectionH.css({'margin-top': Math.round((H - 3*a - hh - 2*c)/2)+'px'});
									} else {
										sectionH.css({'margin-top': ''});
									}
								}
							}
						}

					});

					jQuery(tabs).each(function(sectionIndex, tab) {
						jQuery(tab).off('click').click(function() {
							jQuery.smoothScroll({
								offset: -a,
								scrollTarget: sections[sectionIndex]
							});
						});
					});

					var sectionScrollTimeout = 10;
					if (sectionsContainer.hasClass('nav_aside')) {
						sectionScrollTimeout = 50;
					}

					var scrollHandlerSection = function() {
						var scrollPosition	= parseInt(jQuery(window).scrollTop(), 10),
							offsetTolerance = a,
							tabsListSticky = false,
							currentSection = 0;

						jQuery(tabs).each(function(sectionIndex) {

							var thisTruePosition = parseInt(jQuery(sections[sectionIndex]).offset().top, 10),
								thisPosition = thisTruePosition - offsetTolerance;

							if(scrollPosition >= thisPosition) {
								tabsListSticky = true;
								currentSection = sectionIndex;
							}

							if(sectionIndex === sections.length-1  && scrollPosition > thisPosition + jQuery(sections[sectionIndex]).height()/2) {
								tabsListSticky = false;
							}
						});

						tabs.removeClass('active');
						jQuery(tabs[currentSection]).addClass('active');

						if (tabsListSticky) {
							tabsList.css({position: 'fixed'});
							if (sectionsContainer.hasClass('nav_aside')) {
								if ( ! body.hasClass('type_wide')) {
									if (b > 50) {
										tabsList.css({left: '', right: ((b - 50)/2)+'px'});
									} else {
										tabsList.css({left: '', right: ''});
									}
								}
							} else {
								tabsList.css({top: a});
								if ( ! body.hasClass('type_wide')) {
									tabsList.css({left: b, right: b});
								}
							}

						} else {
							tabsList.css({position: '', top: '', left: '', right: ''});
						}
					};

					if (sections.length > 1) {
						scrollHandlerSection();

						//Detecting user's scroll
						jQuery(window).scroll(function() {
							if (scrollHandlerSectionTO !== false){
								window.clearTimeout(scrollHandlerSectionTO);
							}
							scrollHandlerSectionTO = window.setTimeout(function(){
								scrollHandlerSection();
							}, sectionScrollTimeout);

						});
					}


				});
			});
		});
	};

	window.resizeSubmain();

	window.clearTimeout(submainResizeTimer);
	submainResizeTimer = window.setTimeout(function(){
		window.resizeSubmain();
	}, 1000);

	jQuery('.l-main').imagesLoaded(function(){
		jQuery('.l-preloader').addClass('animate');
		window.setTimeout(function(){
			jQuery('.l-preloader').hide();
		}, 500);
	});

	jQuery(window).resize(function(){
		window.clearTimeout(submainResizeTimer);
		submainResizeTimer = window.setTimeout(function(){
			window.resizeSubmain();
		}, 50);

	});


});
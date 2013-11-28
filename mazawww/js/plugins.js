jQuery(document).ready(function(){

	"use strict";

	if (jQuery.magnificPopup)
	{
		jQuery('.w-gallery-tnails-h').magnificPopup({
			type: 'image',
			delegate: 'a',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]
			},
			removalDelay: 300,
			mainClass: 'mfp-fade'

		});
		jQuery('.w-catalog-item-image').magnificPopup({
			type: 'image',
			delegate: 'a',
			removalDelay: 300,
			mainClass: 'mfp-fade'

		});
	}

	// Carousel
	if (jQuery().carousello){
		jQuery(".w-team.type_carousel").carousello({use3d: false});
	}

	if (jQuery().isotope){


		var testimonialsContainer = jQuery('.w-testimonials.type_masonry .w-testimonials-h');

		if (testimonialsContainer.length) {
			testimonialsContainer.imagesLoaded(function(){
				testimonialsContainer.isotope({
					itemSelector : '.w-testimonials-item',
					layoutMode : 'masonry'
				});
			});

			var testimonialsResizeTimer;

			jQuery(window).resize(function(){
				window.clearTimeout(testimonialsResizeTimer);
				testimonialsResizeTimer = window.setTimeout(function(){
					testimonialsContainer.isotope('reLayout');

				}, 50);

			});
		}

		var galleryContainer = jQuery('.w-gallery.type_masonry .w-gallery-tnails-h');

		if (galleryContainer.length) {
			galleryContainer.imagesLoaded(function(){
				galleryContainer.isotope({
					layoutMode : 'masonry'
				});
			});

			var galleryResizeTimer;

			jQuery(window).resize(function(){
				window.clearTimeout(galleryResizeTimer);
				galleryResizeTimer = window.setTimeout(function(){
					galleryContainer.isotope('reLayout');

				}, 50);

			});
		}

	}

	// Video iframes z-index fix
	jQuery('iframe').each(function(){
		var url = jQuery(this).attr("src");
		var char = "?";
		if(jQuery.inArray("?", url) !== -1){
			char = "&";
		}

		jQuery(this).attr("src",url+char+"wmode=transparent");
	});

	if (jQuery.flexslider) {
		jQuery('.l-submain').each(function(){
			var subsection = jQuery(this);

			subsection.find('.w-slider').each(function(){
				var the_slider = jQuery(this).find('.w-slider-list'),
					the_slides = the_slider.find('.w-slider-item').css('display', 'none'),
					backgrounds = jQuery('<div></div>', {class: 'w-slider-bg'});

				jQuery(subsection).prepend(backgrounds);

				the_slider.find('.w-slider-list-h').addClass('slides');

				the_slides.each(function(slideIndex, slide) {
					if (jQuery(slide).data('background') !== undefined && jQuery(slide).data('background') !== '') {
						var background_image = jQuery('<div>', {class: 'w-slider-bg-item slide-background-'+slideIndex}).css({'opacity': 0, position: 'absolute', top: 0, left: 0, 'z-index': -1, width: '100%', height: '100%', 'background-image': 'url('+jQuery(slide).data('background')+')'});
						backgrounds.append(background_image);
					}

				});

				the_slider.flexslider({
					selector: '.slides > .w-slider-item',
					controlNav: false,
					directionNav: false,
					useCSS: false,
					pauseOnHover: true,
					animation: 'slide',
					touch: true,
					animationSpeed: 400,
					startAt: 1,
					start: function(slider) {
						slider.removeClass('flex-loading');
						slider.flexAnimate(0, true);

					},
					before: function(slider) {
						backgrounds.find('.w-slider-bg-item').animate({opacity: 0}, 300);
						if ( jQuery(the_slides[slider.animatingTo]).data('background') !== undefined && jQuery(the_slides[slider.animatingTo]).data('background') !== '') {
							backgrounds.find('.slide-background-'+slider.animatingTo).animate({opacity: 1}, 600);
						}
					}
				});

				jQuery(this).find('.w-slider-arrow.to_prev').click(function() {
					the_slider.flexslider('prev');
					return false;
				});

				jQuery(this).find('.w-slider-arrow.to_next').click(function() {
					the_slider.flexslider('next');
					return false;
				});
			});
		});

	}

	jQuery('.contacts_form').each(function(){
		var showBtn = jQuery(this).find('.w-form-open .g-btn'),
			hideBtn = jQuery(this).find('.w-form-close'),
			formContainer = jQuery(this).find('.contacts_form_form');

		showBtn.click(function() {
			formContainer.slideDown(250, function(){
				showBtn.hide();
			});

			jQuery.smoothScroll({
				offset: -window.a,
				scrollTarget: formContainer
			});
		});
		hideBtn.click(function() {
			formContainer.slideUp(250, function(){
				showBtn.show();
			});
		});

		jQuery(this).find('.g-form').submit(function(){
			var form = jQuery(this),
				name, email, phone,
				nameField = form.find('input[name=name]'),
				emailField = form.find('input[name=email]'),
				phoneField = form.find('input[name=phone]'),
				message = form.find('textarea[name=message]').val(),
				errors = 0;

			if (nameField.length) {
				name = nameField.val();
			}

			if (emailField.length) {
				email = emailField.val();
			}

			if (phoneField.length) {
				phone = phoneField.val();
			}

			if (errors === 0){
				jQuery.ajax({
					type: 'POST',
					url: 'info',
					dataType: 'json',
					data: {
						action: 'sendContact',
						name: name,
						email: email,
						phone: phone,
						message: message
					},
					success: function(data){
						if (data.success){
							jQuery.jGrowl("Message Sent!");
							formContainer.slideUp(250, function(){
								showBtn.show();
							});
							if (nameField.length) {
								nameField.val('');
							}
							if (emailField.length) {
								emailField.val('');
							}
							if (phoneField.length) {
								phoneField.val('');
							}
							form.find('textarea[name=message]').val('');

						} else {
							if (data.errors.name !== '' && data.errors.name !== undefined) {
								jQuery.jGrowl(data.errors.name);
							}
							if (data.errors.email !== '' && data.errors.email !== undefined) {
								jQuery.jGrowl(data.errors.email);
							}
							if (data.errors.phone !== '' && data.errors.phone !== undefined) {
								jQuery.jGrowl(data.errors.phone);
							}
							if (data.errors.message !== '' && data.errors.message !== undefined) {
								jQuery.jGrowl(data.errors.message);
							}

							if (data.errors.sending !== '' && data.errors.sending !== undefined) {
								jQuery.jGrowl(data.errors.sending);
							}
						}
					},
					error: function(){
					}
				});
			}

			return false;
		});

	});


	if (jQuery.countdown) {
		var cd_date = new Date('2013-12-31');
		jQuery(".w-offer-ending-timer").countdown({
			until: cd_date,
			layout:'{d<}<div class="w-offer-ending-timer-section for_days"><span class="w-offer-ending-timer-section-value">{dn}</span><span class="w-offer-ending-timer-section-text">{dl}</span></div>{d>}<div class="w-offer-ending-timer-section for_hours"><span class="w-offer-ending-timer-section-value">{hnn}</span><span class="w-offer-ending-timer-section-text">{hl}</span></div><div class="w-offer-ending-timer-section for_minutes"><span class="w-offer-ending-timer-section-value">{mnn}</span><span class="w-offer-ending-timer-section-text">{ml}</span></div><div class="w-offer-ending-timer-section for_seconds"><span class="w-offer-ending-timer-section-value">{snn}</span><span class="w-offer-ending-timer-section-text">{sl}</span></div>'
		});
	}


});

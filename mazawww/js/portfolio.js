(function ($) {
	"use strict";

	$.fn.wPortfolio = function () {

		return this.each(function () {
			var portfolio = $(this),
				items = portfolio.find('.w-portfolio-item'),
				running = false,
				activeIndex;

			items.each(function(itemIndex, item){
				var anchor = $(item).find('.w-portfolio-item-anchor'),
					details = $(item).find('.w-portfolio-item-details'),
					detailsClose = details.find('.w-portfolio-item-details-close'),
					detailsNext = details.find('.w-portfolio-item-details-arrow.to_next'),
					detailsPrev = details.find('.w-portfolio-item-details-arrow.to_prev'),
					nextItem = $(item).next(),
					prevItem = $(item).prev();

				anchor.click(function(){
					if ( ! $(item).hasClass('active') && ! running){
						running = true;

						var activeItem = portfolio.find('.w-portfolio-item.active');

						if (activeItem.length && parseInt($(item).offset().top, 10) === parseInt(activeItem.offset().top, 10)) {
							activeItem.find('.w-portfolio-item-details').fadeOut();
							activeItem.removeClass('active').css('margin-bottom', '');
							details.fadeIn();
							$(item).css('margin-bottom', details.height()+'px');
						} else {
							if (activeItem.length){
								activeItem.find('.w-portfolio-item-details').slideUp();
								activeItem.removeClass('active').css('margin-bottom', '');

							}

							details.slideDown(null, function() {
								$(item).css('margin-bottom', details.height()+'px');
							});

						}
						jQuery.smoothScroll({
							offset: -window.a + 0.8*anchor.height(),
							scrollTarget: item
						});
						$(item).addClass('active');
						activeIndex = itemIndex;
						running = false;

					}
				});

				detailsClose.off('click').click(function(){
					details.slideUp();
					$(item).removeClass('active').css('margin-bottom', '');
				});

				if (nextItem.length) {
					detailsNext.off('click').click(function(){
						nextItem.find('.w-portfolio-item-anchor').click();
					});
				} else {
					detailsNext.hide();
				}

				if (prevItem.length) {
					detailsPrev.off('click').click(function(){
						prevItem.find('.w-portfolio-item-anchor').click();
					});
				} else {
					detailsPrev.hide();
				}

			});
		});
	};
})(jQuery);

jQuery(document).ready(function() {
	"use strict";

	jQuery('.w-portfolio').wPortfolio();
});
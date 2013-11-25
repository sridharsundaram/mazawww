(function ($) {
	"use strict";

	$.fn.wStore = function () {
		return this.each(function () {
			var catalog = $(this),
				cart = catalog.siblings('.w-cart'),
				cartForm = cart.find('.g-form'),
				products = catalog.find('.w-catalog-item'),
				productsCount = {},
				totalCount = 0,
				totalPrice = 0,
				totalCountElm = cart.find('.w-cart-meta-goods-qty'),
				totalPriceElm = cart.find('.w-cart-meta-goods-total'),
				showNumbers = function (){
					if (totalCount === 0){
						cart.addClass('status_empty');
						cartForm.slideUp();
						window.scrollHandlerPage();
					} else {
						var itemsLabel = 'item';
						if (totalCount > 1) {
							itemsLabel = 'items';
						}
						cart.removeClass('status_empty');
						totalCountElm.html(totalCount+' '+itemsLabel);
						totalPriceElm.html('$'+totalPrice.toFixed(2));
						cart.css('display', 'block');
					}
				};

			cartForm.css({display: 'none'});

			products.each(function(){
				var add_btn = $(this).find('.g-btn'),
					meta = $(this).find('.w-catalog-item-meta'),
					meta_qty = meta.find('.w-catalog-item-meta-qty-value'),
					meta_increase = meta.find('.w-catalog-item-meta-qty-btn.plus'),
					meta_decrease = meta.find('.w-catalog-item-meta-qty-btn.minus'),
					product_id = parseInt($(this).data('id'), 10),
					product_price = parseFloat($(this).data('price'));

				productsCount[product_id] = 0;

				add_btn.click(function(){
					meta.show();
					productsCount[product_id]++;
					totalCount++;
					totalPrice += product_price;
					meta_qty.html(productsCount[product_id]);
					showNumbers();
				});

				meta_increase.click(function(){
					add_btn.click();
				});

				meta_decrease.click(function(){
					productsCount[product_id]--;
					totalCount--;
					totalPrice -= product_price;
					meta_qty.html(productsCount[product_id]);
					if (productsCount[product_id] === 0) {
						meta.hide();
					}
					showNumbers();
				});

			});

			cart.find('.w-cart-meta').click(function(){
				if ( ! cart.hasClass('status_empty')) {
					cartForm.slideToggle();
				}
			});

			cartForm.submit(function(){
				var name = cartForm.find('input[name=name]').val(),
					email = cartForm.find('input[name=email]').val(),
					phone = cartForm.find('input[name=phone]').val();


				$.ajax({
					type: 'POST',
					url: 'send_order.php',
					dataType: 'json',
					data: {
						action: 'storeCheckOut',
						products: productsCount,
						name: name,
						email: email,
						phone: phone
					},
					success: function(data){
						if (data.success){
							jQuery.jGrowl("Order sent!");
							products.each(function(){
								var product_id = parseInt($(this).data('id'), 10),
									meta = $(this).find('.w-catalog-item-meta'),
									meta_qty = meta.find('.w-catalog-item-meta-qty-value');

								meta.hide();
								productsCount[product_id] = 0;
								meta_qty.html('0');

								totalCount = 0;
								totalPrice = 0;
								showNumbers();
							});
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

							if (data.errors.sending !== '' && data.errors.sending !== undefined) {
								jQuery.jGrowl(data.errors.sending);
							}
						}
					},
					error: function(){
					}
				});

				return false;
			});


		});
	};
})(jQuery);

jQuery(document).ready(function() {
	"use strict";

	jQuery('.w-catalog').wStore();
});
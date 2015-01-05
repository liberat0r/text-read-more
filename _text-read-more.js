/**
 * Text read more or less
 *
 * Animates read more/read less text boxes depending on their height
 * override the default limit height with the attribute data-limit-height
 * the text buttons need to be .js-button-read
 * the text blocks need to be .js-text-read
 * to hide the text initially, also apply the class .js-text-lessed
 * the text button and the corresponding text need to be siblings for
 * parent().find to work
 * set the maxParentsTraverse integer to the number of parents you want
 * to traverse in order to find a text or a button to be lessed
 */


if (typeof globals === 'undefined') {
	var globals = {};
}

(function() {
	"use strict";

	function TextReadMore() {

		var self = this;

		self.defaultLimitHeight = 217;
		self.maxParentsTraverse = 2;

		self.$textBlocksDelimited = $(".js-text-read");
		self.$textButtons = $(".js-button-read");

		// find the initial heights of texts and save them
		self.recalculate = function() {

			self.$textBlocksDelimited.each(function() {

				self.$closestButton = $(this).parent().find(".js-button-read");

				// depth search
				var counter = 0;
				while (self.$closestButton.length === 0 && counter < self.maxParentsTraverse) {
					self.$closestButton = $(this).parents().eq(counter).find(".js-button-read");
					counter++;
				}

				if (typeof $(this).data('limit-height') == 'undefined') {
					$(this).attr('data-limit-height', self.defaultLimitHeight);
				}

				$(this).css({height: 'auto'});

				if ($(this).height() <= $(this).data('limit-height')) {
					$(this).removeClass('js-text-lessed');
					self.$closestButton.hide();
					self.$closestButton.removeClass('js-text-lessed');
				} else {
					$(this).attr('data-initial-height', $(this).height());

					// should the text be lessed at start
					if ($(this).hasClass('js-text-lessed') || self.$closestButton.hasClass('js-text-lessed')) {
						$(this).addClass('js-text-lessed');
						self.$closestButton.show();
						self.$closestButton.addClass('js-text-lessed');
						$(this).css({height: $(this).data('limit-height')});
					}
				}
			});
		};

		self.start = function() {

			if (typeof globals.$window === 'undefined') {
				globals.$window = $(window);
			}

			self.recalculate();

			self.$textButtons.click(function() {

				self.$closestText = $(this).parent().find(".js-text-read");

				// depth search
				var counter = 0;
				while (self.$closestText.length === 0 && counter < self.maxParentsTraverse) {
					self.$closestText = $(this).parents().eq(counter).find(".js-text-read");
					counter++;
				}

				if ($(this).hasClass('js-text-lessed')) {

					// is already lessed
					self.$closestText.animate({height: self.$closestText.attr('data-initial-height')});
					$(this).removeClass('js-text-lessed');
					self.$closestText.removeClass('js-text-lessed');

				} else {

					// less it
					self.$closestText.animate({height: self.$closestText.attr('data-limit-height')});
					$(this).addClass('js-text-lessed');
					self.$closestText.addClass('js-text-lessed');
				}

			});

			globals.$window.resize(function() {
				self.recalculate();
			});
		};
	}

	var _TextReadMore = new TextReadMore();

	$(function() {
		_TextReadMore.start();
	});

})();
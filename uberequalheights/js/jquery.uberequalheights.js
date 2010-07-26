$.fn.uberEqualHeights = function(options){

	options = $.extend({
		classname: '.example',
		callbacks: {}
	}, options);

	return this.each(function(){

		var currentTallest = 0;

		$( this ).find( options.classname ).each(function(){

			var self = $( this );

			self.css({
				minHeight: 0,
				height: 'auto'
			});

			if ( self.outerHeight() > currentTallest ) {

				currentTallest = self.outerHeight();
			}
		});

		$( this ).find( options.classname ).each(function(){

			var self = $( this );

			if ( options.callbacks[ this.id ]) {

				options.callbacks[ this.id ].call( this, currentTallest );

			} else {

				// for ie6, set the height since min-height isn't supported
				// TODO: check min height support instead of browser detection
				if ($.browser.msie && $.browser.version == 6.0) {

					self.css({
						height: currentTallest
					});
				}

				self.css({
					minHeight: currentTallest
				});
			}
		});
	});
};

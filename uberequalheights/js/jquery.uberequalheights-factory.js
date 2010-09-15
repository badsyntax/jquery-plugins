(function( $, undefined ){

	// uber equal eights plugon will adjust  set of elements to the maximum height of 

	$.plugin('equalHeights', { 

		options: {
			selector: '.example-column',
			height: 'outerHeight',		// height; innerHeight or outerHeight
			callbacks: {}
		},

		_init: function(){

			this.options.reset = {
				minHeight: 0,
				height: 'auto'
			};

			this.elements = this.element.find( this.options.selector );

			this.adjust();
		},
	
		adjust: function(){

			var tallest = 0, options = this.options;

			this.elements.each(function(){

				var element = $( this );

				element.css( options.reset );

				if ( element[ options.height ]() > tallest ) {

					tallest = element[ options.height ]();
				}
			});

			this.elements.each(function(){


				var element = $( this );

				if ( options.callbacks[ this.id ]) {

					options.callbacks[ this.id ].call( this, tallest );

				} else {

					element.css({
						minHeight: tallest,
						height: element[0].style.minHeight !== undefined ? 'auto' : tallest
					});
				}
			});
		},

		destroy: function(){
		
			var self = this;

			this.elements.each(function(){

				$( this ).css( self.options.reset );
			});

			this._destroy();
		}
		
	});

})( window.jQuery );

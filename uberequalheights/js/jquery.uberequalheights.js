(function( $, undefined ){

	// uber equal eights plugon will adjust  set of elements to the maximum height of 

	$.fn.equalHeights = function(method){

		var arg = arguments, pluginName = 'equalHeights';

		return this.each(function(){

			var plugin = $.data( this, pluginName );

			if ( plugin && plugin[method] ) {

				plugin[method].apply( plugin, Array.prototype.slice.call( arg, 1 ) );

			} else if ( !plugin && typeof method === 'object' || ! method ) {

				$.data( this, pluginName, new equalHeights( this, method, pluginName ) );
			}
		});
	};

	function equalHeights(element, options, pluginName){

		this._pluginName = pluginName;

		this.options = $.extend({
			selector: '.example-column',
			height: 'outerHeight',		// height; innerHeight or outerHeight
			callbacks: {}
		}, options);

		this.options.reset = {
			minHeight: 0,
			height: 'auto'
		};

		this.element = $( element );
	
		this.elements = this.element.find( this.options.selector );

		this.adjust();
	};

	equalHeights.prototype = {
	
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

			$.removeData( this.element[0], this._pluginName );
		}
		
	};

})( window.jQuery );

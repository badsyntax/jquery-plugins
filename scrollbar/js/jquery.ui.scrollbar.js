/*
 * jQuery UI Splitbutton
 *
 * @Author Richard Willis
 *
 * @Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.button.js
 *
 */

(function($) {

	$.widget('ui.scrollbar', {
		
		options: {
			width: 'auto'
		},
		
		_create : function(){

			this.element.addClass( 'ui-scrollbar-container' );

			this._build();

			this._bind();
		},

		_build : function(){

			this.elements = {
				base: $('<div />')
					.addClass( 'ui-scrollbar-base ui-widget-content ui-corner-all' )
					.height( this.element.height() - 4 )
					.appendTo( this.element )
				,
				arrowUp: $('<div />')
					.addClass( 'ui-scrollbar-arrow-up ui-icon ui-icon-triangle-1-n' )
					.appendTo( this.element ),
				arrowDown: $('<div />')
					.addClass( 'ui-scrollbar-arrow-down ui-icon ui-icon-triangle-1-s' )
					.appendTo( this.element )
			};
		},

		_bind : function(){

			function hover( event ){

				$( this ).toggleClass( 'ui-scrollbar-state-hover' );
			}

			this.elements.arrowUp.bind('mouseenter mouseleave', hover );
			
			this.elements.arrowDown.bind('mouseenter mouseleave', hover );
		},

		destroy : function(){

			this.element.removeClass( 'ui-scrollbar-container' );

			$.each( this.elements, function(){
			
				$( this ).remove();
			});

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});


})(jQuery);

/*
 * jQuery UI Ellipsis
 *
 * @Author Richard Willis
 *
 * @Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 */

(function($) {

	$.widget('ui.ellipsis', {
		
		options: {
			chars: '...'
		},
		
		_create : function(){
				
			this.element
				.data('contents', this.element.contents() )
				.addClass( 'ui-ellipsis' )
				.parent()
					.addClass('ui-ellipsis-container');

			var 
				words = this.element.text().split(' '), 
				tries = 0,
				widthHelper = $('<span />')
					.addClass( 'ui-ellipsis-helper' )
					.append( this.element.contents() )
					.appendTo( this.element );
			
			do {

				tries ++;

				words.pop();

				widthHelper.html( words.join(' ') + this.options.chars );

			} while ( ( widthHelper.width() > this.element.width() ) && ( tries < 60 ) );
		},

		destroy : function(){

			this.element
				.removeClass( 'ui-ellipsis' )
				.html( this.element.data('contents') )
				.parent()
					.removeClass( 'ui-ellipsis-container' );

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});

})(jQuery);

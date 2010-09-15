/*
 * jQuery UI Ellipsis
 *
 * @Author Richard Willis
 * @Url http://github.com/badsyntax/jquery-plugins/tree/master/ellipsis/
 * @Depends
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
				.addClass( this.widgetBaseClass );

			var 
				words = this.element.text().split(' '), 
				tries = 0,
				helper = $( '<span />' )
					.addClass( this.widgetBaseClass + '-helper' )
					.append( this.element.contents() )
					.appendTo( this.element );
			do {

				tries ++;

				words.pop();

				helper.html( words.join(' ') + this.options.chars );

			} while ( ( helper.width() > this.element.width() ) && ( tries < 60 ) );

			helper.parent().text( helper.text() ).end().remove();
		},

		destroy : function(){
			
			$.Widget.prototype.destroy.apply(this, arguments);

			this.element
				.removeClass( this.widgetBaseClass )
				.html( this.element.data( 'contents' ) )
				.parent()
					.removeClass( this.widgetBaseClass + '-container' );
		}
	});

})(jQuery);

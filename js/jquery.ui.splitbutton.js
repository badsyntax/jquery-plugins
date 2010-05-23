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

(function( $ ) {

$.widget('ui.splitbutton', {
	
	options: {
		width: 'auto'
	},
	
	_create : function(){

		var self = this;

		this.elements = {
			button: this.element.find( 'button:eq(0)' ).button(),
			hitarea: this.element.find( 'button:eq(1)' ).button({
				text: false,
				icons: {
					primary: 'ui-icon-triangle-1-s'
				}
			}),
			menulist: $('<ul />').appendTo('body')
		};

		this.elements.menulist.addClass('ui-splitbutton-menu ui-widget ui-widget-content ui-corner-all ui-helper-reset');

		this.element.buttonset();

		this.elements.menulist.width( 
			this.options.width == 'inherit' ? 
			this.elements.button.width() + this.elements.hitarea.width()  : 
			this.options.width 
		);

		this._buildList();
		
		this.elements.hitarea.click( function(){

			$(this).css({ outline: 'none' }).focus();

			self._positionBox();

			self.elements.menulist.show();

		}).bind( 'blur', function(){
			
			self.elements.menulist.hide();
		});
	},

	_positionBox: function(){
		
		var offset = this.elements.hitarea.offset();

		this.elements.menulist.css({
			left: ( offset.left - this.elements.menulist.innerWidth() ) + this.elements.hitarea.width(),
			top: offset.top + this.elements.hitarea.outerHeight(),
		});
	},

	_buildList : function(){

		var self = this

		$.each(this.options.items, function(label){

			var callback = this;

			var anchor = $( '<a />' , {
				href: '#',
				mousedown: function(){

					callback.apply( this, arguments );

					self.elements.hitarea.blur();
				}
			}).hover(
				function(){
					$(this).addClass('ui-state-hover');
				},
				function(){
					$(this).removeClass('ui-state-hover');
				}
			).addClass('ui-corner-all').html( label );

			$( '<li />' )
				.append( anchor )
				.addClass( 'ui-helper-reset' )
				.appendTo( self.elements.menulist );

		});
	},

	destroy : function(){

		this.elements.menulist.remove();

		this.element.buttonset('destroy');

		$.Widget.prototype.destroy.apply(this, arguments);
	}
});


})(jQuery);

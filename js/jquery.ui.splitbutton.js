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
			
			this.element.buttonset();
			
			this.elements.hitarea
				.attr('role', 'hitarea')
				.addClass('ui-splitbutton-hitarea');

			this.elements.menulist
				.addClass('ui-splitbutton-menu ui-widget ui-widget-content ui-corner-all ui-helper-reset')
				.attr('role', 'listbox')
				.width( 
					this.options.width == 'inherit' ? 
					this.elements.button.width() + this.elements.hitarea.width()  : 
					this.options.width 
				);

			this._build();

			this._bind();
		},

		_build : function(){

			var self = this

			$.each(this.options.items, function(label){

				var callback = this;

				var anchor = $( '<a />' , {
					href: '#',
					mousedown: function(event){

						callback.apply( this, arguments );

						self.elements.hitarea.blur();

						self._trigger('select', event);
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
					.attr('role', 'menuitem')
					.append( anchor )
					.addClass( 'ui-helper-reset' )
					.appendTo( self.elements.menulist );

			});
		},
		
		_bind : function(){

			var self = this;
			
			this.elements.hitarea
			.bind( 'click', function(){
			
				$(this).focus();
				
				self.open()
			})
			.bind( 'blur', function(){

				self.close();
			});

			this.elements.menulist
			.bind('show', function(){

				var offset = self.elements.hitarea.offset();

				self.elements.menulist.css({
					left: ( offset.left - self.elements.menulist.innerWidth() ) + self.elements.hitarea.width(),
					top: offset.top + self.elements.hitarea.outerHeight(),
				});
			})
			.bind('hide', function(){

				$(this).css({ left: -9999 });
			});
		},
		
		open : function(){
			
			this.elements.menulist.trigger('show');

			this._trigger('open');
		},

		close : function(){
			
			this.elements.menulist.trigger('hide');

			this._trigger('close');
		},

		destroy : function(){

			this.elements.menulist.remove();

			this.element.buttonset('destroy');

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});


})(jQuery);

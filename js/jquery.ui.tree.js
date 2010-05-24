/*
 * jQuery UI Tree
 *
 * @Author Richard Willis
 *
 * @Depends:
 *
 */

(function($) {

	$.widget('ui.tree', {

		options : {
			width: 320,
			theme: 'default'
		},
		
		_create : function(){

			var self = this, options = this.options;
			
			this.theme = this.themes[ this.options.theme ];

			this.element
				.width( this.options.width )
				.addClass( this.theme.list )
				.find( 'li' )
					.addClass( 'ui-helper-clearfix' )
					.end()
				.find( 'a' ).each(function(){

					var icon, childlist = $(this).next();

					if ( childlist.length && childlist[0].nodeName == 'UL' ){

						icon = childlist.is(':visible') ? 
							self.theme.icons.listopen : 
							self.theme.icons.listclosed;
					} else {
						icon = 'ui-tree-icon-transparent';
					}

					$('<span />')
						.data('childlist', childlist)
						.addClass( 'ui-tree-hitarea ui-icon ' + icon )
						.prependTo( this )
						.bind('toggle', function(){
							self._toggle.call( self, $(this) );
						});

					$(this)
					.click(function(event){

						if ( /ui-tree-hitarea/.test( event.target.className ) ) {

							$( event.target ).trigger( 'toggle' );

							return false;
						}

						$(this).toggleClass( self.theme.itemactive );
						
						self._trigger( 'click', event, this );

						return false;
					})
					.hover(
						function(){
							$( this ).addClass( 'ui-state-hover ui-corner-all' );
						},
						function(){
							$( this ).removeClass( 'ui-state-hover' );
						}
					);
				});
		},

		_toggle : function( hitarea ){

			var self = this, childlist = hitarea.data('childlist');

			hitarea
				.removeClass( self.theme.icons.listopen + ' ' + self.theme.icons.listclosed )
				.parent()
					.next()
					.toggle();


			if ( childlist.length ){

				if ( childlist.is(':visible') ){
					
					$( hitarea ).addClass( self.theme.icons.listopen );

					self._trigger('open', null, { list: childlist });

				} else {
					
					$( hitarea ).addClass( self.theme.icons.listclosed );

					self._trigger('close', null, { list: childlist });
				}
			}
		},

		destroy : function(){

			this.element
				.removeClass( this.theme.list )
				.find( 'li' )
				.removeClass( 'ui-helper-clearfix' )
				.find( 'a' )
				.unbind()
				.find('.ui-icon').remove();

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});

	$.extend($.ui.tree.prototype, { 

		themes: {
			default: { 
				list: 'ui-helper-reset ui-tree ui-widget ui-widget-content ui-corner ui-corner-all',
				itemactive: 'ui-tree-item-active',
				icons: {
					'listopen': 'ui-icon-triangle-1-s',
					'listclosed': 'ui-icon-triangle-1-e'
				}
			},
			minimal: {
				list: 'ui-helper-reset ui-tree ui-widget ui-widget-content ui-corner ui-corner-all',
				itemactive: 'ui-tree-item-active',
				icons: {
					'listopen': 'ui-icon-minus',
					'listclosed': 'ui-icon-plus'
				}
			}
		}
	});

})(jQuery);

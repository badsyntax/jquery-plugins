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
			theme: 'default',
			childlistURL: ''
		},
		
		_create : function(){

			var self = this, options = this.options;
			
			this.theme = this.themes[ options.theme ];

			this.element
				.width( options.width )
				.addClass( this.theme.list )
				.find( 'li' )
					.addClass( 'ui-helper-clearfix' )
					.end()
				.find( 'a' ).each(function(){

					var icon, childlist = $(this).next();

					if ( childlist.length && childlist[0].nodeName == 'UL' ){

						icon = ( childlist.is(':visible') && childlist.children().length ) ? 
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

			var self = this, theme = this.theme, childlist = hitarea.data('childlist');

			function toggle(){

				hitarea
					.removeClass( theme.icons.listopen + ' ' + theme.icons.listclosed )
					.parent()
						.next()
						.toggle();


				if ( childlist.length ){

					if ( childlist.is(':visible') ){
						
						hitarea.addClass( theme.icons.listopen );

						self._trigger('open', null, { list: childlist });

					} else {
						
						hitarea.addClass( theme.icons.listclosed );

						self._trigger('close', null, { list: childlist });
					}
				}
			}

			if ( !childlist.children().length && this.options.childlistURL ) {

				function complete( response, status, xhr ){

					if ( status == 'error' ) {

						alert('Error loading the request.');
					}

					toggle();
				}

				childlist.load( this.options.childlistURL, { page: hitarea.parent().attr('rel') || 0 } , complete );

			} else toggle();

		},

		selected : function(){

			return this.element.find( '.' + this.theme.itemactive );
		},

		destroy : function(){

			this.element
				.removeClass( this.theme.list )
				.find( 'li' )
					.removeClass( 'ui-helper-clearfix' )
				.find( 'a' )
					.removeClass( this.theme.itemactive + ' ui-corner-all' )
					.unbind()
				.find('.ui-icon')
					.remove();

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

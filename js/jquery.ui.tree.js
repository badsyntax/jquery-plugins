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
				.addClass( this.theme.list );

			this._bind( this.element );
		},

		_bind : function( element ){

			var self = this, theme = this.theme;
			
			element
				.find( 'li' )
					.addClass( 'ui-helper-clearfix' )
					.end()
				.find( 'a' ).each(function(){

					self._buildHitarea( this );

					$(this)
					.click(function( event ){

						if ( new RegExp( theme.hitarea ).test( event.target.className ) ) {

							$( event.target ).trigger( 'toggle' );

							return false;
						}

						$( this ).toggleClass( self.theme.itemactive );
						
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

		_buildHitarea : function( anchor ){

			var self = this, theme = this.theme, icon, childlist = $( anchor ).next();

			if ( childlist.length && childlist[0].nodeName == 'UL' ){

				icon = ( childlist.is(':visible') && childlist.children().length ) ? 
					theme.icons.listopen : 
					theme.icons.listclosed;

			} else {
				icon = 'ui-tree-icon-transparent';
			}

			$('<span />')
				.addClass( theme.hitarea + ' ui-icon ' + icon )
				.data('childlist', childlist)
				.prependTo( anchor )
				.bind('toggle', function( event ){

					self._toggle( $(this), event );
				})
				.bind('open', function( event ){

					self._open( $(this), event );
				})
				.bind('close', function( event ){

					self._close( $(this), event );
				});
		},

		_open : function( hitarea, event ){

			var self = this, theme = this.theme, childlist = hitarea.data('childlist');

			function open( hitarea ){

				hitarea.addClass( theme.icons.listopen );

				childlist.show();

				self._trigger('open', event, { list: childlist });
			}
			
			if ( !childlist.children().length && self.options.childlistURL ) {

				function complete( response, status, xhr ){

					if ( status == 'error' ) {

						alert('Error loading the request.');
					}

					self._bind( childlist );

					open( hitarea );
				}

				childlist.hide().load( self.options.childlistURL, { page: hitarea.parent().attr('rel') || 0 } , complete );

			} else open( hitarea );
		},

		_close : function( hitarea, event ){

			var childlist = hitarea.data('childlist');

			hitarea.removeClass( this.theme.icons.listopen ).addClass( this.theme.icons.listclosed );

			childlist.hide();

			this._trigger('close', event, { list: childlist });
		},

		_toggle : function( hitarea ){

			var childlist = hitarea.data('childlist');

			if ( childlist.length ){

				if ( childlist.is(':visible') ){

					hitarea.trigger( 'close' );
						
				} else {
						
					hitarea.trigger( 'open' );
				}
			}
		},

		selected : function(){

			return this.element.find( '.' + this.theme.itemactive );
		},

		expand : function(){
	
			this.element.find( '.' + this.theme.hitarea ).trigger( 'open' );
		},

		collapse : function(){

			this.element.find( '.' + this.theme.hitarea ).trigger( 'close' );
		},

		destroy : function(){

			this.element
				.removeClass( this.theme.list )
				.find( 'li' )
					.removeClass( 'ui-helper-clearfix' )
				.find( 'a' )
					.removeClass( this.theme.itemactive + ' ui-corner-all' )
					.unbind()
				.find( '.ui-icon' )
					.remove();

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});

	$.extend($.ui.tree.prototype, { 

		themes: {
			default: { 
				list: 'ui-helper-reset ui-tree ui-widget ui-widget-content ui-corner ui-corner-all',
				hitarea: 'ui-tree-hitarea',
				itemactive: 'ui-tree-item-active',
				icons: {
					'listopen': 'ui-icon-triangle-1-s',
					'listclosed': 'ui-icon-triangle-1-e'
				}
			},
			minimal: {
				list: 'ui-helper-reset ui-tree ui-widget ui-widget-content ui-corner ui-corner-all',
				hitarea: 'ui-tree-hitarea',
				itemactive: 'ui-tree-item-active',
				icons: {
					'listopen': 'ui-icon-minus',
					'listclosed': 'ui-icon-plus'
				}
			}
		}
	});

})(jQuery);

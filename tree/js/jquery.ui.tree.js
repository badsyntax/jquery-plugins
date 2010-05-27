/*
 * jQuery UI Tree
 *
 * @Author Richard Willis
 *
 * @Depends:
 *
 */

(function( $ ) {

	$.widget('ui.tree', {

		options : {
			width: 320,
			theme: 'default',
			nodeDataURL: '',
			sortable: false,
			animateSpeed: 300,
			icon: 'ui-icon-document',
			parentAsFolder: true
		},
		
		_create : function(){

			var self = this;
			
			this.theme = this.themes[ this.options.theme ];

			this.element
				.width( this.options.width )
				.addClass( this.theme.list );

			this._bind( this.element );
		},

		_bind : function( element ){

			var self = this, theme = this.theme;
			
			element
				.find( 'li' )
				.addClass( 'ui-helper-clearfix' )
				.find( 'a' ).each(function(){

					var list = $( this ).next();
					
					list =  ( list.length && list[0].nodeName == 'UL' ) ? list : false;
					
					var hitarea = self._buildHitarea( this, list );

					var icon = self._buildIcon( this, list );
			
					if ( list ) {

						( !list.children().length ) && list.hide();

						//  bind custom even to list
						self._bindList( list, hitarea );
					}
					
					self._bindAnchor( this, list, hitarea );
				});
		},
		
		_buildHitarea : function( anchor, list ){

			var self = this, theme = this.theme, icon = 'ui-tree-icon-transparent';

			if ( list ){

				icon = ( list.is(':visible') && list.children().length ) ? 
					theme.icons.listopen : 
					theme.icons.listclosed;
			}

			return $('<span />')
				.addClass( theme.hitarea + ' ui-icon ' + icon )
				.data('list', list)
				.prependTo( anchor );
		},

		_buildIcon : function( anchor, list ) {

			var icon = this.options.icon;

			if ( !icon ) return;

			if ( list && this.options.parentAsFolder ){
				icon = this.theme.folderCollapsed;
			}
			
			return $('<span />')
				.addClass( 'ui-icon ' + icon )
				.appendTo( anchor );
		},


		_bindList : function( list, hitarea ){

			var self = this;

			$( list )
			.data('hitarea', hitarea)
			.bind('toggle', function( event ){

				self._toggle( this, event );
			})
			.bind('open', function( event ){

				self._open( this, event );
			})
			.bind('close', function( event ){

				self._close( this, event );
			});
			
			if ( this.options.sortable && $.isFunction( $.fn.sortable ) ) {

				$([ this.element, this.element.find('ul') ]).sortable({
					placeholder: 'ui-state-highlight ui-tree-placeholder',
					connectWith: self.element.find('ul').not( this )
				}).disableSelection();
			}
		},

		_bindAnchor : function( anchor, list ){

			var self = this, theme = this.theme;

			$( anchor )
			.click(function( event ){

				if ( new RegExp( theme.hitarea ).test( event.target.className ) ) {

					self._toggle( list, event );

					return false;
				}

				$( this ).toggleClass( self.theme.itemselected );
				
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
		},

		_open : function( list, event ){

			list = $( list );


			var self = this, theme = this.theme, hitarea = list.data('hitarea');

			function open( hitarea ){

				hitarea.addClass( theme.icons.listopen );

				list.slideDown( self.options.animateSpeed );

				self._trigger('open', event, { list: list });
			}

			if ( !list.children().length && self.options.nodeDataURL ) {

				function complete( response, status, xhr ){

					if ( status == 'error' ) {

						alert('Error loading the request.');

						return;
					}

					hitarea.removeClass( 'ui-tree-load' );

					self._bind( list );

					open( hitarea );
				}

				hitarea.addClass( 'ui-tree-load' );

				list.hide().load( self.options.nodeDataURL, { page: hitarea.parent().attr('rel') || 0 }, complete );

			} else open( hitarea );
		},

		_close : function( list, event ){

			list = $( list );

			list.data('hitarea').removeClass( this.theme.icons.listopen ).addClass( this.theme.icons.listclosed );

			list.slideUp( this.options.animateSpeed );

			this._trigger('close', event, { list: list });
		},

		_toggle : function( list, event ){

			list = $( list );

			if ( list.length ){

				if ( list.is(':visible') ){

					this._close( list, event );
						
				} else {
					
					this._open( list, event );
				}
			}
		},

		selected : function(){

			return this.element.find( '.' + this.theme.itemselected );
		},

		expand : function(){
	
			this.element.find( 'ul' ).trigger( 'open' );
		},

		collapse : function(){

			this.element.find( 'ul' ).trigger( 'close' );
		},

		destroy : function(){

			this.element
				.removeClass( this.theme.list )
				.find( 'li' )
					.removeClass( 'ui-helper-clearfix' )
				.find( 'a' )
					.removeClass( this.theme.itemselected + ' ui-corner-all' )
					.unbind()
				.find( '.ui-icon' )
					.remove();

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});

	$.extend($.ui.tree.prototype, { 

		themes: {
			'default': { 
				list: 'ui-helper-reset ui-tree ui-widget ui-widget-content ui-corner ui-corner-all',
				hitarea: 'ui-tree-hitarea',
				folderCollapsed: 'ui-icon-folder-collapsed',
				folderOpen: 'ui-icon-folder-open',
				itemselected: 'ui-tree-item-active',
				icons: {
					'listopen': 'ui-icon-triangle-1-s',
					'listclosed': 'ui-icon-triangle-1-e'
				}
			},
			minimal: {
				list: 'ui-helper-reset ui-tree ui-widget ui-widget-content ui-corner ui-corner-all',
				hitarea: 'ui-tree-hitarea',
				folderCollapsed: 'ui-icon-folder-collapsed',
				folderOpen: 'ui-icon-folder-open',
				itemselected: 'ui-tree-item-active',
				icons: {
					'listopen': 'ui-icon-minus',
					'listclosed': 'ui-icon-plus'
				}
			}
		}
	});

})( jQuery );

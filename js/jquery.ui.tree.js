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
			icons: {
				'listopen': 'ui-icon-triangle-1-s',
				'listclosed': 'ui-icon-triangle-1-e'
			}
		},
		
		_create : function(){

			var self = this, options = this.options;

			this.element
				.width( this.options.width )
				.addClass( 'ui-helper-reset ui-tree ui-widget ui-widget-content ui-corner ui-corner-all' )
				.find( 'li' )
					.addClass( 'ui-helper-clearfix' )
					.end()
				.find( 'a' ).each(function(){

					var icon, childlist = $(this).next();

					if ( childlist.length && childlist[0].nodeName == 'UL' ){

						icon = childlist.is(':visible') ? options.icons.listopen : icon = options.icons.listclosed;
					} else {

						icon = 'ui-tree-icon-transparent';
					}

					$('<span />')
						.data('childlist', childlist)
						.addClass( 'ui-tree-hitarea ui-icon ' + icon )
						.prependTo( this )
						.bind('toggle', function(){

							var childlist = $( this ).data('childlist');

							$( this )
								.removeClass( options.icons.listopen + ' ' + options.icons.listclosed )
								.parent()
									.next()
									.toggle();


							if ( childlist.length ){

								if ( childlist.is(':visible') ){
									
									$( this ).addClass( options.icons.listopen );

									self._trigger('open', null, { list: childlist });

								} else {
									
									$( this ).addClass( options.icons.listclosed );

									self._trigger('close', null, { list: childlist });
								}
							}
						})
						.bind('click', function(){

							$( this ).trigger( 'toggle' );
						});

					$(this).hover(
						function(){
							$( this ).addClass( 'ui-state-hover ui-corner-all' );
						},
						function(){
							$( this ).removeClass( 'ui-state-hover ui-corner-all' );
						}
					);
				});
		},

		destroy : function(){

			this.element
				.removeClass( 'ui-helper-reset ui-tree ui-widget ui-widget-content ui-corner ui-corner-all' )
				.find( 'li' )
				.removeClass( 'ui-helper-clearfix' )
				.find( 'a' )
				.find('.ui-icon').remove();

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});


})(jQuery);

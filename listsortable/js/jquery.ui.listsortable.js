/*
 * jQuery UI List sortable
 *
 * @Author Richard Willis
 *
 * @Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.draggable.js
 *	jquery.ui.droppable.js
 *
 */

(function( $ ) {

	$.widget('ui.listsortable', {

		options : {
			helper: 'clone',
			opacity: .5,
			parentChildDrop: false
		},
		
		_create : function(){

			var self = this;

			this.element.find( 'a' )
			.draggable({
				containment: this.element,
				opacity: this.options.opacity,
				axis: 'x,y',
				helper: 'clone',
				zIndex: 9999,
				drag: function(event, ui){

				},
				stop: function( event, ui ) {

					self._refresh();
				}
			})
			.droppable({
				accept: function(dragger){

					return self.options.parentChildDrop ? 1 : !dragger.parents('li:first').has(this).length;
				},
				hoverClass: this.widgetBaseClass + '-droppable-hover',
				drop: function(event, ui){
					
					if ( ui.helper.parents('li:first').has(this).length ){

						var list = $( this ).parents('ul:first');

						ui.helper.after( list.children() );

						list.remove();

						//$( this ).after( ui.helper );

						return;
					}

					var dropped = $( this ).find( this.widgetBaseClass + '-active' );
					
					if ( !dropped.length ) {

						$(this).parents('li:first').after( ui.helper.parents('li:first') );
					} else {

						dropped.each(function( i ){

							$( this ).removeClass( this.widgetBaseClass + '-active');

							if ( i === dropped.length - 1 ) {
						
								$(this).after( ui.helper );
							}
						});
					}
				}
			});

		},

		_refresh : function(){

			this.element.find( 'a' ).css({ 
				'top': 'auto',
				left: 'auto'
			});
		},

		destroy : function(){

			this.element.find('a')
				.removeClass(this.widgetBaseClass + '-active')
				.draggable('destroy')
				.droppable('destroy');

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});

})( jQuery );

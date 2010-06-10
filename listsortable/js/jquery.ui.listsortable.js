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

		_create : function(){

			var self = this;

			this.element.find( 'a' )
			.draggable({
				containment: this.element,
				axis: 'x,y',
				helper: null,
				zIndex: 9999,
				delay: 0,
				distance: 0,
				stop: function(event, ui) {

					self.element.find( 'a' ).css({ 
						'top': 'auto',
						'left': 'auto'
					});
				}
			})
			.droppable({
				tolerance: 'touch',
				drop: function(event, ui){

					ui.helper
						.parents('li:first')
						.removeClass( self.widgetBaseClass + '-icon-dropitem' )
						.effect('highlight', {}, 1000);
				},
				accept: function(dragger){

					return !dragger.parents('li:first').has( this ).length;
				},
				over: function(event, ui){

					var dragger = ui.helper.parents('li:first').addClass( self.widgetBaseClass + '-icon-dropitem' ); 

					$( this ).parents('li:first').before( dragger );
				}
			});
		},

		destroy : function(){

			this.element
				.find( 'li' )
				.removeClass( this.widgetBaseClass + '-icon-dropitem' )
					.find( 'a' )
					.draggable( 'destroy' )
					.droppable( 'destroy' );

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});

})( jQuery );

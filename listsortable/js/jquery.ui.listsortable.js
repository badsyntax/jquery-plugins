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

			this.element.find( 'li' )
			.draggable({
				containment: this.element,
				axis: 'x,y',
				helper: null,
				zIndex: 9999,
				delay: 0,
				distance: 1,
				start: function(event){

					self._trigger('start');
				},
				stop: function(event, ui) {

					self.element
						.find( 'li' )
						.removeClass( self.widgetBaseClass + '-icon-dropitem');
				}
			})
			.droppable({
				tolerance: 'intersect',
				drop: function(event, ui){

					ui.helper
						.removeClass( self.widgetBaseClass + '-icon-dropitem' )
						.effect( 'highlight', {}, 1000 );

					self._trigger( 'drop' );
				},
				over: function(event, ui){

					var dragger = ui.helper.addClass( self.widgetBaseClass + '-icon-dropitem' ); 

					$( this ).before( dragger );
				}
			});
		},

		destroy : function(){

			this.element
				.find( 'li' )
				.removeClass( this.widgetBaseClass + '-icon-dropitem' )
				.draggable( 'destroy' )
				.droppable( 'destroy' );

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});

})( jQuery );

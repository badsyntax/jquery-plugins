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
			opacity: .5
		},
		
		_create : function(){

			this._drag();
		},

		_reposition : function(){

			this.element.find( 'li' ).css( { 
				'top': 'auto',
				left: 'auto'
			} )
		},

		_drag : function(){
			
			var self = this;

			this.element.find( 'li' )
			.draggable({
				containment: this.element,
				opacity: this.options.opacity,
				axis: 'y',
				zIndex: 9999,
				//revert: 'valid',
				drag: function(event, ui){

				},
				stop: function( event, ui ) {
					self._reposition();
				}
			}).droppable({
				hoverClass: 'ui-state-active',
				drop: function(event, ui) {

					var dropped = $( this ).find( '.ui-state-active' );
					
					if ( !dropped.length ) {

						$(this).after( ui.helper );
					} else {

						dropped.each(function( i ){

							$( this ).removeClass( 'ui-state-active');

							if ( i === dropped.length - 1 ) {
						
								$(this).after( ui.helper );
							}
						});
					}
				}
			});

		},

		destroy : function(){

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});

})( jQuery );

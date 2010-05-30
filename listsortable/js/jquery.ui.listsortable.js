/*
 * jQuery UI List sortable
 *
 * @Author Richard Willis
 *
 * @Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.draggable.js
 *
 */

(function( $ ) {

	$.widget('ui.listsortable', {

		options : {
			helper: 'clone'
		},
		
		_create : function(){

			this._reposition();

			this._drag();
		},

		_reposition : function(){

			var self = this;

			this.items = {};

			this.element.find( 'li' ).each(function(){
			
				var position = $( this )
					.css( { 'top': 'auto' } )
					.draggable('destroy')
					.position();

				self.items[ position.top ] = {
					element: $( this ),
					height: $( this ).height()
				};
			});
		},

		_drag : function(){
			
			var self = this, items = this.items;

			this.element.find( 'li' ).draggable({
				axis: 'y',
				containment: this.element,
				opacity: .5,
				drag: function(event, ui){
					
					var position = ui.helper.position(), height = ui.helper.height(), bottom = position.top + height;

					$.each(items, function( top ){

						top = parseInt( top );
						
						if ( this.element[0] == event.target ) return true;

						if ( 
							( bottom > top + ( this.element.height() / 2 ) )  && 
							( bottom < ( top + this.element.height() ) )
						) {

							console.log('drop');
						}
					});
				},
				stop: function( event, ui ) {

					self._reposition();

					self._drag();
				}
			});
		},

		destroy : function(){

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});

})( jQuery );

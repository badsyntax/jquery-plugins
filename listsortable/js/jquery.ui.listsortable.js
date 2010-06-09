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

			var self = this;

			this.elements = {
				dropBelow: $('<span />')
					.addClass( this.widgetBaseClass + '-icon-dropbelow ui-icon ui-icon-arrowthick-1-e ui-helper-hidden-accessible' )
					.appendTo( 'body' )
			};

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
				hoverClass: this.widgetBaseClass + '-droppable-hover',
				drop: function(event, ui){

					self._drop(this, event, ui);
				},
				accept: function(dragger){

					return self._accept(this, dragger)
				},
				over: function(event, ui){

					var 
					offset = $( this ).offset(), 
					childlist = $( this ).parents('li:first').find('ul:first');
					position = {
						left: offset.left - 10,
						top: offset.top + ( childlist.length ? childlist.outerHeight() + 10 : $( this ).height() )
					} 

					self.elements.dropBelow.css( position );
				}
			});
		},

		_accept: function(target, dragger){

			return !dragger.parents('li:first').has( target ).length;
		},

		_drop: function(target, event, ui){

			var dropped = ui.helper.parents('li:first');

			$( target ).parents( 'li:first' ).after( dropped );
			
			dropped.effect('highlight', {}, 1000);
		},

		_refresh : function(){

			this.elements.dropBelow.css({ left: -99999 });

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

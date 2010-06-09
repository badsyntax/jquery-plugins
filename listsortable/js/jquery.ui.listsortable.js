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

					var offset = $(this).offset();

					self.elements.dropBelow.css({ 
						left: offset.left - 10, 
						top: offset.top + $(this).height() });
				}
			});
		},

		_accept: function(helper, dragger){

			$(helper).after(this.elements.dropBelow);

			return this.options.parentChildDrop ? 1 : !dragger.parents('li:first').has( helper ).length;
		},

		_drop: function(helper, event, ui){

			if ( ui.helper.parents('li:first').has( helper ).length ){

				var list = $( helper ).parents('ul:first');

				ui.helper.after( list.children() );

				list.remove();

				//$( this ).after( ui.helper );

				return;
			}

			var dropped = $( helper ).find( this.widgetBaseClass + '-active' );
			
			if ( !dropped.length ) {

				$(helper).parents('li:first').after( ui.helper.parents('li:first') );
			} else {

				dropped.each(function( i ){

					$( this ).removeClass( this.widgetBaseClass + '-active');

					if ( i === dropped.length - 1 ) {
				
						$(this).after( ui.helper );
					}
				});
			}
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

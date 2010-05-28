/*
 * jQuery UI Scrollbar
 *
 * @Author Richard Willis
 *
 * @Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 */

(function($) {

	$.widget('ui.scrollbar', {
		
		options: {
			width: 'auto'
		},
		
		_create : function(){

			this.element.addClass( 'ui-scrollbar-container' );

			this._build();

			this._bind();
		},

		_build : function(){

			this.elements = {
				baseContainer: $('<div />')
					.addClass( 'ui-scrollbar-base-container ui-widget-content ui-corner-all' )
					.height( this.element.height() - 4 )
					.appendTo( this.element )
				,
				base: $('<div />')
					.addClass( 'ui-scrollbar-base' )
					.height( this.element.height() - 40 )
				,
				face: $('<a />')
					.attr('href', '#')
					.addClass( 'ui-scrollbar-face ui-state-default ui-widget-content ui-corner-all' )
					.height( 100 )
				,
				arrowUpContainer: $('<div />')
					.addClass( 'ui-scrollbar-arrow-up ui-state-default ui-corner-all' )
					.appendTo( this.element )
				,
				arrowUp: $('<div />')
					.addClass( 'ui-icon ui-icon-triangle-1-n')
				,
				arrowDownContainer: $('<div />')
					.addClass( 'ui-scrollbar-arrow-down ui-state-default ui-corner-all' )
					.appendTo( this.element )
				,
				arrowDown: $('<div />')
					.addClass( 'ui-icon ui-icon-triangle-1-s' )
			};

			this.elements.base.appendTo( this.elements.baseContainer );

			this.elements.face.appendTo( this.elements.base );

			this.elements.arrowUp.appendTo( this.elements.arrowUpContainer );
			
			this.elements.arrowDown.appendTo( this.elements.arrowDownContainer );
		},

		_bind : function(){

			function hover( event ){

				$( this ).toggleClass( 'ui-state-hover ui-scrollbar-state-hover' );
			}

			function focus( event ){

				$( this ).toggleClass( 'ui-state-active ui-scrollbar-arrow-state-active' );
			}

			this.elements.arrowUpContainer.bind('mouseenter mouseleave mousedown mouseup', hover );
			
			this.elements.arrowDownContainer.bind('mouseenter mouseleave mousedown mouseup', hover );

			this.elements.face
			.bind('mouseenter mouseleave', function(){

				$(this).toggleClass( 'ui-state-hover' );
			})
			.bind('focus blur', function(){
			
				$(this).toggleClass( 'ui-state-active' );
			})
			.draggable({ 
				axis: 'y',
				containment: 'parent'
			});
		},

		destroy : function(){

			this.element.removeClass( 'ui-scrollbar-container' );

			$.each( this.elements, function(){
			
				$( this ).remove();
			});

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});


})(jQuery);

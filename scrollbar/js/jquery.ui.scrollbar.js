/*
 * jQuery UI Scrollbar
 *
 * @Author Richard Willis
 *
 * @Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.draggable.js
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

			this._resize();
		},

		_build : function(){

			this.elements = {
				contentContainer: $('<div />')
					.addClass( 'ui-scrollbar-content-container' )
				,
				baseContainer: $('<div />')
					.addClass( 'ui-widget-content ui-corner-all ui-scrollbar-base-container' )
				,
				base: $('<div />')
					.addClass( 'ui-scrollbar-base' )
				,
				face: $('<a />')
					.attr('href', '#')
					.addClass( 'ui-state-default ui-widget-content ui-corner-all ui-scrollbar-face' )
				,
				arrowUpContainer: $('<div />')
					.addClass( 'ui-state-default ui-corner-all ui-scrollbar-arrow-up' )
				,
				arrowUp: $('<div />')
					.addClass( 'ui-icon ui-icon-triangle-1-n')
				,
				arrowDownContainer: $('<div />')
					.addClass( 'ui-state-default ui-corner-all ui-scrollbar-arrow-down' )
				,
				arrowDown: $('<div />')
					.addClass( 'ui-icon ui-icon-triangle-1-s' )
			};

			// need to check if scrollheight > height and scrollwidth > width

			this.elements.contentContainer.append( this.element.contents() ).prependTo( this.element );
			
			this.elements.baseContainer.appendTo( this.element );
			
			this.elements.arrowUpContainer.appendTo( this.element );

			this.elements.arrowDownContainer.appendTo( this.element );

			this.elements.base.appendTo( this.elements.baseContainer );

			this.elements.face.appendTo( this.elements.base );

			this.elements.arrowUp.appendTo( this.elements.arrowUpContainer );
			
			this.elements.arrowDown.appendTo( this.elements.arrowDownContainer );
		},

		_resize : function(){
			
			var ratio = Math.round( ( this.element.height() / this.element[0].scrollHeight ) * 100 );

			this._data = {
				elementHeight: this.element.height(),
				contentContainerHeight: this.elements.contentContainer.height(),
				baseContainerHeight: this.element.height() - 4,
				baseHeight: this.element.height() - 40,
				faceHeight: ( ( this.element.height() - 40 ) / 100 ) * ratio 
			};

			this.elements.baseContainer.height( this._data.baseContainerHeight );

			this.elements.base.height( this._data.baseHeight );

			this.elements.face.height( this._data.faceHeight );
		},

		_bind : function(){

			var self = this;

			function hoverClick( event ){

				if (event.type == 'mousedown' && ( event.target === self.elements.arrowDown[0] || event.target == self.elements.arrowUp[0] ) ) {

					self._scroll( event );
				}

				$( this ).toggleClass( 'ui-state-hover ui-scrollbar-state-hover' );
			}

			this.elements.arrowUpContainer
				.bind('mouseenter mouseleave mousedown mouseup', hoverClick );
			
			this.elements.arrowDownContainer
				.bind('mouseenter mouseleave mousedown mouseup', hoverClick );

			this.elements.face
			.bind('mouseenter mouseleave', function(){

				$(this).toggleClass( 'ui-state-hover' );
			})
			.bind('focus blur', function(){
			
				$(this).toggleClass( 'ui-state-active' );
			})
			.click(function(){
				return false;
			})
			.draggable({ 
				axis: 'y',
				containment: 'parent'
			});

			this.element.bind('drag', function(event, ui) {

				self._scroll(event, ui.position.top );
			});
		},

		_scroll: function( event, val ){

			var marginTop = parseInt( this.elements.contentContainer.css('marginTop').replace(/px$/, '') );

			if ( event.target == this.elements.arrowDown[0] ) {
				
				val = marginTop - 2;
				
			}
			if ( event.target == this.elements.arrowUp[0] ) {
				
				val = marginTop + 2;
			}


			var 
				ratio = ( val / ( this._data.baseHeight - this._data.faceHeight ) ) * 100,
				height = Math.round( ( ( this._data.contentContainerHeight - this._data.elementHeight ) / 100 ) * ratio ) + 2;

			this.elements.face.css( { 'top': -val } );

			this.elements.contentContainer.css( { marginTop:  -height + 'px' } );

			this._trigger( 'scroll', event );
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

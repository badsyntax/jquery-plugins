/*
 * jQuery UI Scrollbar
 *
 * @Author Richard Willis
 *
 * @Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.draggable.js
 *	jquery.mousewheel.js
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

				bars : {}
			};

			if ( this.element.height() < this.element[0].scrollHeight ) {

				this.elements.bars.vertical = {

					baseContainer: $('<div />')
						.addClass( 'ui-widget-content ui-corner-all ui-scrollbar-base-container' )
						.appendTo( this.element )
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
						.appendTo( this.element )
					,
					arrowUp: $('<div />')
						.addClass( 'ui-icon ui-icon-triangle-1-n')
					,
					arrowDownContainer: $('<div />')
						.addClass( 'ui-state-default ui-corner-all ui-scrollbar-arrow-down' )
						.appendTo( this.element )
					,
					arrowDown: $('<div />')
						.addClass( 'ui-icon ui-icon-triangle-1-s' )
				};
				
				this.elements.bars.vertical.base.appendTo( this.elements.bars.vertical.baseContainer );

				this.elements.bars.vertical.face.appendTo( this.elements.bars.vertical.base );

				this.elements.bars.vertical.arrowUp.appendTo( this.elements.bars.vertical.arrowUpContainer );
				
				this.elements.bars.vertical.arrowDown.appendTo( this.elements.bars.vertical.arrowDownContainer );
			}

			this.elements.contentContainer.append( this.element.contents() ).prependTo( this.element );
		},

		_resize : function(){
			
			var ratio = Math.round( ( this.element.height() / this.element[0].scrollHeight ) * 100 );

			this._data = {

				vertical: {

					elementHeight: this.element.height(),
					contentContainerHeight: this.elements.contentContainer.height(),
					baseContainerHeight: this.element.height() - 4,
					baseHeight: this.element.height() - 40,
					faceHeight: ( ( this.element.height() - 40 ) / 100 ) * ratio 
				}
			};

			this.elements.bars.vertical.baseContainer.height( this._data.vertical.baseContainerHeight );

			this.elements.bars.vertical.base.height( this._data.vertical.baseHeight );

			this.elements.bars.vertical.face.height( this._data.vertical.faceHeight );
		},

		_bind : function(){

			var self = this;

			function hoverClick( event ){

				if (event.type == 'mousedown' && event.which <= 1 ){

					if ( event.target === self.elements.bars.vertical.arrowDown[0]) {

						self._scrollDown( event );
					} else if ( event.target == self.elements.bars.vertical.arrowUp[0] ) {

						self._scrollUp( event );
					}
				}

				$( this ).toggleClass( 'ui-state-hover ui-scrollbar-state-hover' );
			}

			this.elements.bars.vertical.arrowUpContainer
				.bind('mouseenter mouseleave mousedown mouseup', hoverClick );
			
			this.elements.bars.vertical.arrowDownContainer
				.bind('mouseenter mouseleave mousedown mouseup', hoverClick );

			this.elements.bars.vertical.face
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

				self._scroll(event, ui.position.top, ui );
			});

			 ($.fn.mousewheel) &&
				this.element.bind('mousewheel', function(event, delta) {
					delta > 0 ? self._scrollUp( event, 4 ) : self._scrollDown( event, 4 );
				 });
		},

		_scrollUp: function( event, val ){

			val = val || 2;

			var marginTop = parseInt( this.elements.bars.vertical.face.css('top').replace(/px$/, '') );

			val = marginTop - val;

			if ( val >= 0 ) {
			
				this.elements.bars.vertical.face.css({ 'top': val });

				this._scroll( event, val );
			}
		},
		
		_scrollDown: function( event, val ){

			val = val || 2;

			var marginTop = parseInt( this.elements.bars.vertical.face.css('top').replace(/px$/, '') );

			val = marginTop + val;

			if ( val <= ( this._data.vertical.baseHeight - this._data.vertical.faceHeight ) ) {

				this.elements.bars.vertical.face.css({ 'top': val });

				this._scroll( event, val );
			}
		},

		_scroll: function( event, val, ui ){

			var	
				data = this._data.vertical,

				ratio = ( val / ( data.baseHeight - data.faceHeight ) ) * 100,

				height = Math.round( ( ( data.contentContainerHeight - data.elementHeight ) / 100 ) * ratio );

			this.elements.contentContainer.css( { marginTop:  -height + 'px' } );

			this._trigger( 'scroll', event, ui );
		},

		destroy : function(){

			this.element.removeClass( 'ui-scrollbar-container' );

			this.element.append( this.elements.contentContainer.contents() );

			$.each( this.elements.bars.vertical, function(){
			
				$( this ).remove();
			});

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});


})(jQuery);

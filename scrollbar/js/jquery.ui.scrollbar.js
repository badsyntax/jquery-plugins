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
					.addClass( 'ui-scrollbar-base-container ui-widget-content ui-corner-all' )
				,
				base: $('<div />')
					.addClass( 'ui-scrollbar-base' )
				,
				face: $('<a />')
					.attr('href', '#')
					.addClass( 'ui-scrollbar-face ui-state-default ui-widget-content ui-corner-all' )
				,
				arrowUpContainer: $('<div />')
					.addClass( 'ui-scrollbar-arrow-up ui-state-default ui-corner-all' )
				,
				arrowUp: $('<div />')
					.addClass( 'ui-icon ui-icon-triangle-1-n')
				,
				arrowDownContainer: $('<div />')
					.addClass( 'ui-scrollbar-arrow-down ui-state-default ui-corner-all' )
				,
				arrowDown: $('<div />')
					.addClass( 'ui-icon ui-icon-triangle-1-s' )
			};

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
			
			
			this.elements.baseContainer.height( this.element.height() - 4 );

			this.elements.base.height( this.element.height() - 40 );

			var ratio = Math.round( ( this.element.height() / this.element[0].scrollHeight ) * 100 );

			var height = ( this.elements.base.height() / 100 ) * ratio;

			this.elements.face.height( height );
		},

		_bind : function(){

			var self = this;

			function hover( event ){

				if (event.type == 'mousedown' && event.target === self.elements.arrowDown[0] ) {

					self._scroll( event, false, -1 );
				}

				$( this ).toggleClass( 'ui-state-hover ui-scrollbar-state-hover' );
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
			.click(function(){
				return false;
			})
			.draggable({ 
				axis: 'y',
				containment: 'parent'
			});

			this.element.bind('drag', function(event, ui) {
				self._scroll(event, -ui.position.top);
			});
		},

		_scroll: function( event, val, amount ){

			if ( !val ) {

				var marginTop = parseInt( this.elements.contentContainer.css('marginTop').replace(/px$/, '') );

				val = marginTop + amount;
			}

			this.elements.contentContainer.css({ marginTop:  val + 'px' });
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

/*
 * jQuery UI WYSIWYG
 *
 * @Author Richard Willis
 *
 * @Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 */

(function( $ ) {

	$.widget('ui.wysiwyg', {
		
		_create : function(){
			
			this.elements = {};

			this._createToolbar();

			this._edit();
		},

		_createToolbar : function(){

			var self = this;
			
			this.options.toolbar = this.options.toolbar || {};

			$.extend(this.options.toolbar, {

				buttons: {

					'Bold': function(){

						self._exec('bold');
					},
					'Italic': function(){

						self._exec('italic');
					}
				}
			});

			this.elements.toolbar = $('<div></div>').addClass( this.widgetBaseClass + '-toolbar');

			$.each( this.options.toolbar.buttons, function( index, val ){

				$('<a href="#">' + index + '</a>')
				.click(function(){
					val.apply();
				}).appendTo( self.elements.toolbar );
			});
			
			this.element.before( this.elements.toolbar );
		},

		_exec : function( name ){
		
			document.execCommand(name, false, null);
		},

		_edit : function(){

			this.element.attr( 'contentEditable', true ).focus();
		},

		destroy : function(){
			
			$.Widget.prototype.destroy.apply( this, arguments );
		}
	});

})( jQuery );

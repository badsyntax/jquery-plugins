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

			this.element.addClass( this.widgetBaseClass + '-editor' );

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
					},
					'Underline': function(){
						
						self._exec('underline');
					},
					'Ul': function(){
						
						self._insert('ul');
					},
					'Ol': function(){
						
						self._insert('ol');
					},
					'Link': function(){
						
						self._exec('link');
					},
					'Unlink': function(){
						
						self._exec('unlink');
					},
					'Indent': function(){
						
						self._exec('indent');
					},
					'Outdent': function(){
						
						self._exec('outdent');
					}
				}
			});

			this.elements.toolbar = 
				$('<ul></ul>').addClass( this.widgetBaseClass + '-toolbar ui-helper-reset ui-helper-clearfix');

			$.each( this.options.toolbar.buttons, function( index, val ){

				$('<li></li>')
				.addClass( 'ui-state-default ui-corner-all' )
				.attr( 'title', index )
				.click(function(){

					val.apply();

					return false;

				})
				.append( '<span class="ui-icon ui-icon-toolbar-' + index.toLowerCase() + '"></span>' )
				.appendTo( self.elements.toolbar );
			});
			
			this.element.before( this.elements.toolbar );

			this.elements.toolbar.find('li')
			.bind('mouseenter mouseleave', function(){
				$( this ).toggleClass('ui-state-hover');
			});

			this.elements.toolbar.disableSelection();
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

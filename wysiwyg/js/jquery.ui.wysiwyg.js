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
			
			this.elements.container = 
				$( '<div></div>' )
					.addClass( this.widgetBaseClass );

			this.elements.editor = this.element.hide().clone().show();

			this.elements.container.append( this.elements.editor );

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
					},
					'Source': function(){
						
						self._exec('source');
					}
				}
			});

			this.elements.toolbar =
				$( '<div></div>' )
					.addClass( this.widgetBaseClass + '-toolbar ui-helper-clearfix' )
					.prependTo( this.elements.container );

			this.elements.toolbarButtons = 
				$('<ul></ul>')
					.addClass( 'ui-helper-reset ui-helper-clearfix')
					.appendTo( this.elements.toolbar );

			$.each( this.options.toolbar.buttons, function( index, val ){

				$('<li></li>')
				.addClass( 'ui-corner-all' )
				.attr( 'title', index )
				.click(function(){

					val.apply();

					return false;

				})
				.append( '<span class="ui-icon ui-icon-toolbar-' + index.toLowerCase() + '"></span>' )
				.appendTo( self.elements.toolbarButtons );
			});
			
			this.element.before( this.elements.container );

			this.elements.toolbar.find('li')
			.bind('mouseenter mouseleave', function(){
				$( this ).toggleClass('ui-state-hover');
			});

			this.elements.toolbar.disableSelection();
		},

		_exec : function( name ){
		
			document.execCommand(name, false, null);
		},

		_edit : function( edit ){

			edit = edit === undefined ? true : edit;

			this.elements.editor.attr( 'contentEditable', edit ).focus();
		},

		destroy : function(){
			
			$.Widget.prototype.destroy.apply( this, arguments );

			$.each( this.elements, function(){

				this.remove();
			});
			
			this._edit( false );
		}
	});

})( jQuery );

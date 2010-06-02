/*
 * jQuery Template Renderer
 *
 * @Author Richard Willis
 *
 */

(function( $ ) {

	$.fn.render = function(data, options){

		data = data || {};

		options = $.extend({
			attrs: 'href,class,src,style'.split(',')
		}, options);

		function walkTextNodes(textNodeCallback, elementNodeCallback){

			( this.nodeType === 3 && textNodeCallback ) && textNodeCallback.call( this );

			( this.nodeType === 1 && elementNodeCallback ) && elementNodeCallback.call( this );

			$.each(this.childNodes, function(){

				walkTextNodes.call(this, textNodeCallback, elementNodeCallback);
			});
		}

		function replaceText( val ){

			this.nodeValue = val;
		}

		function replaceHTML( val ){
				
			$( this ).after( val ).remove(); 
		}

		function replace( val ) {

			while( match = /\{(.*?)\}/g.exec( val ) ) {

				if ( data[match[1]] ) { 
			
					func = /<[^>]+>/.test( data[match[1]] ) ? replaceHTML : replaceText,

					val = val.replace( new RegExp('\\$\{' + match[1] + '\}', 'g'), data[match[1]] );

					func.call( this, val );
				}
			}
		}

		return this.each(function(){

			walkTextNodes.call(this, 
			function(){
				// textnode callback
	
				var nodeValue = this.nodeValue.replace( new RegExp('\\n', 'g'), '' );

				replace.call( this, nodeValue );

			},
			function(){
				// elementnode callback

				var el = this;

				$.each(options.attrs, function(){

					var attr = el[this];

					if ( attr ) {

						if ( typeof attr == 'string' ){

							var text = document.createTextNode( attr );	

							replace.call( text, unescape(attr) );

							el[this] = text.nodeValue;
						}
					}
				});
			});
		});
	}; 

})( jQuery );

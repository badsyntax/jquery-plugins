/*
 * jQuery Template Renderer
 *
 * @Author Richard Willis
 *
 */

(function( $ ) {

	$.fn.render = function(data){

		data = data || {};

		function walkTextNodes(textNodeCallback){

			( this.nodeType === 3 && textNodeCallback ) && textNodeCallback.call( this );

			$.each(this.childNodes, function(){

				walkTextNodes.call(this, textNodeCallback);
			});
		}

		function replaceText( val ){

			this.nodeValue = val;
		}

		function replaceHTML( val ){

				
			$( this ).after( val ).remove(); 
		}

		return this.each(function(){

			walkTextNodes.call(this, function(){

				var nodeValue = this.nodeValue.replace( new RegExp('\\n', 'g'), '' );

				while( match = /\{(.*?)\}/g.exec( nodeValue ) ) {

					if ( data[match[1]] ) { 

						var 
					
						func = /<[^>]+>/.test( data[match[1]] ) ? replaceHTML : replaceText,

						val = this.nodeValue.replace( new RegExp('\\$\{' + match[1] + '\}', 'g'), data[match[1]] );

						func.call( this, val );
					}
				}
			});
		});
	}; 

})( jQuery );


(function( $ ) {

	$.fn.render = function(data){

		data = data || {};

		function walkTextNodes(textNodeCallback){

			(this.nodeType === 3 && textNodeCallback) && textNodeCallback.call(this);

			$.each(this.childNodes, function(){
				walkTextNodes.call(this, textNodeCallback);
			});
		}

		function replace(key){
			this.nodeValue = this.nodeValue.replace(new RegExp('\\$\{' + key + '\}', 'g'), data[key]);
		}

		return this.each(function(){

			walkTextNodes.call(this, function(){

				var nodeValue = this.nodeValue.replace(new RegExp('\\n', 'g'), '');

				while(match = /\{(.*?)\}/g.exec(nodeValue))
					(data[match[1]]) && replace.call(this, match[1]);
			});
		});
	}; 

})( jQuery );

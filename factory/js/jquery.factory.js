(function( $, undefined ){

	$.plugin = function(pluginName, pluginObj){

		$.fn[ pluginName ] = function(method){

			var arg = arguments;

			return this.each(function(){

				var obj = $.data( this, pluginName );

				if ( obj && obj[method] ) {

					obj[method].apply( obj, Array.prototype.slice.call( arg, 1 ) );

				} else if ( !obj && typeof method === 'object' || ! method ) {

					var plugin = $.extend({}, base, pluginObj);
						
					$.data( this, pluginName, plugin );
					
					plugin._setup.call( plugin, this, method );

					plugin._init.apply( plugin, Array.prototype.slice.call( arg, 1 ) );
				}
			});
		};
		
		var base = {

			_pluginName: pluginName,

			_setup: function(element, options){

				this.element = $( element );

				$.extend(this.options, options);
			},

			_init: function(){

			},

			 _trigger: function(scope, callback, arg){

				var type = typeof callback;

				if ( type === 'string' && this.options[ callback ] ) {

					this.options[ callback ].apply( scope, arg );

				} else if ( type === 'function' ) {

					callback.apply( scope, arg );
				}
			},

			_destroy: function(){

				$.removeData( this.element[0], this._pluginName );
			}
		};
	};

})( window.jQuery );

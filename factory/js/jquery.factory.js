(function( $, undefined ){

	$.plugin = function(pluginName, pluginObj){

		$.fn[ pluginName ] = function(method){

			var arg = arguments;

			return this.each(function(){

				// try get the plugin reference from the base element
				var obj = $.data( this, pluginName );

				// the object needs to be initiated before executing public methods
				if ( obj && obj[method] ) {

					// execute a public method
					obj[method].apply( obj, Array.prototype.slice.call( arg, 1 ) );

				} 
				// initiate the plugin, attach a reference
				else if ( !obj && ( typeof method === 'object' || ! method ) ) {

					// extend the base plugin
					$.extend(base.prototype, pluginObj);
				
					// create a new instance of the plugin	
					new base(this, method, arg);

					// reset the base plugin
					base.prototype = {};
				}
			});
		};
		
		function base(element, options, arg){

			// pre-initialization setup of object attributes
			this.element = $( element );
			
			this._pluginName = pluginName;

			$.extend(this.options, options);
					
			// add plugin reference to base element
			$.data( element, pluginName, this );

			// execute callback functions set in the options object
			this.trigger = function(scope, callback, arg){

				var type = typeof callback;

				if ( type === 'string' && this.options[ callback ] ) {

					this.options[ callback ].apply( scope, arg );

				} else if ( type === 'function' ) {

					callback.apply( scope, arg );
				}
			};

			// remove plugin reference from base element	
			this._destroy = function(){

				$.removeData( this.element[0], this._pluginName );
			};

			// initiate the plugin. _init should be set in the plugin object
			( this._init ) && this._init.apply( this, Array.prototype.slice.call( arg, 1 )); 
		};
	};

})( window.jQuery );

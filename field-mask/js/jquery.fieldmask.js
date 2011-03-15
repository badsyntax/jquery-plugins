(function(window, $){
	$.fn.fieldmask = function(config){

		config = $.extend({
			resetOnSubmit: true
		}, config);

		var helper = $('<div />');

		function changeType(type){
			/*
			1- Add a helper div after the field
			2- Remove the field from the DOM
			3- Change the field type
			4- Add the field back into the DOM, and remove the helper div
			*/
			var field = $(this)
				.after(helper)
				.remove()
				.data('password', (this.type === 'password'))
				.attr('type', type);

			helper.after(field).remove();
			return field;
		}

		this
		.live('focus.mask', function() {
			if (this.value === this.title) {
				this.value = '';
			}
			// If the text field was originally of type 'password',
			// then convert it back to a password field to mask the user input.
			if (this.type === 'text' && $(this).data('password')) {
				var field = changeType.call(this, 'password');
				setTimeout(function(){
					field[0].focus();
				});
			}
		})
		.live('blur.mask', function(event) {
			if (!this.value.length)	{
				// If it's a password field, then we need to convert it to 
				// type 'text' so can display the placeholder value.
				if (this.type === 'password') {
					changeType.call(this, 'text');
				}
				this.value = this.title;
			}
		})
		.trigger('blur.mask');

		if (config.resetOnSubmit) {
			this.each(function(){
				var field = $(this);
				field.parents('form').submit(function(){
					field[0].value = field[0].value === field[0].title ? '' : field[0].value;
				});
			});
		}

		return this;
	};
})(this, this.jQuery);

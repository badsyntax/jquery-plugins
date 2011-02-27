(function(window, $){
	$.fn.fieldmask = function(config){

		config = $.extend({
			resetOnSubmit: true
		}, config);

		var helper = $('<div />');

		function type(ftype){
			var field = $(this).after(helper).remove().attr('type', ftype).data('password', (ftype === 'text'));
			helper.after(field).remove();
			return field;
		}

		this
		.live('focus.mask', function() {
			if (this.value === this.title) {
				this.value = '';
			}
			if ($(this).data('password')) {
				type.call(this, 'password').focus();
			}
   		})
		.live('blur.mask', function(event) {
			if (!this.value.length)	{
				if (this.type === 'password') {
					type.call(this, 'text');
				}
				this.value = this.title;
			}
		})
		.trigger('blur.mask');

		if (config.resetOnSubmit) {
			this.each(function(){
				var field = $(this);
				field parents('form').submit(function(){
					field[0].value = field[0].value === field[0].title ? '' : field[0].value;
				});
			});
		}

		return this;
	};
})(this, this.jQuery);

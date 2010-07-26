$.fn.toggleField = function(){

	return this.each(function(){

		var input = this;

		if ( input.nodeName !== 'INPUT' ) return;

		$( input )
		.val( 
			!$.trim( this.value ) ? this.title : this.value 
		)
		.focus(function(){

			this.value = this.value === this.title ? '' : this.value;
		})	
		.blur(function(){

			this.value = !this.value ? this.title : this.value;
		});	

		var form = $( input ).closest( 'form' );

		if ( form.length ) {

			form.submit(function(){

				input.value = input.value == input.title ? '' : input.value;
			});	
		}
	});
};


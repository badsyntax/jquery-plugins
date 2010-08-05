
$.fn.tableEllipsis = function(options){

	options = $.extend({
		chars: '...',
		cells: 'tbody td:nth-child(1)'
	}, options);

	return this.each(function(){

		if ( this.nodeName != 'TABLE') return;

		$( this )
		.css({
			tableLayout: 'fixed',
			overflow: 'hidden'
		})
		.find( options.cells ).each(function(){

			var cell = $( this );

			if ( !cell.data( 'table-ellipsis-html' ) ) {

				cell
					.data( 'table-ellipsis-html', cell.html() )
					.data( 'table-ellipsis-text', cell.text() )
					.addClass( 'table-ellipsis-container' );
			}

			cell.empty();

			var
				words = cell.data( 'table-ellipsis-text' ).split(' '),
				tries = 0,
				helper = $( '<span />' )
					.addClass( 'table-ellipsis-helper' )
					.append( words.join(' ') )
					.appendTo( cell );

			while ( ( helper.width() > cell.width() ) && ( tries < 20 ) ) {

				tries ++;

				words.pop();

				helper[0].innerHTML = words.join(' ') + options.chars;
			}

			var text = helper.text();

			helper.remove();

			cell.html( cell.data( 'table-ellipsis-html' ) );

			if ( cell.children().length ){
				
				
				cell.find(':last').html( text );

			} else {

				cell.html( text );
			}
		});
	});
};


/*
 * jQuery UI Tree
 *
 * @Author Richard Willis
 *
 * @Depends:
 *
 */

(function($) {

	$.widget('ui.tree', {

		options : {
			width: 320
		},
		
		_create : function(){

			this.element.width( this.options.width ).addClass( 'ui-helper-reset ui-tree ui-widget ui-widget-content ui-corner ui-corner-all' );

			this.element.find('li').addClass('ui-helper-clearfix');

			this.element.find('a').hover(
				function(){
					$(this).addClass('ui-state-hover ui-corner-all');
				},
				function(){
					$(this).removeClass('ui-state-hover ui-corner-all');
				}
			);
		},

		destroy : function(){

			this.element
				.removeClass('ui-helper-reset ui-tree ui-widget ui-widget-content ui-corner ui-corner-all')
				.find('li')
				.removeClass('ui-helper-clearfix');

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});


})(jQuery);

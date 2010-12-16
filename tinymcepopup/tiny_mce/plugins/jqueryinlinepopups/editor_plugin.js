/**
 * editor_plugin_src.js
 */

(function() {
	var DOM = tinymce.DOM, Element = tinymce.dom.Element, Event = tinymce.dom.Event, each = tinymce.each, is = tinymce.is;

	tinymce.create('tinymce.plugins.jQueryInlinePopups', {
		init : function(ed, url) {
			// Replace window manager
			ed.onBeforeRenderUI.add(function() {
				ed.windowManager = new tinymce.InlineWindowManager(ed);
				DOM.loadCSS(url + '/skins/' + (ed.settings.jqueryinlinepopups_skin || 'clearlooks2') + "/window.css");
			});
		},

		getInfo : function() {
			return {
				longname : 'jQueryInlinePopups',
				author : 'Richard Willis',
				authorurl : 'http://badsyntax.count',
				infourl : '',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
	});

	tinymce.create('tinymce.InlineWindowManager:tinymce.WindowManager', {
		InlineWindowManager : function(ed) {
			var t = this;

			t.parent(ed);
			t.zIndex = 300000;
			t.count = 0;
			t.windows = {};
		},

		open : function(f, p) {

			f = f || {};
			p = p || {};

			// Run native windows
			if (!f.inline)
				return t.parent(f, p);
				
			var 
				config = {title: f.title || '',
				width: f.width + 1,
				height: f.height + 25,
				modal: true,
				resizable: false,
				draggable: true,
				dialogClass: 'ui-dialog-tinymce'},
				t = this,
				id = DOM.uniqueId(),
				vp = DOM.getViewPort(),
				w,
				dialog = $('<div />').attr('id', 'dialog-' + id)
					.hide()
					.appendTo('body');
					
			if (f.title) 
				dialog.attr('title', f.title);
				
			function buttonAction(e){
				
				if (/mceClose/.test(this.className)) {
					
					t.close(null, id);
		
					Event.cancel(e);
						
				} else if (/mceOk/.test(this.className) || /mceCancel/.test(this.className)) {
			
					f.button_func(/mceOk/.test(this.className));
			
					Event.cancel(e);
				}				
			}
				
			if (f.content){
			
				if (f.type == 'confirm'){
					
					config.buttons = [
						{
							text: "Ok",
							click: function(e) {
								buttonAction.call(e.target, e);
								return false; 
							},
							class: 'mceOk'
						},
						{
							text: "Cancel",
							click: function(e) {
								buttonAction.call(e.target, e);
								return false; 
							},
							class: 'mceCancel'
						}
					];
					
				}
				
				var content = $('<div />').addClass('ui-dialog-tinymce-content').html(f.content);
				
				dialog.html(content);
			}
			else {
				iframe = $('<iframe />', { id: id + '_ifr' })
					.css({ 
						width: f.width,
						height: f.height
					})
					.load(function(){

					})
					.appendTo(dialog)
					.attr( 'src', f.url || f.file );
			}
				
			p.mce_inline = true;
			p.mce_window_id = id;
			p.mce_auto_focus = f.auto_focus;
						
			this.features = f;
			this.params = p;
			this.onOpen.dispatch(this, f, p);
			
			dialog.dialog(config);		
			
			// Add window
			w = t.windows[id] = {
				id : id,
				iframeElement : iframe[0],
				features : f,
				element: dialog
			};	
			
			t.count++;

			return w;
		},
		
		_findId : function(w) {
			
			var t = this;

			if (typeof(w) == 'string')
				return w;

			each(t.windows, function(wo) {
				var ifr = DOM.get(wo.id + '_ifr');

				if (ifr && w == ifr.contentWindow) {
					w = wo.id;
					return false;
				}
			});

			return w;
		},

		close : function(win, id) {
			
			var t = this, w, d = DOM.doc, ix = 0, fw, id;

			id = t._findId(id || win);

			// Probably not inline
			if (!t.windows[id]) {
				t.parent(win);
				return;
			}

			t.count--;

			if (w = t.windows[id]) {
				
				t.onClose.dispatch(t);
				
				Event.clear(id);
				Event.clear(id + '_ifr');

				DOM.setAttrib(id + '_ifr', 'src', 'javascript:""'); // Prevent leak
				
				w.element.dialog('destroy').remove();
				
				delete t.windows[id];
			}
		},

		setTitle : function(w, ti) {
			
			var e;
			
			w = this._findId(w);
			
			if (e = DOM.get('ui-dialog-title-dialog-' + w))
				e.innerHTML = DOM.encode(ti);
		},

		alert : function(txt, cb, s) {
			var t = this, w;

			w = t.open({
				title : 'Error',
				type : 'alert',
				button_func : function(s) {
					if (cb)
						cb.call(s || t, s);

					t.close(null, w.id);
				},
				content : DOM.encode(t.editor.getLang(txt, txt)),
				inline : 1,
				width : 400,
				height : 130
			});
		},

		confirm : function(txt, cb, s) {
			var t = this, w;

			w = t.open({
				title: 'Please confirm',
				type : 'confirm',
				button_func : function(s) {
					if (cb)
						cb.call(s || t, s);

					t.close(null, w.id);
				},
				content : DOM.encode(t.editor.getLang(txt, txt)),
				inline : 1,
				width : 400,
				height : 130
			});
		}
	});

	// Register plugin
	tinymce.PluginManager.add('jqueryinlinepopups', tinymce.plugins.jQueryInlinePopups);
})();



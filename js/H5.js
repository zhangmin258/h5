
// 内容管理对象
var jdata = [];
var H5 = function(){
	this.id = ('h5_'+Math.random()).replace('.','_');
	this.el = $('<div class="h5" id="'+this.id+'">').hide();
	this.page = [];
	$('body').append(this.el);
	//新增一个页面
	this.addPage = function(name, text){
		jdata.push({isPage:true,name:name,text:text});
		var page = $('<div class="h5_page section"></div>');
		if(name != undefined){
			page.addClass('h5_page_'+name);
		}
		if(text != undefined){
			page.text(text);
		}
		this.el.append(page);
		this.page.push(page);

		if(typeof this.whenAddPage === 'function'){
			this.whenAddPage();
		}
		return this;
	}
	//新增一个组件
	this.addComponent = function(name, cfg){
		jdata.push({isPage:false,name:name,cfg:cfg});
		var cfg = cfg || {};
		cfg = $.extend({
			type: 'base'
		}, cfg);

		var component;  //定义一个变量，存储组件元素
		var page = this.page.slice(-1)[0];
		switch(cfg.type){
			case 'base':
				component = new H5ComponentBase(name, cfg);
				break;
			case 'polyline':
				component = new H5ComponentPolyLine(name, cfg);
				break;
			case 'pie':
				component = new H5ComponentPie(name, cfg);
				break;	
			case 'bar':
				component = new H5ComponentBar(name, cfg);
				break;
			case 'bar_v':
				component = new H5ComponentBar_v(name, cfg);
				break;
			case 'radar':
				component = new H5ComponentRadar(name, cfg);
				break;
			case 'ring':
				component = new H5ComponentRing(name, cfg);
				break;
			case 'point':
				component = new H5ComponentPoint(name, cfg);
				break;
			default:
		}
		page.append(component);  //把组件添加到当前的页面中去
		return this;
	}

	//H5对象初始化呈现
	this.loader = function(firstPage){
		this.el.fullpage({
			onLeave: function(index, newIndex, direction){
				$(this).find('.h5_component').trigger('onLeave');
			},
			afterLoad: function(anchorLink, index){
				$(this).find('.h5_component').trigger('onLoad');
			}
		});
		this.page[0].find('.h5_component').trigger('onLoad');  //组件的初始状态
		this.el.show();
		if(firstPage){
			$.fn.fullpage.moveTo(firstPage);
		}
	}

	this.loader = typeof H5_loading === 'function' ? H5_loading : this.loader;

	return this;
}













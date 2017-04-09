
// 柱图组件对象	

var H5ComponentBar_v = function(name, cfg){

	//完成component的初始化定义，通过继承水平柱图的组件
	var component = new H5ComponentBar(name, cfg);

	//计算出每个柱图的宽度
	var width= (100 / cfg.data.length);
	component.find('.line').width(width + '%');

	$.each(component.find('.rate'),function(index,value){
		var w = $(this).css('width');
		//将水平进度条的宽度设置为垂直进度条的高度，并且取消原来的宽度
		$(this).height(w).width('');
	});

	$.each(component.find('.per'),function(){
		$(this).appendTo($(this).prev());
	});
	

	return component;
}

















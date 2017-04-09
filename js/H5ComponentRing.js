
// 环图组件对象	

var H5ComponentRing = function(name, cfg){
	

	if(cfg.data.length > 1){    //环图应该只能有一个数据，
		cfg.data = [cfg.data[0]];  //将数据格式化为只有一项
	}

	//重设配置中的 type 参数，不仅利用 H5ComponentPie 构建 DOM 结构和 JS 逻辑，也使用其 CSS 样式定义（思考下为什么能达到这个效果）
	cfg.type = 'pie';

	var component = new H5ComponentPie(name, cfg);  //继承饼状图组件

	component.addClass('h5_component_ring');   //修正组件的样式，以支持在样式文件中组件的样式定义 .h5_component_ring 相关样式能生效

	var mask = $('<div class="mask"></div>');  //遮罩层

	component.append(mask);  //将创建好的遮罩层添加到组件中

	var text = component.find('.name');

	text.attr('style','');  //清空样式

	if(cfg.data[0][2]){
		text.css('color',cfg.data[0][2]);
	}

	mask.append(text);  //将项目名称添加找遮罩层中

	return component;
}

















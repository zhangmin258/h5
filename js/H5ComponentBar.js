
// 柱图组件对象	

var H5ComponentBar = function(name, cfg){
	var component = new H5ComponentBase(name, cfg);

	$.each(cfg.data,function(index,value){
		var line = $('<div class="line"></div>');
		var name = $('<div class="name"></div>');
		var rate = $('<div class="rate"></div>');
		var per = $('<div class="per"></div>');

		var width = (value[1] * 100) + '%';
		var bgStyle = '';
		if(value[2]){
			bgStyle = 'style="background-color: '+value[2]+'"';
		}
		name.text(value[0]);
		rate.css('width',width);
		rate.html('<div class="bg" '+bgStyle+'></div>');
		per.text(width).css('color',value[2]);
		line.append(name).append(rate).append(per);
		component.append(line);
	});

	return component;
}

















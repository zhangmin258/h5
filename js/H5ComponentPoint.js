
// 散点图组件对象	

var H5ComponentPoint = function(name, cfg){
	var component = new H5ComponentBase(name, cfg);

	var base = cfg.data[0][1];  //以第一条数据的比例大小为基准

	//输出每一条数据
	$.each(cfg.data, function(index,value){
		var point = $('<div class="point point_'+index+'">');
		// point.text(value[0]+'-'+value[1]);
		var name = $('<div class="name">'+value[0]+'</div>');
		var rate = $('<div class="per">'+(value[1]*100)+'%</div>');
		
		name.append(rate);
		point.append(name);
		
		var per = (value[1]/base * 100) + '%';
		point.width(per).height(per);
		if(value[2]){
			point.css('backgroundColor',value[2]);
		}
		if(value[3] != undefined && value[4] != undefined){
			point.css('left',value[3]).css('top',value[4]);
			//暂存left和top的值到point上
			point.data('left',value[3]).data('top',value[4]);
		}

		//设置z-index的值，并且重设位置
		point.css('zIndex', 100-index);
		point.css('left', '0').css('top','0');
		point.css('transition', 'all 1s '+index*0.5+'s');

		component.append(point);
	});

	//onLoad之后取出暂存的left和top值，并附加到css中
	component.on('onLoad',function(){
		component.find('.point').each(function(index,value){
			$(value).css('left',$(value).data('left')).css('top',$(value).data('top'));
		});
	});

	//onLeave之后，还原初始的位置
	component.on('onLeave',function(){
		component.find('.point').each(function(index,value){
			$(value).css('left',0).css('top',0);
		});
	});

	//每次点击point的时候执行动画效果
	component.find('.point').on('click',function(){
		
		//其他没有被点击的point默认没有动画效果
		component.find('.point').removeClass('point_focus');

		$(this).addClass('point_focus');
		
		return false;   //防止重复执行点击事件
	}).eq(0).addClass('point_focus');

	return component;
}

















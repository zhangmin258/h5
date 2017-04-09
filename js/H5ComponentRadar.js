
// 雷达图组件对象	

var H5ComponentRadar = function(name, cfg){
	var component = new H5ComponentBase(name, cfg);
 
	var w = cfg.width;
	var h = cfg.height;

	//创建一个canvas画布(雷达图背景)
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	//画圆心
	var r = w/2;   //半径
	var step = cfg.data.length;

	// ctx.beginPath();
	// ctx.arc(r,r,r,0,2*Math.PI);  //大圆
	// ctx.stroke();

	//计算一个圆周上各点的坐标(多边形顶点的坐标)
	//已知：圆心坐标(r,r)、半径r、角度deg.
	//rad = (2*Math.PI / 360) * (360 / step) * i;
	//x = r + Math.sin(rad) * r;
	//y = r + Math.cos(rad) * r;
	
	//绘制网格背景，分面绘制，分为10面
	var isBlue = false;
	for(var s=10;s>0;s--){
		ctx.beginPath();
		for(var i=0;i<step;i++){
			var rad = (2*Math.PI / 360) * (360 / step) * i;
			var x = r + Math.sin(rad) * r * (s/10);
			var y = r + Math.cos(rad) * r * (s/10);
			ctx.lineTo(x,y);
		}
		ctx.closePath();
		ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
		ctx.fill();
	}

	//绘制伞骨
	ctx.beginPath();
	for(var i=0;i<step;i++){
		var rad = (2*Math.PI / 360) * (360 / step) * i;
		var x = r + Math.sin(rad) * r;
		var y = r + Math.cos(rad) * r;
		ctx.moveTo(r,r);
		ctx.lineTo(x,y); 

		//输出项目名称
		var name = $('<div class="name"></div>');
		name.text(cfg.data[i][0]);
		name.css('transition','all .5s'+i*.1+'s'); 
		if(x>w/2){ 
			name.css('left',x/2+2);
		}else{
			name.css('right',(w-x)/2+2);
		}

		if(y>h/2){
			name.css('top',y/2+2);
		}else{
			name.css('bottom',(h-y)/2+2);
		}

		if(cfg.data[i][2]){
			name.css('color',cfg.data[i][2]);
		}

		component.append(name);
	}
	ctx.strokeStyle = '#e0e0e0';
	ctx.stroke();
	
	//创建一个画布，数据层开发
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	ctx.strokeStyle = 'red';
	var draw = function(per){
		if(per > 1){  //入场名称动画
			component.find('.name').css('opacity',1);
		}
		if(per < 0.1){  //退场名称动画
			component.find('.name').css('opacity',0);
		}


		ctx.clearRect(0,0,w,h);  //清空画布
		//绘制数据的折线图
		for(var i=0;i<step;i++){
			var rad = (2*Math.PI / 360) * (360 / step) * i;
			var rate = cfg.data[i][1] * per;
			var x = r + Math.sin(rad) * r *rate;
			var y = r + Math.cos(rad) * r *rate;
			ctx.lineTo(x,y);
			ctx.fillStyle = 'rgba(255,136,120,0.1)';
			ctx.fill();
		}
		ctx.closePath();
		ctx.stroke();

		//绘制数据的折线图的数据圆点
		for(var i=0;i<step;i++){
			var rad = (2*Math.PI / 360) * (360 / step) * i;
			var rate = cfg.data[i][1] * per;
			var x = r + Math.sin(rad) * r *rate;
			var y = r + Math.cos(rad) * r *rate;
			ctx.beginPath();
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fillStyle = '#ff7676';
			ctx.fill();
			ctx.closePath();
		}

	}
	
	component.on('onLoad',function(){
		//雷达图生长动画
		var s = 0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s += 0.01;  //动画分为100步执行，每次递增0.01；
				draw(s);
			},i*10+1000);
		}
	});


	component.on('onLeave',function(){
		//雷达图生长动画
		var s = 1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s -= 0.01;  //动画分为100步执行，每次递减0.01；
				draw(s);
			},i*10+1000);
		}
	});
















	return component;
}

















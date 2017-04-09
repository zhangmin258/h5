
// 饼图组件对象	

var H5ComponentPie = function(name, cfg){
	var component = new H5ComponentBase(name, cfg);
 
	var w = cfg.width;
	var h = cfg.height;
	
	//创建一个canvas画布(饼图背景)
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',1);
	component.append(cns);

	//绘制一个底图层
	var r = w/2;    //半径
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#eee';
	ctx.fillStyle = '#eee';
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();

	//创建一个canvas画布，绘制一个数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',2);
	component.append(cns);

	var colors = ['red','green','blue','#f90','maroon'];  //备用颜色	
	var sAngel = 1.5 * Math.PI;   //设置开始的角度在12点的位置
	var eAngel = 0;  //结束角度
	var aAngel = Math.PI * 2;  //100%的圆结束的角度 2pi=360
	
	var step = cfg.data.length;
	for(var i=0;i<step;i++){
		var item = cfg.data[i];
		var color = item[2] || (item[2] = colors.pop());
		eAngel = sAngel + aAngel * item[1];  //结束角度
		ctx.beginPath();
		ctx.lineWidth = 0.1;
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngel,eAngel);
		ctx.fill();
		ctx.stroke();
		sAngel = eAngel;   //下一个起始的角度等于上一个结束的角度

		//加入所有的项目名称以及百分比
		var name = $('<div class="name"></div>');
		var rate = $('<div class="per"></div>');
		name.text(item[0]);
		rate.text(item[1]*100+'%');
		name.append(rate);

		var x = r + Math.sin(0.65 * Math.PI - sAngel) * r;
		var y = r + Math.cos(0.65 * Math.PI - sAngel) * r;
		// name.css('left',x/2).css('top',y/2);
		if(x > w/2){
			name.css('left',x/2);
		}else{
			name.css('right',(w-x)/2);
		}

		if(y > h/2){
			name.css('top',y/2);
		}else{
			name.css('bottom',(h-y)/2);
		}

		if(item[2]){
			name.css('color',item[2]);
		}

		name.css('opacity',0);
		component.append(name);
	}


	////创建一个canvas画布，绘制一个蒙版层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',3);
	component.append(cns);

	var r = w/2;    //半径
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#eee';
	ctx.fillStyle = '#eee';
	
	//生长动画
	var draw = function(per){
		ctx.clearRect(0,0,w,h);  //清除画布

		ctx.beginPath();
		ctx.moveTo(r,r);
		if(per <= 0){
			ctx.arc(r,r,r+1,0,2*Math.PI);
		}else{
			ctx.arc(r,r,r+1,sAngel,sAngel+2*Math.PI*per,true);
		}
		
		ctx.fill();
		ctx.stroke();

		if(per >= 1){
			component.find('.name').css('opacity',1);
		}

		if(per <= 0){
			component.find('.name').css('opacity',0);
		}
	}
	
	draw(0);

	component.on('onLoad',function(){
		//饼图生长动画
		var s = 0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s += 0.01;  //动画分为100步执行，每次递增0.01；
				draw(s);
			},i*10+500);
		}
	});


	component.on('onLeave',function(){
		//饼图生长动画
		var s = 1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s -= 0.01;  //动画分为100步执行，每次递减0.01；
				draw(s);
			},i*10+500);
		}
	});
















	return component;
}

















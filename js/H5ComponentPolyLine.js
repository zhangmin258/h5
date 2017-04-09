
// 折线图组件对象	

var H5ComponentPolyLine = function(name, cfg){
	var component = new H5ComponentBase(name, cfg);
 
 	//绘制网格线
	var w = cfg.width;
	var h = cfg.height;

	//创建一个canvas画布(网格线背景)
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	//绘制水平网格线，分成10等份
	var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#aaa';
	window.ctx = ctx;
	for(var i=0;i<step+1;i++){
		var y = (h/step)*i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}

	//绘制垂直网格线，按照数据的个数来划分等份
	step = cfg.data.length+1;
	var name_w = w/step >> 0;
	for(var i=0;i<step+1;i++){
		var x= (w/step)*i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);

		//展示项目名称
		if(cfg.data[i]){
			var name = $('<div class="name"></div>');
			name.text(cfg.data[i][0]);
			name.css('width',name_w/2).css('left',((x/2-name_w/4)+name_w/2)>>0);
			component.append(name);
		}
		
	}
	ctx.stroke();


	//再次创建一个canvas画布，绘制折线图数据
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	var draw = function(per){
		//清空画布
		ctx.clearRect(0,0,w,h);
		//绘制折线图
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle= '#ff8878';

		//绘制圆点
		var x = 0;
		var y = 0;
		var row_w = w/(cfg.data.length+1);
		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w * i + row_w;
			y = h-(h*item[1]*per);
			ctx.moveTo(x,y);  //原点
			ctx.arc(x,y,5,0,2*Math.PI);  //绘制一个圆点
		}

		//连线
		//移动画笔到第一个数据点的位置 
		ctx.moveTo(row_w,h-(h*cfg.data[0][1]*per));
		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w * i + row_w;
			y = h-(h*item[1]*per);
			ctx.lineTo(x,y);
		}
		ctx.stroke();

		//填充阴影
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgba(255,136,120,0)';  //线条颜色
		ctx.lineTo(x,h); //最后画笔结束的位置
		ctx.lineTo(row_w,h);   //起初画笔开始的位置
		ctx.fillStyle = 'rgba(255,136,120,0.3)';  //填充颜色
		ctx.fill();

		//填充数据
		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w * i + row_w;
			y = h-(h*item[1]*per);
			ctx.font = "16pt Calibri";  //字体大小
			ctx.fillStyle = item[2] ? item[2] : '#595959';  //字体颜色
			ctx.fillText((item[1]*100>>0)+'%', x-15, y-10); //字体位置
		}
		ctx.stroke();
	}


	component.on('onLoad',function(){
		//折线图的生长动画
		var s = 0;  //动画总步长
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s += 0.01;  //动画分成100步执行，每次累加0.01步
				draw(s);
			},i*10+1000);
		}

	});

	component.on('onLeave',function(){
		//折线图的退长动画
		var s = 1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s -= 0.01;
				draw(s);
			},i*10+1000);
		}
	});


	return component;
}

















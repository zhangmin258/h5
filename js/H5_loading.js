
var H5_loading = function(images,firstPage){

	var id = this.id;

	if(this._images === undefined){  //第一次加载
		this._images = (images || []).length;
		this._loaded = 0;  //初始化的时候加载0个资源
		window[id] = this;  //把当前对象存储在全局对象window中，用来进行某个图片加载完成之后的回调函数

		for(i in images){
			var item = images[i];
			var img = new Image;   //实例化一个图片对象
			img.onload = function(){
				window[id].loader();
			}
			img.src = item;
		}

		$('#rate').text('0%');
		return this;

	}else{

		this._loaded ++;
		$('#rate').text(((this._loaded / this._images * 100) >> 0) + '%');
		if(this._loaded < this._images){
			return this;
		}
	}
	window[id] = null;

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













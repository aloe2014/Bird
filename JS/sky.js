(function(Fly){
	var sky=function(config){
		this.ctx=config.ctx;
		this.img=config.img;
		this.imgw=this.img.width,
		this.imgh=this.img.height;
		this.x=config.x||0;
		this.y=0;

		this.speed=-0.2;
	};

	sky.prototype = {
		constructor:sky,
		draw:function(delta){
			this.ctx.drawImage(this.img, this.x, 0,this.imgw,this.imgh);
			this.x += delta*this.speed;
			//当前面一张图片全部离开画布时，让它瞬移回右边
			if(this.x <= -this.imgw){
				this.x += this.imgw*2;
			}
		}

	};

	Fly.sky=sky;

})(Fly)
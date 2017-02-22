(function(Fly){
	var pipe = function(config){
		this.ctx=config.ctx;
		this.imgTop=config.imgTop;
		this.imgDown=config.imgDown;
		this.imgw=this.imgTop.width;
		this.imgh=this.imgTop.height;
		this.pipeToph=0;//上面管道的y轴坐标
		this.pipeDownh=0;//下面管道的y轴坐标
		this.x=config.x;
		this.speed=-0.2;

		this.calcPipeHeight();

	};
	pipe.prototype={
		constructor:pipe,
		draw:function(delta) {

			//绘制上面的管道
			this.ctx.drawImage(this.imgTop, this.x,this.pipeToph);
			//绘制下面的管道
			this.ctx.drawImage(this.imgDown, this.x, this.pipeDownh);
			this.ctx.beginPath();

			//绘制管道的路径
			this.ctx.rect(this.x,this.pipeToph,this.imgw,this.imgh);
			this.ctx.rect(this.x,this.pipeDownh,this.imgw,this.imgh);
			
			this.x+=this.speed*delta;

			if(this.x<=-this.imgw){
				this.x+=this.imgw*3*6;

				//重新设置管道的高度
				this.calcPipeHeight();
			}
			
		},

 //随机生成上下柱子的高度在，定在50-250之间
		calcPipeHeight:function(){
			var pipeTopHeight=Math.random()*200+50;
			this.pipeToph=pipeTopHeight-this.imgh;
			this.pipeDownh=pipeTopHeight+100;
		}
	};

	Fly.pipe = pipe;


})(Fly)
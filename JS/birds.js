(function(Fly){
	var Bird = function(config){
		this.img=config.img,
		this.ctx=config.ctx,
		this.a=0.0005,//小鸟下落时的加速度
		this.v=0,//小鸟每次下落时的初始速度
		this.y=100,//小鸟垂直方向的初始位置

		this.index=0,
		this.imgw=this.img.width/3,
		this.imgH=this.img.height,

		this.maxAngle=45,//小鸟转动最大的角度
		this.maxv=0.3,//最大角度对应的最大速度
		this.curAngle=0;//当前转动的角度

	};

	Bird.prototype={
		constructor:Bird,

		draw:function(delta){
			this.curAngle=this.v/this.maxv*this.maxAngle;
				//超过最大速度时，保持最大角度不变
			if(this.v>this.maxv){
				this.curAngle=this.maxAngle;
			}else if(this.v<-this.maxv){
				this.curAngle=-this.maxAngle;
			}

			//移动坐标系，让小鸟自转
			ctx.translate(100,this.y);
			ctx.rotate(Fly.toRadian(this.curAngle));

			//1.求小鸟竖直方向的坐标
				//小鸟下落时的初始速度
				this.v += this.a*delta;
				//本次渲染小鸟的位移为vt+1/2*a*t*t(公式)
				//小鸟此时在y轴上的坐标
				this.y += this.v*delta+1/2*this.a*delta*delta;						

			//2.小鸟的位置
			this.ctx.drawImage(this.img, this.index++*this.imgw, 0,this.imgw,this.imgH,-1/2*this.imgw,-1/2*this.imgH,this.imgw,this.imgH);

			this.index %= 3;
		},
		changeSpeed:function(speed){
			this.v=speed;
		}
	};

	Fly.Bird=Bird;

})(Fly)
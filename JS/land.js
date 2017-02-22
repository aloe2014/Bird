(function(Fly){
	var land = function(config) {
		this.ctx=config.ctx,
		this.img=config.img,
		this.imgw=this.img.width,
		this.imgh=this.img.height,
		this.x=config.x,
		this.y=config.y,
		this.speed=-0.2

	};
	land.prototype = {
		constructor:land,
		draw:function(delta){

			this.ctx.drawImage(this.img, this.x, this.y);
			this.x+=delta*this.speed;

			if(this.x<=-this.imgw){
				this.x+=5*this.imgw;
			}

		}
	}


	Fly.land = land;

})(Fly)
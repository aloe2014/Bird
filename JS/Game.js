

// 控制游戏的对象，所有与游戏内容相关的逻辑或者变量的处理都需要交给
// 当前这个游戏对象！
// 有别与我们的Fly对象， Fly是整个游戏暴露到全局环境中的一个全局对象！
// 而 Game 与 Bird 等对象一样，都是属于 Fly 的一部分！

(function(Fly){
	var Game = function(id){
		this.cv=document.querySelector(id);
	    this.ctx=this.cv.getContext("2d");
	    this.imgArr = ["birds","land","pipe1","pipe2","sky"];
	    this.lastTime=new Date();

		//存储所有的游戏对象
		this.roleList=[];
		// 存储游戏的英雄（小鸟）
		this.hero = null;

		this.isStart=true;
		this.curTime = 0;

	};
	Game.prototype = {
		constructor:Game,
		//开始游戏
		start:function() {
			var that=this;
			Fly.loadImgs(imgArr,function(imgList){
				this.init(imgList);

				this.draw();

				this.bindEvent();
			}

		},
		//结束游戏
		end: function() {

			this.isStart = false;
		},
		//初始化角色
		init: function(imgList) {
			this.hero = new Fly.Bird({
			ctx:this.ctx,
			img:imgList.birds
			});

			//创建天空对象
			for(var i=0;i<2;i++){
				var sky=new Fly.sky({
				ctx:this.ctx,
				img:imgList.sky,
				x:i*imgList.sky.width,
			
				});
				this.roleList.push(sky)
			};

			//创建管道对象
			for(var i=0;i<6;i++){
				this.roleList.push(
					new Fly.pipe({
						ctx:this.ctx,
						imgTop:imgList.pipe2,
						imgDown:imgList.pipe1,
						x:i*imgList.pipe1.width*3+300

					})
				)
			}

			//创建土地对象
			for(var i=0;i<5;i++){
				this.roleList.push(		
					new Fly.land({
						ctx:this.ctx,
						img:imgList.land,
						x:i*imgList.land.width,
						y:imgList.sky.height-imgList.land.height

				})
			)	
		}
	
		},
		//渲染方法
		draw: function(){
			var that = this;
			var render = function(){
				that.curTime = new Date();
				var delta = curTime-lastTime;//两次渲染之间的时间间隔
				lastTime = curTime;//修改每次下落前的初始时间

				that.ctx.clearRect(0 , 0, cv.width, cv.height);

				//小鸟旋转改变了当前坐标
				that.ctx.save();

				//统一绘制
				that.roleList.forEach(function(role){
					role.draw(delta);
				})

				//绘制小鸟（英雄，单独绘制）
				bird.draw(delta);
		
				that.ctx.restore();

				if(that.hero.y<=0||that.hero.y>=(that.cv.height-imgList.land.height)||that.ctx.isPointInPath(that.hero.x, that.hero.y)){
					that.isStart=false;
				}
				
				console.log(bird.x, bird.y);

				if(that.isStart){
					window.requestAnimationFrame(render);
				}
		

		},
		//绑定事件
		bindEvent: function(){
			var that = this;
			//给canvas绑定点击事件
			that.cv.addEventListener("click", function(){
				bird.changeSpeed(-0.3);//给速度一个负值，让其向上飞
				// console.log(123);
			})

		}


	};

	Fly.Game = Game;

})(Fly)

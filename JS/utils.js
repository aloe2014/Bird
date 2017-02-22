
(function(win){
	//创建一个对象用来承载所有的公共方法
	var FlyObj={};

	FlyObj.toRadian=function(angel){
		return angel/180*Math.PI;
	};

	FlyObj.loadImgs = function(srclist,callback){
		var countImg=0,//记录已加载的图片书量
			imgList={},//使用对象来存储图片，方便通过键来直接找到图片
			len=srclist.length;

			//遍历数组，通过给图片的路径赋值，创建图片；并在每张图片加载时，都判断一下是否已全部加载完成，如加载完成，则执行回到函数，做相应的操作
			srclist.forEach(function(srcStr){

				var img = new Image();

				img.src = "images/" + srcStr +".png";
				imgList[srcStr]=img;//这样imgList里面的键是图片名称，值为图片

				img.addEventListener("load", function(){
					countImg++;
					if(countImg >= len){
						// console.log("图片已加载完成");
						callback(imgList);
					}
				})

			})

	};

// 通过 window 暴露到全局环境中！供其他对象来使用
	win.Fly=FlyObj;

})(window)
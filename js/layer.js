(function(window,undefined){
	var layerBaseConfig = {
		sectionWidth : 500,
		sectionHeight : 300,
	}
	function Layer(param){
		return new Layer.prototype.init(param);
	}
	Layer.prototype.init = function(param){
		this.sectionWidth = param.sectionWidth ? param.sectionWidth : 500;
		this.sectionHeight = param.sectionHeight ? param.sectionHeight :300;
		this.createLayer(param)
	}
	Layer.prototype.createLayer = function(param){
		var body = document.getElementsByTagName('body')[0];
		//增加section
		var section = document.createElement("div");
		section.className = 'layer-wrap';
		//用户自定义宽高
		if(param.sectionWidth){
			section.style.width = param.sectionWidth + 'px';
			section.style.marginLeft = (0-param.sectionWidth)/2 + 'px';
		}
		
		if(param.sectionHeight){
			section.style.height = param.sectionHeight + 'px';
			section.style.marginTop = (0-param.sectionHeight)/2 + 'px';
		}
		//增加header 包裹title和close
		var header = document.createElement("header");
		header.className = 'layer-head';
		
		var headtitle = document.createElement('div');
		headtitle.innerHTML = param.headText ? param.headText : "窗口";
		headtitle.className = 'layer-head-title';
		
		var a = document.createElement("a");
		a.innerHTML = "x";
		a.href = "javascript:;";
		a.className = "close";
		header.appendChild(a);
		
		//content
		var article = document.createElement('div');
		article.className = "layer-content"
		article.innerHTML = "12123";
		
		header.appendChild(headtitle);
		section.appendChild(header);
		section.appendChild(article);
		body.appendChild(section);
		
		//drag
		if(param.drag===true){
			this.drag(section,header,param);
		}
	}
	Layer.prototype.drag = function(elem,handle){
		handle.style.cursor = "move";
		var sectionWidth = this.sectionWidth;
		var sectionHeight = this.sectionHeight;
		handle.addEventListener("mousedown",function(e){
			console.log("down")
			e.preventDefault();
			var disY,
				disX;
			disX = e.clientX - elem.offsetLeft;
			disY = e.clientY - elem.offsetTop;

			document.onmousemove = function (event) {
				event.preventDefault();
				var tempX = event.clientX - disX + sectionWidth /2,
					tempY = event.clientY - disY + sectionHeight /2,
					borderRight = document.documentElement.offsetWidth - elem.offsetWidth + sectionWidth / 2,
					borderLeft = sectionWidth / 2,
					borderTop = sectionHeight / 2,
					borderBottom = document.documentElement.offsetHeight - elem.offsetHeight + sectionHeight / 2;
				//拖拽时不能超过视窗边界
				if (tempX > borderRight) {
					tempX = borderRight;
				} else if (tempX < borderLeft) {
					tempX = borderLeft;
				}
				if (tempY > borderBottom) {
					tempY = borderBottom;
				} else if (tempY < borderTop) {
					tempY = borderTop;
				}
 				
				elem.style.left = tempX + "px";
				elem.style.top = tempY + "px";
			}
			document.onmouseup = function () {
				document.onmousemove = null;
				document.onmouseup = null;
			};
		})	
	}
	//让init的实例能够通过原型链访问Layer.prototype
	Layer.prototype.init.prototype = Layer.prototype;
    window.Layer = Layer;//导出接口
})(window,undefined)
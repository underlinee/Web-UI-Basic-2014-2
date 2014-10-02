

function slide(){
	var cluster = document.querySelectorAll(".cluster");

	var startX;
	var wrap = document.querySelector("#wrap");
	var initialPosition;

	for(var i =0;i<cluster.length;i++){
		cluster[i].addEventListener('touchstart', function(e){
			initialPosition = erasePositionPX('#wrap');
			startX = e.touches[0].pageX;
		},false)
	}


	for(var i=0; i<cluster.length;i++){
		cluster[i].addEventListener('touchmove', function(e) {
			var moveX = e.touches[0].pageX;
			var movingDistance = startX-moveX;
			wrap.style.left = initialPosition-movingDistance+"px";
		}, false);
	}

	for(var i=0; i<cluster.length;i++){
		cluster[i].addEventListener('touchend', function(e){
				
		    var clusterWidth = eraseWidthPX('#ct');
		    var leftMovableWidth = -clusterWidth*2;
			var rightMovableWidth = clusterWidth*0;
			var notValidMove = clusterWidth/3;

			var endX = e.changedTouches[0].pageX;
			var movedDistance = startX-endX;
			
			if(movedDistance > notValidMove&&initialPosition>leftMovableWidth){
				initialPosition-=clusterWidth;
				wrap.style.left = initialPosition+"px";
			}else if(movedDistance < -notValidMove&&initialPosition<rightMovableWidth){
				initialPosition+=clusterWidth;
				wrap.style.left = initialPosition+"px";
			}else {
				wrap.style.left = initialPosition+"px";
			}

		},false)
	}
}

function erasePositionPX (name) {
		var object = document.querySelector(name);
		var posFromCss = window.getComputedStyle(object).left;
		return posFromCss.substring(0,posFromCss.length-2)*1;
}

function eraseWidthPX (name) {
		var object = document.querySelector(name);
		var widthFromCss = window.getComputedStyle(object).width;
		return widthFromCss.substring(0,widthFromCss.length-2)*1;
}

window.addEventListener('load', function(e){
	slide();
}, false)
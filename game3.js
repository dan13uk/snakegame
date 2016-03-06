var snake={};

snake.checkCollision = function(x,y,array){
	for(var i=0;i<array.length;i++){
		if(array[i].x==x && array[i].y == y)
			return true;
	}
	return false;
}
snake.drawCell = function(x,y){
	ctx.fillStyle = "blue";//set fill 
	ctx.fillRect(x*cw,y*cw,cw,cw);
	ctx.strokeStyle = "white";
	ctx.strokeRect(x*cw,y*cw,cw,cw);
}
snake.createfood = function(){
	var fx = Math.round(Math.random()*(w-cw)/cw);
		var fy = Math.round(Math.random()*(h-cw)/cw);
		food={
			x:fx,
			y:fy
		}	
}
snake.createSnake = function(){
	snake.s_array = [];
	for(var i=length-1;i>=0;i--){
			s_array.push({x:i,y:0});			
		}

}
snake.loop = function(){
	if(typeof snake.gameloop != "undefined"){clearInterval(snake.gameLoop)}
	snake.gameLoop = setinterval("Paint",60);
}
snake.paint = function (){
	
}
}
snake.init = function(){
	snake.direction = "right";
	snake.createfood();
	snake.createSnake();
	snake.loop();
}
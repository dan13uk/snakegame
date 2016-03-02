var canvas= document.getElementById('canvas');
var snake_array;
var ctx = canvas.getContext('2d');
var h = canvas.height;
var w = canvas.width;
var cw = 10;
var length = 5;
var loop;
var direction;
 function init(){
 	direction = "right";
 	createFood();
 	createSnake();
	if(typeof loop !="undefined")clearInterval(loop);
	loop = setInterval(paint,60);
	console.log(loop);
 }
 init();

	function createSnake(){

		
		snake_array = [];
		for(var i=length-1;i>=0;i--){
			snake_array.push({x:i,y:0});
			

		}

	};
	function paint(){
		//draw canvas borders 
	ctx.fillStyle = "white";//set fill 
	ctx.fillRect(0,0,w,h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0,0,w,h);

		var sx = snake_array[0].x;
		var sy = snake_array[0].y;

		
		if(direction=="right"){
			sx++;//if direction set to right increment tx
		}
		else if(direction=="left"){
			sx--;//if direction set to left decrement tx
		}
		else if(direction=="down"){
			sy++;//if direction set to down increment ty
		}
		else if (direction=="up"){
			sy--;//if direction set to up decrement ty
		}

		if(sx == -1 || sy == -1 || sx == w/cw || sy == h/cw){
			init();
			return;
		}
		
		if(sx==food.x && sy==food.y){
			var tail = {x:sx,y:sy};
			createFood();
		}
		else{
		var tail = snake_array.pop();
		tail.x = sx;
		tail.y = sy;
		
		}

		snake_array.unshift(tail);
		for(var i = 0;i<snake_array.length;i++){
			 sx = snake_array[i].x;
			 sy = snake_array[i].y;
			drawCell(sx, sy);
		}

		drawCell(food.x, food.y);
		

	}

	function createFood(){

		var fx = Math.round(Math.random()*(w-cw)/cw);
		var fy = Math.round(Math.random()*(h-cw)/cw);
		food={
			x:fx,
			y:fy
		}	
	}
	function drawCell(x,y){
			ctx.fillStyle = "blue";//set fill 
			ctx.fillRect(x*cw,y*cw,cw,cw);
			ctx.strokeStyle = "white";
			ctx.strokeRect(x*cw,y*cw,cw,cw);
	}
	
	document.onkeydown = function(e){
		var key = e.which;
		console.log(key);
		if(key == "37" && direction !="right"){direction = "left";}
		else if(key == "38" && direction !="down"){direction = "up";}
		else if(key == "39" && direction !="left"){direction = "right";}
		else if(key == "40" && direction !="up"){direction = "down"}

	}
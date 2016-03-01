$(document).ready(function(){
	
	//get canvas width and height assign to variable 
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();

	//cell width
	var cw = 10;
	
	var direction;

	var food;

	var score = 0;

	var snake_array; // an array of cells to make up snake
	
	var debug=1;//turn debug on and off
	

	function init(){
		direction = "right";
		createSnake()
		createFood();
		
		
		if(typeof game_loop !="undefined") clearInterval(game_loop);

		game_loop = setInterval(paint,60);
		if(debug){
			console.log("init function");
		}
		
	}

	init();

	

	
	
	function createSnake(){

		var lenght = 5;
		snake_array = [];
		for(var i = lenght-1; i >= 0 ;i--){
			//create the snake 
			//put x and y co 
			snake_array.push({x:i,y:0})
		}
		if(debug){
			console.log("create snake function");
		}
	}

	//paint the snake
	function paint(){

		//draw canvas borders 
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,w,h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0,0,w,h);

		//movement code for the snake

		

		var tx = snake_array[0].x;
		var ty = snake_array[0].y;
		if(debug){
			console.log(snake_array.length);
		} 

		if(direction=="right"){
			tx++;
		}
		else if(direction=="left"){
			tx--;
		}
		else if(direction=="down"){
			ty++;
		}
		else if (direction=="up"){
			ty--;
		}


		if(tx == -1 || tx == w/cw || ty == -1 || ty == h/cw || checkCollision(tx, ty, snake_array)){
			init();
			return;
		}

		//create head instead of moiving tail

		if(tx == food.x && ty == food.y){
		var tail = {x:tx,y:ty};
		createFood();
		score++;
		}
		else{
			var tail = snake_array.pop();
			tail.x = tx;
			tail.y = ty;
		}

		
		//console.log(tail);
		snake_array.unshift(tail);
		if(debug){
			console.log(snake_array.length);
		}

		for(var i = 0; i < snake_array.length; i++){
			var c = snake_array[i];

			paintCell(c.x, c.y);
			
		}

		paintCell(food.x, food.y);
		var drawScore = "Score: " + score;
		ctx.fillText(drawScore,5,h-5);
	}

	function paintCell(x,y){
		ctx.fillStyle = "blue";
		ctx.fillRect(x*cw,y*cw,cw,cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cw,y*cw,cw,cw);
	}

	function createFood(){

		 food = {
			x:Math.round(Math.random()*(w-cw)/cw),
			y:Math.round(Math.random()*(h-cw)/cw)
		};
	}

	function checkCollision(x,y,array){
		for(i=0;i<array.length;i++){
			if(array[i].x==x && array[i].y==y)
				return true;
		}
		return false;
	}

	$(document).keydown(function(e){

		var key = e.which; 
		
		if(key == "37" && direction != "right"){
			direction = "left";
		}
		else if(key == "38" && direction !="down"){
			direction = "up";
		}
		else if(key == "39" && direction !="left"){
			direction = "right";
		}
		else if(key == "40" && direction !="up"){
			direction = "down";
		}
	})

	
	
	


});
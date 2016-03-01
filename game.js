$(document).ready(function(){
	//setting up gobal variables
	//get canvas width and height assign to variable 
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();

	//cell width
	var cw = 10;
	
	var direction;

	var food;

	var score;

	var snake_array; // an array of cells to make up snake

	var game_loop;
	
	var debug=0;//turn debug on and off
	

	function init(){//start the game
		direction = "right";//set the direction to right when first start the game
		createSnake()//create the snake
		createFood();//create the food
		score=0;
		
		if(typeof game_loop !="undefined")clearInterval(game_loop);//check game_loop is undefined and clear 

		game_loop = setInterval(paint,60);//call the setinterval method to call the paint function at 60 milliseconds
		if(debug){
			console.log("init function");
		}
		
	}

	init();

	

	
	
	function createSnake(){

		var lenght = 5;//Snake start off size is 5
		snake_array = [];//assign empty array
		for(var i = lenght-1; i >= 0 ;i--){
			//create the snake looping throught the length
			//put x and y coordinates into array
			snake_array.push({x:i,y:0})
		}
		if(debug){
			console.log("create snake function");
		}
	}

	//paint the snake
	function paint(){

		//draw canvas borders 
	ctx.fillStyle = "white";//set fill 
	ctx.fillRect(0,0,w,h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0,0,w,h);
		$("#score").empty();
		$("#score").append("<h3>Score: "+ score +"</h3>" );

		
//get the coordiantes of the head first element of the array
		var tx = snake_array[0].x;
		var ty = snake_array[0].y;
		if(debug){
			console.log(snake_array.length);
		} 
//increment or decrement tx and ty by checking variable direction string.
		if(direction=="right"){
			tx++;//if direction set to right increment tx
		}
		else if(direction=="left"){
			tx--;//if direction set to left decrement tx
		}
		else if(direction=="down"){
			ty++;//if direction set to down increment ty
		}
		else if (direction=="up"){
			ty--;//if direction set to up decrement ty
		}

//check if the first element of the array hit the wall
//if the vaule of x or y is -1 or x and y is 45 then head has hit the wall
//checkCollision function check if the snake has hit it self by passiing the current location of x, y and the array.
		if(tx == -1 || tx == w/cw || ty == -1 || ty == h/cw || checkCollision(tx, ty, snake_array)){
			init();//if any of these are ture then restart the game calling the init function
			return;
		}

		
//check when the head of the snake hits the food by checking the values of x and y is equals the same values 
		if(tx == food.x && ty == food.y){
		var tail = {x:tx,y:ty};//create an object with the values of x and y For adding to the array.
		createFood();//call the createFood () to create a random food
		score++;//add the scoure by 1
		}
		//if the snake havent hit the food then the snake will be moving 
		else{
			var tail = snake_array.pop();//assign the last end element of the array to variable and remove from array
			tail.x = tx;//set x to new incremented or decremented value
			tail.y = ty;//set y to new incremented or decremented value
		}

		
		//console.log(tail);
		snake_array.unshift(tail);//put new coordinates into the begining of the array
		if(debug){
			console.log(snake_array.length);
		}

//draw the snake on to canvas
//loop through snake array
		for(var i = 0; i < snake_array.length; i++){
			var c = snake_array[i];

			paintCell(c.x, c.y);//get values of x and y and call the paint function to paint on to canvas
			
		}

		paintCell(food.x, food.y);//paint the food by getting the x and y values from food object.
		var drawScore = "Score: " + score;//set up score string and score value to be display
		
	}

	function paintCell(x,y){//paintCell function takes two arruments this will be the x and y coordinates 
		ctx.fillStyle = "blue";//set the fillStyle to colour blue
		ctx.fillRect(x*cw,y*cw,cw,cw);//fillRec() passing the x and y coordinates with the cw variable setting the height and width
		ctx.strokeStyle = "white";//set the strokestyle value to white
		ctx.strokeRect(x*cw,y*cw,cw,cw);//create stroke rect using the x and y parameters
	}

	function createFood(){//create the food function when call create a random coordinates for x and y
//create a random number between 0 - 1 then caculate the width in columns because a cell is square of 10*10 pixel so 450/10=45 the canvas have 45 column
//so a random number between 1 - 44 is generated
		var fx = Math.round(Math.random()*(w-cw)/cw);
		var fy = Math.round(Math.random()*(h-cw)/cw);
		if (checkCollision(fx,fy,snake_array)){
		 createFood();
		 console.log("x : " + x + "y : " + y);
	}
	else 
		food = {
			x:fx,//create a random number between 1 - 44 for x coordinate
			y:fy//create a random number between 1 - 44 for y coordinate
		};
		
	}
//collision function check if the head has touch itself
//checkcollision take three arrguments the x, y coordinates and the snake array
	function checkCollision(x,y,array){
		for(i=0;i<array.length;i++){//loop throught the array to get the x and y cooridinates 
			if(array[i].x==x && array[i].y==y)//check if the array x and y values are equal to the arrguments and return a boolean
				return true;
		}
		return false;
	}
//handle the keyboard events 
	$(document).keydown(function(e){

		var key = e.which; //jquery KeyboardEvent.which return charcode of the key press down
//check the keyboard left is press by checking if charcode is 37 and the direction is not right to prevent snake going opposite		
		if(key == "37" && direction != "right"){
			direction = "left"; //change direction variable to left vaule
		}
		else if(key == "38" && direction !="down"){//check charcode is 38 and direction is not opposite direction 
			direction = "up";//change direction variable to up
		}
		else if(key == "39" && direction !="left"){//check charcode is 39 and direction is not opposite
			direction = "right";//change direction variable to right
		}
		else if(key == "40" && direction !="up"){//check charcode is 40 and direction is not opposite
			direction = "down";//change directio variable to down
		}
	})

	
	
	


});
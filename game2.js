var canvas= document.getElementById('canvas');
var snake_array;
var ctx = canvas.getContext('2d');
var h = canvas.height;
var w = canvas.width;
var length = 5;
//draw canvas borders 
	ctx.fillStyle = "white";//set fill 
	ctx.fillRect(0,0,w,h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0,0,w,h);

	function createSnake(){
		snake_array = [];
		for(var i=length-1;i>=0;i--){
			snake_array.push({x:i,y:0});
			console.log(i);

		}

	};
	function paint(){
		for(var i = 0;i<snake_array.length;i++){
			var sx = snake_array[i].x;
			var sy = snake_array[i].y;
			ctx.fillStyle = "blue";//set fill 
			ctx.fillRect(sx*10,sy*10,10,10);
			ctx.strokeStyle = "white";
			ctx.strokeRect(sx*10,sy*10,10,10);
		}
	}
	createSnake();
	paint();
	console.log(snake_array[0].x);
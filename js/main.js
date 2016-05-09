

	 
var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');

canvas.height=400;
canvas.width=540;
$('canvas').css("background-color","white");
var radius=6;
var dragging=false;

context.lineWidth=radius*2;

var putpoint=function (e) {
	if (dragging) {
		context.lineTo(e.offsetX,e.offsetY);
		context.stroke();
		context.beginPath();
	context.arc(e.offsetX,e.offsetY,radius,0,Math.PI*2);
	context.fill();
	context.beginPath();
	context.moveTo(e.offsetX,e.offsetY);
	};
	
}

var engage=function(e) {
	dragging=true;
	
	putpoint(e);	
		
	
}

var disengage=function() {
	dragging=false;
	
	context.beginPath();
   
}

	canvas.addEventListener('mousedown',engage);
canvas.addEventListener('mousemove',putpoint);
canvas.addEventListener('mouseup',disengage);


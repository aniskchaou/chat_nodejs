var minrad=0.5;
var maxrad=100;
var defaultrad=20;
var interval=5;
var radspan=document.getElementById('radval');
var decrad=document.getElementById('decrad');
var incrad=document.getElementById('incrad');
var setRadius=function  (newradius) {
	if (newradius<minrad) {
         newradius=minrad;
 
	}else if (newradius>maxrad) {
       newradius=maxrad;
	}
	radius=newradius;
	context.lineWidth=radius*2;

	radspan.innerHTML=radius;
}



decrad.addEventListener('click',function () {
	setRadius(radius-interval);
});

incrad.addEventListener('click',function () {
	setRadius(radius+interval);
});

setRadius(defaultrad);
// The following variable can be edited
var fps = 10; // The frame rate of the animation, in fps

// DO NOT EDIT THE STUFF BELOW THIS POINT
var frameNumber = -1;
var id = 0;
var divs = document.getElementsByClassName("frame");
function init() {
	window.divzero = divs[0];
	for (var i = 0; i < divs.length; i++) {
		console.log(divs[i].innerHTML.length);
		divs[i].className = "frame hidden";
	}
}
function start() {
	
	id = setInterval(animate, (1000/fps));
	animate()
}
function animate() {
	frameNumber++;
	if (frameNumber < divs.length) {
		for (var i = 0; i < divs.length; i++) {
			divs[i].className = "frame hidden";
		}
		divs[frameNumber].className = "frame visible";
	} else {
		clearInterval(id);
	}
}

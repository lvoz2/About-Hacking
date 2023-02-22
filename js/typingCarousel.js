var TxtRotate = function(id, el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.txt = '';
	this.tick();
	this.id = id;
};
TxtRotate.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];
	if (this.txt.length < fullTxt.length) {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}
	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
	var that = this;
	var delta = 50 - (Math.random() * 20);
	if (this.txt === '') {
		delta = 1000;
	}
	if (!(this.txt === fullTxt)) {
		setTimeout(function() {
			that.tick();
		}, delta);
	} else {
		document.getElementById("textCursor").remove();
	}
}
function animateText(id) {
	var elements = document.getElementById(id).getElementsByClassName('txt-rotate');
	if (elements.length > 0) {
		var toRotate = elements[elements.length - 1].getAttribute('data');
		if (toRotate) {
			new TxtRotate(id, elements[elements.length - 1], JSON.parse(toRotate));
		}
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.id = "textCursor";
	css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
	document.body.appendChild(css);
};
function changePage(id) {
	var pages = document.getElementsByClassName("page");
	for (var i = 0; i < pages.length; i++) {
		pages[i].className = "page hidden";
	}
	document.getElementById(id).className = "page visible";
}
window.transitionSpeed = 500;
var finishedAnimating = new MutationObserver((r, o) => {
	for (var a = 0; a < r.length; a++) {
		if (r[a].type == "childList") {
			if (r[a].removedNodes != []) {
				for (var b = 0; b < r[a].removedNodes.length; b++) {
					if (r[a].removedNodes[b].hasAttribute("id")) {
						if (r[a].removedNodes[b].id == "textCursor") {
							var c = document.getElementsByClassName("cmdCommand");
							var cmd = (c[c.length - 1].getAttribute("data")).slice(14, -9);
							if (cmd == "home") {
								document.title = "Home - About Hacking";
								setTimeout(changePage, transitionSpeed, "home");
							} else if ((cmd == "ethicalImplications") || (cmd == "rolesInComputing") || (cmd == "influencesInComputing") || (cmd == "internetRiskAndMitigation") || (cmd == "aboutLog4Shell") || (cmd == "aboutEternalBlue") || (cmd == "aboutNotPetya") || (cmd == "aboutWannaCry")) {
								getJSONData(cmd);
								setTimeout(changePage, transitionSpeed, "article");
							}
						}
					}
				}
			}
		}
	}
});
function getJSONData (file) {
	if (articles[file]) {
		window.data = articles[file].rawData;
		parseJSONFile()
	} else {
		var e = document.createElement("script");
		e.src = "json/" + file + ".json";
		e.id = "JSONLoad";
		e.onload = (function() { 
			parseJSONFile()
		});
		if (document.getElementById("JSONLoad")) {
			document.getElementById("JSONLoad").remove();
		}
		document.head.appendChild(e);
	}
}
function parseJSONFile() {
	document.title = data.title;
	if (data.type == "article") {
		document.getElementById("articleContent").innerHTML = "";
		renderArticle()
	}
}
var articles = {};
function renderArticle() {
	var nav = document.getElementById("articleNav");
	for (var i = 1; i < nav.children.length; i++) {
		nav.children[i].children[0].classList = "dropbtn";
	}
	document.getElementById(data.navSelect).classList = "dropbtn active";
	if (!(articles[data.name])) {
		articles[data.name] = new Article(data.info, data);
	} 
	articles[data.name].format()
}
function load() {
	window.navBars = document.getElementsByClassName("navBar");
	window.sticky = [navBars[0].offsetTop, navBars[1].offsetTop];
	setTimeout(animateText, transitionSpeed, 'cmdPrompt');
	finishedAnimating.observe(document.getElementsByTagName("body")[0], {childList: true});
}
function addCmdLine(command) {
	var cmd = document.getElementById("cmdPrompt");
	var e = document.createElement("p");
	e.innerHTML = "C:\\Users\\liam.vaughan><span class='txt-rotate cmdCommand' data='" + command +"'></span>";
	cmd.appendChild(e);
	var pages = document.getElementsByClassName("page");
	for (var i = 0; i < pages.length; i++) {
		pages[i].className = "page hidden";
	}
	setTimeout(switchToCmdLine, 1500);
}
function switchToCmdLine() {
	changePage("cmdPrompt");
	setTimeout(animateText, transitionSpeed, 'cmdPrompt');
}
function Article(info, rawData) {
	this.rawData = rawData;
	this.info = info;
	this.innerHTML = "";
	this.tag = document.getElementById("articleContent");
}
Article.prototype.format = function() {
	this.tag.scrollTop = 0;
	var title = document.createElement("h1");
	title.classList = "article-title";
	title.innerText = this.rawData.title.slice(0, -16);
	this.tag.appendChild(title);
	this.tag.appendChild(document.createElement("br"));
	for (var e in this.info) {
		var section = document.createElement("section");
		var heading = document.createElement("h2");
		heading.classList = "article-heading";
		heading.innerText = e;
		section.appendChild(heading);
		section.appendChild(document.createElement("br"));
		for (var i = 0; i < this.info[e].length; i++) {
			var p = document.createElement("p");
			p.classList = "article-p";
			p.innerText = this.info[e][i];
			section.appendChild(p);
			section.appendChild(document.createElement("br"));
		}
		section.appendChild(document.createElement("br"));
		this.tag.appendChild(section);
	}
	document.getElementById("articleLeft").attributes[0].value = this.rawData.shiftCommands[0];
	document.getElementById("articleRight").attributes[0].value = this.rawData.shiftCommands[1];
}
window.addEventListener("scroll", () => {
	if (document.getElementById("article").classList[1] != "visible") {
		if (window.pageYOffset >= sticky[0]) {
			navBars[0].classList.add("sticky")
		} else {
			navBars[0].classList.remove("sticky");
		}
	} else {
		if (window.pageYOffset >= sticky[1]) {
			navBars[1].classList.add("sticky")
		} else {
			navBars[1].classList.remove("sticky");
		}
	}
});
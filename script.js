document.addEventListener('DOMContentLoaded', assignEvents);

function assignEvents() {
	var bars = [];
	var barElems = document.querySelectorAll('.bar_wrapper');

	Array.prototype.forEach.call(barElems, function(elem) {
		bars.push({
			el: elem,
			top: getCoords(elem).top
		});
	})

	window.addEventListener('scroll', stickyBars.bind(null, bars))
}

function stickyBars(bars) {

	bars.forEach(function(elem, i) {
		var elHeight = elem.el.offsetHeight;
		var diff = elem.top - i * elHeight;

		if(windowScroll().top > diff) {
			isFF() ? elem.el.classList.add('nailed-ff') : elem.el.classList.add('nailed');
		} else {
			if(elem.el.classList.contains('nailed') || elem.el.classList.add('nailed-ff')) {
				elem.el.classList.remove('nailed') || elem.el.classList.add('nailed-ff');
			}
		}

	});
}

function windowScroll() {
	return {
		top: window.pageYOffset || document.documentElement.scrollTop,
    	left: window.pageXOffset || document.documentElement.scrollLeft
	}
}

function getCoords(elem) {
	var box = elem.getBoundingClientRect();
	var winY = window.pageYOffset || document.documentElement.scrollTop;
	var winX = window.pageXOffset || document.documentElement.scrollLeft;

	return {
		top: box.top + winY,
		left: box.left + winX
	}
}

function isFF() {
	return navigator.userAgent.match(/firefox/gi);
}

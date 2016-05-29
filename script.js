document.addEventListener('DOMContentLoaded', assignEvents);

function assignEvents() {
	var bars = [];
	var barElems = document.querySelectorAll('.bar');

	Array.prototype.forEach.call(barElems, function(elem) {
		bars.push({
			el: elem,
			top: getCoords(elem).top,
			height: elem.offsetHeight
		});
	})

	document.addEventListener('scroll', stickyBars.bind(null, bars));
	document.addEventListener('touchmove', stickyBars.bind(null, bars));
}

function stickyBars(bars) {

	bars.forEach(function(elem, i) {

		if(windowScroll().top > elem.top) {
			elem.el.classList.add(isFF() ? 'nailed-ff' : 'nailed');
		} else {
			if(elem.el.classList.contains('nailed') || elem.el.classList.contains('nailed-ff')) {
				elem.el.classList.remove('nailed') || elem.el.classList.remove('nailed-ff');
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

	return {
		top: box.top + windowScroll().top,
		left: box.left + windowScroll().left
	}
}

function isFF() {
	return navigator.userAgent.match(/firefox/gi);
}

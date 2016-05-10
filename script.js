document.addEventListener('DOMContentLoaded', assignEvents);

function assignEvents() {
	var bars = [];
	var barElems = document.querySelectorAll('.bar');

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
			elem.el.classList.add('nailed');
		} else {
			if(elem.el.classList.contains('nailed')) {
				elem.el.classList.remove('nailed');
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
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	}
}
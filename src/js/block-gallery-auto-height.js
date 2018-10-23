window.addEventListener('load', function() {
	var elements = document.getElementsByClassName('.has-autoheight-carousel');
	for (var i = 0; i < elements.length; i++) {
		var flkty = Flickity.data(elements[i]);
		flkty.resize();
	}
});
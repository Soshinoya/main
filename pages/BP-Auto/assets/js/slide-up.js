"use strict";

function scrollTo() {
	window.addEventListener("scroll", e => {
		if (window.pageYOffset > 40) {
			document.querySelector(".btn__top-wrapper a").classList.add("slideUp");
			document.querySelector(".btn__top-wrapper a").classList.remove("hide");
		} else {
			document.querySelector(".btn__top-wrapper a").classList.remove("slideUp");
			document.querySelector(".btn__top-wrapper a").classList.add("hide");
		}
	});
}
scrollTo();

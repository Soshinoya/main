$('.car__images-item.all').click(function () {
    $.fancybox.open(
		$('[data-fancybox-group="thumb"]'), {
    		helpers : {
				thumbs : {
					width: 75,
					height: 50
				}
			}
		}
    );
});

$('.car__images-item:not(.car__images-item.all)').fancybox({
	closeBtn  : true,
	arrows    : true,
	nextClick : true,

	helpers : {
		thumbs : {
			width  : 75,
			height : 50
		}
	}
});

// $('.car__images-item').click(function () {
//     $.fancybox.open(
// 		$('[data-fancybox-group="thumb"]'), {
//     		helpers : {
// 				thumbs : {
// 					width: 75,
// 					height: 50
// 				}
// 			},
// 		}
//     );
// });


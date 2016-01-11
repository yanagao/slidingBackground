;
(function() {

var pageIndex = 1,
	pageTotal = $('.page').length,
	towards = { up:1, right:2, down:3, left:4},
	isAnimating = false;
	// nowPage = ".page-" + pageIndex;

var width = window.innerWidth;
if (width <= 320) {
    $("#page_animateImg").css("left", '-4%');
} else if (width > 320) {
    $("#page_animateImg").css("left", '8%');
}
//禁用手机默认的触屏滚动行为
// document.addEventListener('touchmove',function(event) {
// 	event.preventDefault();
// },false);
$(document).on('touchmove',function(event) {
	event.preventDefault();
}, false);

$(document).swipeUp(function() {
	if (isAnimating) return;
	if (pageIndex < pageTotal) {
		pageIndex += 1;
	}else{
		return;
	};
	pageMove(towards.up);
});

$(document).swipeDown(function() {
	if (isAnimating) return;
	if (pageIndex > 1) {
		pageIndex -= 1;
	}else{
		return;
	};
	pageMove(towards.down);
});

function pageMove(tw) {

	var lastPage;

	// 向下翻页
	if(tw == '1') {
		console.log('pageindex' + pageIndex);
		if(pageIndex == 1) {
			console.log('pagetotal' + pageTotal);
			lastPage = ".page-" + pageTotal;
		} else {
			lastPage = ".page-" + (pageIndex - 1);
		}

		if (pageIndex == 1) {
			return;
		}

	} else if(tw == '3') { // 向上翻页
		console.log('pageIndex'+pageIndex);
		
		if(pageIndex == pageTotal) {
			console.log('pageTotal' + pageTotal);
			lastPage = ".page-1";

			// return;
		} else {
			lastPage = ".page-" + (pageIndex + 1);
		}
	}

	var nowPage = ".page-" + pageIndex;

	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");

	$(nowPage).addClass(inClass);
	$(lastPage).addClass(outClass);

	setTimeout(function() {
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find("img").addClass("hide");

		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		// $(nowPage).removeClass("hide");
		$(nowPage).find("img").removeClass("hide");

		isAnimating = false;
	},600);
}

})();

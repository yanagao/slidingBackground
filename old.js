;
(function() {

	var pageIndex = 1,
		pageTotal = $('.page').length,
		towards = { 
			up:1, 
			down:2
		},
		isAnimating = false,
		translate;
	var opt = {
		type: 1
	};

	window.slideBackground = {
        init: function(opt) {
            bindEvent(opt);
        }
    };
	// //禁用手机默认的触屏滚动行为
	// document.addEventListener('touchmove',function(event) {
	// 	event.preventDefault();
	// },false);

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
		var lastPage,
			percent = translate / window.screen.height;
		var nowPage = ".page" + pageIndex;
		// 向下翻页
		if(tw == '1') {
			console.log('pageindex' + pageIndex);
			if(pageIndex == 1) {
				console.log('pagetotal' + pageTotal);
				lastPage = ".page" + pageTotal;
			} else {
				lastPage = ".page" + (pageIndex - 1);
				console.log('lastPage' + lastPage);
			}

			if (pageIndex == 1) {
				return;
			}

		} else if(tw == '2') { // 向上翻页
			console.log('pageIndex2' + pageIndex);
			
			if(pageIndex == pageTotal) {
				console.log('pageTotal' + pageTotal);
				lastPage = ".page1";
				// return;
			} else {
				lastPage = ".page" + (pageIndex + 1);
			}
		}
		switch(tw) {
			case towards.up:
				upSlide();
				// $(nowPage).css('-webkit-transform:' + 'translateY(' + (-translate) + '%);');
				// $(lastPage).css('-webkit-transform:' + 'translateY(' + translate + '%);');
				// outClass = '-webkit-transform:' + 'translateY(' + translate + '%);';
				// inClass = '-webkit-transform:' + 'translateY(' + (-translate) + '%);';
				// console.log(translate);
				break;
			case towards.down:
				// outClass = 'pt-page-moveToBottom';
				// inClass = 'pt-page-moveFromTop';
				downSlide();
				break;
		}
		isAnimating = true;
		$(nowPage).removeClass("hide");
		// $(nowPage).addClass(inClass);
		// $(lastPage).addClass(outClass);

		setTimeout(function() {
			// -webkit-transform: translateY(-100%);
			$(lastPage).removeClass('page-current');
			$(lastPage).removeClass(outClass);
			$(lastPage).addClass("hide");

			$(nowPage).addClass('page-current');
			$(nowPage).removeClass(inClass);

			isAnimating = false;
		},600);
	}

	function upSlide() {
		console.log('xxxxx');
	}

	function downSlide() {

	}
	// var obj = {
	// 	1: {
	// 		toDown: function() {

	// 		},
	// 		toUp: function() {

	// 		}
	// 	}
	// }
	//全局变量，触摸开始位置
	var startY = 0;
	 
	//touchstart事件
	function touchSatrtFunc(evt){
	    try {
	        evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
	        var touch = evt.touches[0]; //获取第一个触点
	        var y = Number(touch.pageY); //页面触点Y坐标
	        //记录触点初始位置
	        startY = y;
	         
	        var text = 'TouchStart事件触发：（' + startY + '）';
	        console.log(text);
	    }
	    catch (e) {
	        alert('touchSatrtFunc：' + e.message);
	    }
	}
	 
	//touchmove事件，这个事件无法获取坐标
	function touchMoveFunc(evt){
		console.log(opt);
	    try {
	        evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
	        var touch = evt.touches[0]; //获取第一个触点
	        var y = Number(touch.pageY); //页面触点Y坐标
	        translate = y - startY;
	        var text = 'TouchMove事件触发：（' + y + '）';
	         
	        //判断滑动方向
	        if (y - startY < 0) { // 下一页
	            text += '<br/>上滑动' + translate;
	            // obj[opt.type].toDown();
	            // if (opt.type === 1) {
	            // 	console.log('11111');
	            // } else if (opt.type === 2) {
	            // 	console.log('2222222');
	            // }
	        }
	         
	        console.log(text);
	    }
	    catch (e) {
	        alert('touchMoveFunc：' + e.message);
	    }
	}

	//touchend事件
	function touchEndFunc(evt){
	    try {
	        evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
	        nChangY = evt.changedTouches[0].pageY;
	        console.log(nChangY);
	    }
	    catch (e) {
	        alert('touchEndFunc：' + e.message);
	    }
	}
	 
	//绑定事件
	function bindEvent(opt){
		console.log(opt);
        $('.page').on({
            'touchstart': touchSatrtFunc,
            'touchmove': touchMoveFunc,
            'touchend': touchEndFunc
        });
	 	// document.addEventListener('touchstart', touchSatrtFunc, false);
	 	// document.addEventListener('touchmove', touchMoveFunc, false);
	 	// document.addEventListener('touchend', touchEndFunc, false);
	}

	

})();

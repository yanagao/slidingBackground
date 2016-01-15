// function bgSlide(object) {
// 	console.log(object);
// }

var bgSlide = {
	init: function() {
		var self = this;
		$ = this.$;
		// this.config.currentNode = 0;
		self.initStyle();
	},
	initStyle: function() {
		var config = this.config;
		var info = this.info;
		console.log(info);
		// obj.height = obj.wrapper.clientHeight;
		// config.offsetHeight = obj.height;
	},
	ontouchmove: function(event, slideData) {
		// 禁用手机默认的触屏滚动行为
		event.preventDefault();
		var config = this.config;
		var pageIndex = 1,
			pageTotal = window.document.body.children.length;
		
		if (config.direction === 1) {  // 滑到下一页
			// 滑到最后一页
			if (pageIndex === pageTotal) {
				return;
			} else {
				pageIndex++;
			}
			
		} else if (config.direction === -1) {  // 滑到上一页
			// 滑到第一页
			if (pageIndex === 1) {
				return;
			} else {
				pageIndex--;
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
	},
	ontouchend: function(event, slideData) {
		var config = this.config;
	}
};
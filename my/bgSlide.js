(function() {
    var opt = {
        type: 1
    };
    window.slideBackground = {
        setting: function(option) {
            $.extend(opt, option);
            init(opt);
        }
    };
    var slideStart = null;
    var percentage = 0;
    var currentPage;
    var anim1 = {
        upSlide: function(percentage, page) {
            // console.log(percentage);
            var translate = 1 - percentage;
            page.next().css('-webkit-transform', 'translate3d(0,' + translate * 100 + '%,0)'); //下一个page向上移动
        },
        downSlide: function(percentage, page) {
            var translate = -percentage;
            page.prev().css('-webkit-transform', 'translate3d(0,' + (translate * 100 - 100) + '%,0)');
            page.css('-webkit-transform', 'translate3d(0,' + translate * 100 + '%,0)'); //当前page向下移动
        },
        prevSlide: function(page) {
            page.prev().css('-webkit-transform', 'scale(1)');
            page.css('-webkit-transform', 'translate3d(0,100%,0)');
        },
        showSlide: function(page) {
            page.css('-webkit-transform', 'scale(1)');
            page.next().css('-webkit-transform', 'translate3d(0,100%,0)');
        },
        nextSlide: function(page) {
            page.css('-webkit-transform', 'translate3d(0,-100%,0)');
            page.next().css('-webkit-transform', 'translate3d(0,0,0)');
        }
    };
    var anim2 = {
        upSlide: function(percentage, page) {
            var translate = 1 - percentage;
            // all 700ms ease
            // page.css('-webkit-transform', 'translate3d(0,' + (translateY * 100 - 100) + '%,0)');
            page.next().css('-webkit-transform', 'translate3d(0,' + translate * 100 + '%,0)');
        },
        downSlide: function(percentage, page) {
            var translate = -percentage;
            page.css('-webkit-transform', 'translate3d(0,' + translate * 100 + '%,0)');
        },
        prevSlide: function(page) {
            page.prev().css('-webkit-transform', 'scale(1)');
            page.css('-webkit-transform', 'translate3d(0,100%,0)');
        },
        showSlide: function(page) {
            page.css('-webkit-transform', 'scale(1)');
            page.next().css('-webkit-transform', 'translate3d(0,100%,0)');
        },
        nextSlide: function(page) {
            page.css('-webkit-transform', 'translate3d(0,0,0)');
            page.next().css('-webkit-transform', 'translate3d(0,0,0)');
        }
    };
    
    function init(opt) {
        $('.page').on({
            'touchstart': touchStart,
            'touchmove': touchMove,
            'touchend': touchEnd
        });
    }

    function touchStart(event) {
        if (event.touches) {
            event = event.touches[0];
        }
        slideStart = event.clientY;
        // console.log(slideStart);

    }

    function touchMove(event) {
        // 禁用手机默认的触屏滚动行为
        event.preventDefault();
        var page = $(event.target).closest('.page');
        if (event.touches) {
            event = event.touches[0];
        }
        percentage = (slideStart - event.clientY) / window.screen.height;

        if (percentage > 0 && opt.type === 1) {
            // 向上拖动
            anim1.upSlide(percentage, page);
        } else if (percentage > 0 && opt.type === 2) {
            anim2.upSlide(percentage, page);

        } else if (page.prev() && opt.type === 1) {
            // 向下拖动
            anim1.downSlide(percentage, page);
        } else if (page.prev() && opt.type === 2) {
            anim2.downSlide(percentage, page);
        }

    }

    function touchEnd(event) {
        slideStart = null;
        var page = $(event.target).closest('.page');
        console.log(percentage);
        if (percentage >= 0.1) {
            nextSlide(page);
        } else if (percentage < 0 && percentage <= -0.1) {
            prevSlide(page);
        } else {
            showSlide(page);
        }
        percentage = 0;

    }

    function showSlide(page) {
        console.log(opt.type);
        if (opt.type === 1) {
            anim1.showSlide(page);
        } else if (opt.type === 2) {
            anim2.showSlide(page);
        }
    }
    
    function nextSlide(page) {
        if (page.next().length) {
            page.attr('state', 'prev');
            page.siblings('.page').removeAttr('state');

            currentPage = page.next();
            currentPage.attr('state', 'next');
            if (opt.type === 1) {
                anim1.nextSlide(page);
            } else if (opt.type === 2) {
                anim2.nextSlide(page);
            }
        } else {
            if (opt.type === 1) {
                anim1.showSlide(page);
            } else if (opt.type === 2) {
                anim2.showSlide(page);
            }
        }
    }

    function prevSlide(page) {
        if (page.prev().length) {

            page.attr('state', 'prev');
            page.siblings('.page').removeAttr('state');
            currentPage = page.prev();
            currentPage.attr('state', 'next');
            if (opt.type === 1) {
                anim1.prevSlide(page);
            } else if (opt.type === 2) {
                anim2.prevSlide(page);
            }
        } else {
            if (opt.type === 1) {
                anim1.showSlide(page);
            } else if (opt.type === 2) {
                anim2.showSlide(page);
            }
        }

    }

})();
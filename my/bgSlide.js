(function() {
    var opt = {
        type: 1,
        useAnimation: true
    };
    window.slideBackground = {
        init: function(option) {
            $.extend(opt, option);
            initDom(opt);
            initEvent(opt);
        }
    };

    var obj = {
        1: {
            upSlide: function(percentage, page) {
                console.log(percentage);
                var translateY = 1 - percentage;
                page.next().css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)'); //下一个page向上移动
            },
            downSlide: function(percentage, page) {
                var translateY = -percentage;
                page.prev().css('-webkit-transform', 'translate3d(0,' + (translateY * 100 - 100) + '%,0)');
                page.css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)'); //当前page向下移动
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
        },
        2: {
            upSlide: function(percentage, page) {
                var translateY = 1 - percentage;
                // all 700ms ease
                // page.css('-webkit-transform', 'translate3d(0,' + (translateY * 100 - 100) + '%,0)');
                page.next().css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)');
            },
            downSlide: function(percentage, page) {
                var translateY = -percentage;
                // page.prev().css('-webkit-transition-delay', '0s');
                // page.prev().css('-webkit-transform', 'translate3d(0,' + (translateY * 100 - 100) + '%,0)');
                page.css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)');
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
        },
        3: {
            upSlide: function(percentage, page) {
                console.log(percentage);
                var translateY = 1 - percentage;
                page.next().css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)'); //下一个page向上移动
            },
            downSlide: function(percentage, page) {
                var translateY = -percentage;
                page.prev().css('-webkit-transform', 'translate3d(0,' + (translateY * 100 - 100) + '%,0)');
                page.css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)'); //当前page向下移动
            },
            nextSlide: function(page) {
                page.css('-webkit-transform', 'translate3d(0,-100%,0)');
                page.next().css('-webkit-transform', 'translate3d(0,0,0)');
            },
            prevSlide: function(page) {
                page.prev().css('-webkit-transform', 'scale(1)');
                page.css('-webkit-transform', 'translate3d(0,100%,0)');
            },
            showSlide: function(page) {
                page.css('-webkit-transform', 'scale(1)');
                page.next().css('-webkit-transform', 'translate3d(0,100%,0)');
            }
        },
        4: {
            upSlide: function(percentage, page) {
                var translateY = 1 - 0.4 * percentage;
                page.css('-webkit-transform', 'translate3d(0,' + (translateY * 100 - 100) + '%,0)');
                page.next().css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)');
            },
            downSlide: function(percentage, page) {
                var translateY = -(0.4 * percentage);
                page.prev().css('-webkit-transform', 'translate3d(0,' + (translateY * 100 - 100) + '%,0)');
                page.css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)');
            },
            nextSlide: function(page) {
                page.addClass('zindex');
                setTimeout(function() {
                    page.removeClass('no-animation').css('-webkit-transform', 'translate3d(0,-100%,0)');
                    page.next().removeClass('zindex').addClass('no-animation').css('-webkit-transform', 'translate3d(0,0,0)');
                }, 100);
            },
            prevSlide: function(page) {

                page.prev().css('-webkit-transform', 'translate3d(0,0,0)');
                page.next().css('-webkit-transform', 'translate3d(0,100%,0)');
                page.removeClass('zindex');
            },
            showSlide: function(page) {
                page.css('-webkit-transform', 'scale(1)');
                page.next().css('-webkit-transform', 'translate3d(0,100%,0)');
            }
        }
    };
    var slideStart = null;
    var percentage = 0;
    var currentPage;

    function touchStart(event) {
        var page = $(event.target).closest('.page');
        // console.log(page);
        if (event.touches) {
            event = event.touches[0];
        }
        slideStart = event.clientY;
        console.log(slideStart);

    }

    function touchMove(event) {
        // 禁用手机默认的触屏滚动行为
        event.preventDefault();
        var page = $(event.target).closest('.page');
        if (event.touches) {
            event = event.touches[0];
        }
        percentage = (slideStart - event.clientY) / window.screen.height;

        if (percentage > 0) {
            // 向上拖动
            var scale = 1 - 0.5 * percentage;
            obj[opt.type].upSlide(percentage, page);

        } else if (page.prev()) {
            //向下拖动
            obj[opt.type].downSlide(percentage, page);
        }

    }

    function touchEnd(event) {
        slideStart = null;
        var page = $(event.target).closest('.page');
        page.removeClass('no-animation');
        page.next().removeClass('no-animation');
        page.prev().removeClass('no-animation');

        if (percentage >= 0.1) {
            nextSlide(page);
        } else if (Math.abs(percentage) >= 0.1) {
            prevSlide(page);
        } else {
            showSlide(page);
        }
        percentage = 0;

    }

    function swipeUp(event) {
        var page = $(event.target).closest('.page');
        if (!page.length) {
            return;
        }
        nextSlide(page);
    }

    function swipeDown(event) {
        var page = $(event.target).closest('.page');
        if (!page.length) {
            return;
        }
        prevSlide(page);
    }

    function nextSlide(page) {
        if (page.next().length) {
            page.attr('state', 'prev');
            page.siblings('.page').removeAttr('state');

            currentPage = page.next();
            currentPage.attr('state', 'next');

            obj[opt.type].nextSlide(page);
        } else {
            obj[opt.type].showSlide(page);
        }
    }

    function prevSlide(page) {
        if (page.prev().length) {

            page.attr('state', 'prev');
            page.siblings('.page').removeAttr('state');
            currentPage = page.prev();
            currentPage.attr('state', 'next');
            obj[opt.type].prevSlide(page);
        } else {
            obj[opt.type].showSlide(page);
        }

    }

    function showSlide(page) {
        obj[opt.type].showSlide(page);
    }

    function initDom(opt) {
        $('body').addClass('slideBackground');
        currentPage = $('.page').first();
        currentPage.attr('state', 'next');
        if (opt.useAnimation) {
            var pages = $('.page');
            pages.find('.part').addClass('hide');
        }
    }

    function initEvent(opt) {
        $('.page').on({
            'touchstart': touchStart,
            'touchmove': touchMove,
            'touchend': touchEnd,
            'touchcancel': touchEnd
        });
    }

})();
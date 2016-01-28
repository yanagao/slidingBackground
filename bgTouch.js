var bgTouch = (function($) {
	var info = {
        wrapper: window.document.body
    };
    var config = {
        direction: 0 // direction
    };
    // console.log(config);
    var init = function(info) {

    };
    var getDirection = function(distance) {
        if (distance > 0) {
            config.direction = -1;
        } else if (distance < 0) {
            config.direction = 1;
        } else {
            config.direction = 0;
        }
    };
    var touchEvent = function(obj) {
    	var slideData = {
    		startPoint: null,
    		movePoint: null,
    		distance: 0
    	};
        $.on('touchstart', function(e) {
            slideData.startPoint = e.touches[0];
            obj.ontouchstart && obj.ontouchstart(e, slideData);
            info.ontouchstart && info.ontouchstart();
        });

        $.on('touchmove', function(e) {
            slideData.movePoint = e.touches[0];
    	    slideData.distance = slideData.movePoint.pageY - slideData.startPoint.pageY;
            getDirection(slideData.distance);
            obj.ontouchmove && obj.ontouchmove(e, slideData);
            info.ontouchmove && info.ontouchmove();
        });

        $.on('touchend', function(e) {

        });
    };

    return bgTouch;
});
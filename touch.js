var bgTouchUtils = (function(){

    var utils = {};
    try {
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        utils.on = function(object, event, callback) {
            object.addEventListener(event, function(ev) {
                (callback)(ev);
            }, false);
        };

        utils.css = function(object, styleList) {
            var cssText = '';
            for (cssStyle in styleList) {
                if (object) {
                    for (key in vendors) {
                        cssText += '-' + vendors[key] + '-' + cssStyle + ':' + styleList[cssStyle] + ';';
                    }
                    cssText += cssStyle + ':' + styleList[cssStyle] + ':';
                }
            }
            object.style.cssText = cssText;
        };
    }
    catch (e) {

    }
    return utils;
}());

var bgTouch = (function($win, $) {
    var opt = {
        wrapper: $win.document.body
    };

    var config = {
        direction: 0,
        currentDelta: 0
    };

    var init = function(option) {
        for (key in option) {
            opt[key] = option[key];
        }
    };
    var register = function(object) {
        var pluginArr = object.split(',');
        for (var i = 0; i < pluginArr.length; i++) {
            if (typeof $win[pluginArr[i]] === 'object') {
                var obj = $win[pluginArr[i]];
                obj.opt = opt;
                obj.config = config;
                obj.$ = $;
                eventHandler(obj);
                obj.init();
            }
        }
    };

    var getDirection = function(distance) {
        if (distance > 0) {
            config.direction = -1;
        }
        else if (distance < 0) {
            config.direction = 1;
        }
        else {
            config.direction = 0;
        }

        if (config.direction === -1) {
            return false;
        }
        return true;
    };

    var eventHandler = function(obj) {
        var custVar = {
            startPos: null,     
            movePos: null,        
            distance: 0
        };
        $.on(opt.wrapper, 'touchstart', function(ev) {
            custVar.startPos = ev.touches[0];
            obj.ontouchstart && obj.ontouchstart(ev, custVar);
            opt.ontouchstart && opt.ontouchstart();
        });

        $.on(opt.wrapper, 'touchmove', function(ev) {
            custVar.movePos = ev.touches[0];
            custVar.distance = custVar.movePos.pageY - custVar.startPos.pageY;
            // console.log(custVar.startPos.pageY + 'hhhhhhhhhhhhhhhh' + custVar.movePos.pageY);

            getDirection(custVar.distance);   
            config.currentDelta += custVar.distance;
            obj.ontouchmove && obj.ontouchmove(ev, custVar);
            custVar.startPos = custVar.movePos;
        });

        $.on(opt.wrapper, 'touchend', function(ev) {
            obj.ontouchend && obj.ontouchend(ev, custVar);
            opt.ontouchend && opt.ontouchend();
        });
    };

    var bgTouch = {
        opt: opt,
        init: init,
        register: register
    };

    return bgTouch;
// });
}(window, bgTouchUtils));
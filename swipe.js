var bgSwipe = {
    touchEndDistance: 0,
    init: function() {
        var self = this;
        $ = this.$;
        this.config.currentNode = 0;
        self.initStyle();
        $.css(this.opt.wrapper, {'transform':  'translate3d(0, 0, 0)', 'transition': '0'});
    },
    initStyle: function() {
        var cf = this.config;
        var op = this.opt;
        cf.childrenNode = opt.wrapper.children;
        cf.childrenLength = opt.wrapper.children.length;
        cf.domWidth = op.wrapper.clientWidth;
        cf.domHeight = op.wrapper.clientHeight;
        this.swipeThreshold =  cf.domHeight / 9;
        this.bouncingThreshold = cf.domHeight / 5;
        for (var i = 0; i < cf.childrenLength; i++) {
            cf.childrenNode[i].style.cssText = 'position:absolute;height: ' + cf.domHeight + 'px;width:' + cf.domWidth + 'px;top: ' + (cf.domHeight * i) + 'px;';
        }
    },
    ontouchmove: function(ev, custVar) {
        ev.preventDefault();
        var baseLength = 0;
        var cf = this.config;
        if (cf.direction === -1) {
            baseLength = cf.currentNode * cf.domHeight + (-1) * cf.direction * this.bouncingThreshold;
        } else if (cf.direction === 1) {
            baseLength = -1 * (cf.currentNode * cf.domHeight + this.bouncingThreshold);
        }

        if (cf.currentNode === 0 && cf.currentDelta >= baseLength && cf.direction === -1) {
            cf.currentDelta = baseLength;
            
        } else if (cf.currentNode === cf.childrenLength - 1 && cf.currentDelta <=  baseLength  && cf.direction === 1) {
            cf.currentDelta =  baseLength;
        }

        this.touchEndDistance = cf.currentDelta;
        var transform = 'translate3d(0, ' + cf.currentDelta + 'px, 0)';
        $.css(this.opt.wrapper, {'transform': transform});
    },
    ontouchend: function(ev, custVar) {
        var cf = this.config;
        var touchEndDistanceABS = Math.abs(this.touchEndDistance);
        var baseLength = cf.currentNode * cf.domHeight + cf.direction * this.swipeThreshold;

        if (cf.currentNode !== 0 && cf.direction === -1 && touchEndDistanceABS <= baseLength) {
            this.slide(-1);
        } else if (cf.currentNode !== cf.childrenLength - 1 && cf.direction === 1 && touchEndDistanceABS >= baseLength) {
            this.slide(1);
        } else {
            this.slide(0);
        }
    },
    slide: function(num) {
        var cf = this.config;
        var option = this.opt;
        cf.currentNode += num;
        cf.currentDelta = -1 * cf.currentNode * cf.domHeight;
        var transform = 'translate3d(0, ' + cf.currentDelta + 'px, 0)';
        $.css(option.wrapper,
        {
            'transform': transform,
            'transition': '0.5s'
        });
        cf.touchEndDistance = 0;
    }
};
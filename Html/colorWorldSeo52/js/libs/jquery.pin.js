/**
 *  jquery 钉子插件，用于把某个元素固定;
 */

"use strict";

define(function(require, exports, module) {

    $.fn.pin = function(options, fun1, fun2) {

        var _this = $(this);
        var scrollY = 0,
            elements = [],
            disabled = false,
            $window = $(window);

        options = options || {};

        var recalculateLimits = function() {
            for (var i = 0, len = elements.length; i < len; i++) {
                var $this = elements[i];

                if (options.minWidth && $window.width() <= options.minWidth) {
                    if ($this.parent().is(".pin-wrapper")) {
                        $this.unwrap();
                    }
                    $this.css({
                        width: "",
                        left: "",
                        top: "",
                        position: ""
                    });
                    if (options.activeClass) {
                        $this.removeClass(options.activeClass);
                    }
                    disabled = true;
                    continue;
                } else {
                    disabled = false;
                }

                var $container = options.containerSelector ? $this.closest(options.containerSelector) : $(document.body);
                var offset = $this.offset();
                var containerOffset = $container.offset();
                var parentOffset = $this.offsetParent().offset();

                if (!$this.parent().is(".pin-wrapper")) {
                    $this.wrap("<div class='pin-wrapper'>");
                }

                var pad = $.extend({
                    top: 0,
                    bottom: 0
                }, options.padding || {});

                $this.data("pin", {
                    pad: pad,
                    from: (options.containerSelector ? containerOffset.top : offset.top) - pad.top,
                    to: containerOffset.top + $container.height() - $this.height() - pad.bottom,
                    end: containerOffset.top + $container.height(),
                    parentTop: parentOffset.top
                });

                $this.css({
                    width: $this.parent().width(),
                    left : '0' ,
                    marginLeft: 0
                });
                $this.parent().css("height", $this.height());

            }
        };

        var onScroll = function() {

            if (disabled) {
                return;
            }

            scrollY = $window.scrollTop();


            var elmts = [];
            for (var i = 0, len = elements.length; i < len; i++) {
                var $this = $(elements[i]),
                    data = $this.data("pin");

                if (!data) { // Removed element
                    continue;
                }

                elmts.push($this);

                var from = data.from - data.pad.bottom,
                    to = data.to - data.pad.top;

                if (from + $this.outerHeight() > data.end) {
                    $this.css('position', '');
                    continue;
                }

                if (from < scrollY) {

                    !($this.css("position") == "fixed") && $this.css({
                        left: '50%',
                        marginLeft: -($this.parent().width()/2),
                        top: data.pad.top
                    }).css("position", "fixed");

                    fun1(_this);
                    if (options.activeClass) {
                        $this.addClass(options.activeClass);
                    }
                }

                //   if (from < scrollY && to > scrollY) {
                //      !($this.css("position") == "fixed") && $this.css({
                //          left: $this.offset().left,
                //          top: data.pad.top
                //      }).css("position", "fixed");
                //      fun1(_this);
                //       if (options.activeClass) { $this.addClass(options.activeClass); }
                //    }

                //    else if (scrollY >= to) {
                //       $this.css({
                //          left: "",
                //          top: to - data.parentTop + data.pad.top
                //      }).css("position", "absolute");
                //      if (options.activeClass) { $this.addClass(options.activeClass); }
                //   }
                else {
                    $this.css({
                        position: "",
                        top: "",
                        left: "",
                        marginLeft:""
                    });
                    fun2(_this);
                    if (options.activeClass) {
                        $this.removeClass(options.activeClass);
                    }
                }
            }

            elements = elmts;
        };


        var update = function() {
            recalculateLimits();
            onScroll();
        };

        this.each(function() {
            var $this = $(this),
                data = $(this).data('pin') || {};

            if (data && data.update) {
                return;
            }
            elements.push($this);
            $("img", this).one("load", recalculateLimits);
            data.update = update;
            $(this).data('pin', data);
        });

        $window.scroll(onScroll);

        document.addEventListener('touchstart',onScroll,false);
        document.addEventListener('touchmove',onScroll,false);
        document.addEventListener('touchend',onScroll,false);

        $window.resize(function() {
            window.setTimeout(function() {
                recalculateLimits();
            }, 300);
        });

        recalculateLimits();
        $window.load(update);

        return this;
    };

    module.exports = $.fn; //直接把整个模块对象导出;
})
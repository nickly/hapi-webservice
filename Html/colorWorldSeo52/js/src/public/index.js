/**=============================================================
 *                                                         公共js代码
 * =============================================================
 */
"use strict";

define(function(require, exports, module) {

    require('jquery');

    /** jquery.pin插件; */
    require('jquery.pin');
    /** transform插件; */
    require('transform');
    /** 触摸插件; */
    require('alloy_finger');
    /** to 插件; */
    require('to');
    /** ICalendar日历插件; */
    require('lCalendar');
    /** 加载String扩展 */
    require('String');

    var object = {};
    object.clearInterval;

    /**
     *   缓冲方法;
     *   @param： （number）
     */
    object.easeEvent = function (x) {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    }


    /**
     *   路珠滚动方法;
     *   @param：（路珠表格父对象）
     *   @param：（路珠滚动的速度）
     *   @param：（是否滚动到最右方）
     */
    object.swiperForTable = function (luZhuObject, speed, isGoToRight) {

        if (luZhuObject == undefined || speed == null) {
            return;
        }

        if (speed == undefined) {
            speed = 600;
        }

        if (isGoToRight == undefined) {
            isGoToRight = true;
        }

        var tableObject = luZhuObject.find('table');
        var tableElement = luZhuObject.find('table')[0];
        var luZhuElement = luZhuObject[0];

        var startX = 0;
        var endX = 0;
        var differenceX = 0;
        var move = 0;

        /** 定义最大最小边界 */
        var maximumRange = -(luZhuObject.find('table tr').width() - luZhuObject.width());
        var minimumRange = 0;

        /** 调用transform插件 */
        Transform(tableElement);

        if (isGoToRight) {
            /**  让表格滚动到右侧 */
            new To(tableElement, "translateX", maximumRange, 0, object.easeEvent, function () {
            });

            /**  记录表格滚动距离 */
            luZhuObject.find('table').attr('move', maximumRange);
        } else {
            /**  记录表格滚动距离 */
            luZhuObject.find('table').attr('move', minimumRange);
        }

        /** 调用alloy_finger插件 */
        new AlloyFinger(luZhuElement, {
            touchStart: function (evt) {
                luZhuElement.addEventListener('touchMove', function () {
                    object.preDef(evt);
                })
                startX = evt.touches[0].clientX;
            },
            touchMove: function (evt) {
                if (Math.abs(evt.deltaX) >= Math.abs(evt.deltaY)) {
                    object.preDef(evt);
                }
            },
            touchEnd: function (evt) {

                endX = evt.changedTouches[0].clientX;
                differenceX = endX - startX;

                luZhuElement.removeEventListener('touchMove', object.preDef);
            },
            swipe: function (evt) {

                /** 叠加上次移动的距离 */
                move = parseInt(tableObject.attr('move'));
                differenceX = differenceX + move;

                /**  限制路珠不能滚动出边界  */
                if (differenceX > minimumRange) {
                    new To(tableElement, "translateX", minimumRange, speed, object.easeEvent, function () {
                        tableObject.attr('move', minimumRange);
                    });
                } else if (differenceX < maximumRange) {
                    new To(tableElement, "translateX", maximumRange, speed, object.easeEvent, function () {
                        tableObject.attr('move', maximumRange);
                    });
                } else {
                    new To(tableElement, "translateX", differenceX, speed, object.easeEvent, function () {
                        tableObject.attr('move', differenceX);
                    });
                }
            }
        })
    }


    /**
     *  滑动方法;
     *  @param1: 滑动对象，非jq对象而是dom对象（dom object）;
     *  @param2: 滑块的宽度 (number);
     *  @param3: 缓冲方法 (function);
     *  @param4: 方向 (string)
     */
    object.swiperFun = function (swipeScrollObject, liWidth, easeEvent, direction, time) {

        if (direction == 'left') {
            new To(swipeScrollObject, "translateX", -liWidth, time, easeEvent, function () {
                var tempObject = $(swipeScrollObject).find('li:first-child');
                $(swipeScrollObject).append(tempObject);
                new To(swipeScrollObject, "translateX", 0, 0, easeEvent, function () {
                });
            });
        } else {
            new To(swipeScrollObject, "translateX", -liWidth, 0, easeEvent, function () {
            });
            var tempObject = $(swipeScrollObject).find('li:last-child');
            $(swipeScrollObject).prepend(tempObject);
            new To(swipeScrollObject, "translateX", 0, time, easeEvent, function () {
            });
        }
    }


    /**
     *  阻止浏览器默认行为方法;
     *  @param:  事件对象 (Object)
     */
    object.preDef = function (e) {

        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            window.event.returnValue = false;
        }
    };

    /**
     *  清除轮播图动画方法;
     */
    object.clearSwiperAnimate = function () {
        window.clearInterval(object.clearInterval);
    }

    /**
     *   轮播图自适应屏幕宽度方法;
     *   @param：轮播图对象（Object）
     */
    object.adaptationWidth = function (swipeScroll) {

        if (swipeScroll == undefined) {
            return;
        }

        var liNum = swipeScroll.find('li').length;

        /** 固定轮播图Ul和li的宽度 */
        swipeScroll.css({'width': (liNum * 100) + '%'});
        swipeScroll.find('li').css({'width': (100 / liNum) + "%"});
    }

    /**
     *   轮播图方法;
     *   @param：轮播图对象 （object）
     *   @param:：轮播的时间 （number）
     *   @param：轮播的速度 （number）
     */
    object.initSwiper = function (swipeScroll, time, speed) {

        if (swipeScroll == undefined) {
            return;
        }
        /** 默认滚动时间间隔 */
        if (time == null) {
            time = 3000
        }
        /** 默认滚动速度 */
        if (speed == null) {
            speed = 300;
        }

        var swipeElement = swipeScroll[0];

        /**  适配屏幕宽度 */
        object.adaptationWidth(swipeScroll);

        object.clearInterval = setInterval(function () {
            /**  滑动方法 */
            object.swiperFun(swipeElement, swipeScroll.parent().width(), object.easeEvent, 'left', speed);
        }, time);

        /** 调用transform插件 */
        Transform(swipeElement);

        /** 调用alloy_finger插件 */
        new AlloyFinger(swipeElement, {
            touchStart: function (evt) {
                swipeElement.addEventListener('touchMove', function () {
                    object.preDef(evt);
                })
            },
            touchMove: function (evt) {
                if (Math.abs(evt.deltaX) >= Math.abs(evt.deltaY)) {
                    object.preDef(evt);
                }
            },
            touchEnd: function () {
                swipeElement.removeEventListener('touchMove', object.preDef);
            },
            swipe: function (evt) {

                var swiperParentWidth = swipeScroll.parent().outerWidth()

                if (evt.direction === "Left") {
                    /**  滑动方法 */
                    object.swiperFun(swipeElement, swiperParentWidth, object.easeEvent, 'left', speed);
                } else if (evt.direction === "Right") {
                    /**  滑动方法 */
                    object.swiperFun(swipeElement, swiperParentWidth, object.easeEvent, 'right', speed);
                }
            }
        });
    }


    /**
     *   导航选项栏滑动方法;
     *   @param：导航栏对象（Object）
     *   @param：导航滑动速度
     */
    object.initHeaderSwiper = function (swiperSelect, speed) {

        if (swiperSelect == undefined && swiperSelect.find('td').length == 0) {
            return;
        }
        /**  滑动速度的默认值 */
        if (speed == null) {
            speed = 300;
        }

        var tableObject = swiperSelect.find('table');
        var tableElement = swiperSelect.find('table')[0];
        var swiperElemt = swiperSelect[0];

        var startX = 0;
        var endX = 0;
        var differenceX = 0;
        var move = 0;

        /** 定义最大最小边界 */
        var maximumRange = -(swiperSelect.find('table tr').width() - swiperSelect.width());
        var minimumRange = 0;


        /** 记录滚动的距离 */
        tableObject.attr('move', 0);

        /** 调用transform插件 */
        Transform(tableElement);

        /** 调用alloy_finger插件 */
        new AlloyFinger(swiperElemt, {

            touchStart: function (evt) {
                swiperElemt.addEventListener('touchMove', function () {
                    object.preDef(evt);
                })
                startX = evt.touches[0].clientX;
            },
            touchMove: function (evt) {
                if (Math.abs(evt.deltaX) >= Math.abs(evt.deltaY)) {
                    object.preDef(evt);
                }
            },
            touchEnd: function (evt) {
                endX = evt.changedTouches[0].clientX;
                differenceX = endX - startX;
                swiperElemt.removeEventListener('touchMove', object.preDef);
            },
            swipe: function (evt) {

                move = parseInt(tableObject.attr('move'));
                differenceX = differenceX + move;

                /** 限制滚动不能超出边界 */
                if (differenceX > minimumRange) {
                    new To(tableElement, "translateX", 0, speed, object.easeEvent, function () {
                        tableObject.attr('move', differenceX);
                    });
                } else if (differenceX < maximumRange) {
                    new To(tableElement, "translateX", maximumRange, speed, object.easeEvent, function () {
                        tableObject.attr('move', differenceX);
                    });
                } else {
                    new To(tableElement, "translateX", differenceX, speed, object.easeEvent, function () {
                        tableObject.attr('move', differenceX);
                    });
                }

            }
        });

    }

    /**
     *  返回上一页方法;
     *  @param: 返回按钮对象(Object);
     */
    object.returnBack = function (returnBtn) {

        if (returnBtn == undefined) {
            return;
        }

        returnBtn.click(function () {
            window.location.href = '/index'
        })

    }


    /**
     *  创建并且显示遮罩层方法;
     *  @param：遮罩层父容器对象;
     */
    object.createMaskLayer = function (container) {

        if (container == undefined) {
            return;
        }

        container.append('<div class="app_public_maskLayer"></div>');
        $('.app_public_maskLayer').fadeIn(300);
        $('body').addClass('app_cannotScroll');
    }


    /**
     *  删除遮罩层方法;
     *  @param：遮罩层对象;
     */
    object.deleteMaskLayer = function (maskLayer) {

        if (maskLayer == undefined) {
            return;
        }

        maskLayer.fadeOut(300);
        window.setTimeout(function () {
            maskLayer.remove();
            $('body').removeClass('app_cannotScroll');
        }, 310)
    }


    /**
     *  点开导航更多选项方法;
     * @param：导航更多按钮对象 (Object)
     */
    object.openSelectMore = function (selectMoreButton) {

        if (selectMoreButton == undefined) {
            return;
        }

        selectMoreButton.click(function () {
            if ($(this).hasClass('active')) {
                $("#header_selectList").fadeOut(300);
                $(this).removeClass('active');
                object.deleteMaskLayer($('.app_public_maskLayer'));

                $('#app_selectBlockNav').show();

            } else {
                $("#header_selectList").fadeIn(300);
                $(this).addClass('active');
                object.createMaskLayer($('.container'));

                $('#app_selectBlockNav').hide();
                $('#app_selectBlockNav  .app_selectBlockNav_lis').removeClass('app_selectBlockNav_active');
                $('.app_selectBlockNavCons ul').hide();
                $('.app_selectBlockNavCons').hide();

                /**  查找导航栏那个选项是被选中的 */
                $('#app_swiperSelect td').each(function (index, item) {
                    if ($(item).hasClass('active')) {
                        $('#header_selectList li').eq(index).addClass('active');
                    }
                    ;
                })
            }
        })

    }


    /**
     *   添加loading方法;
     *   @param ： loading对象 ( Object );
     */
    object.createLoading = function (loadingObject) {

        if (loadingObject == undefined) {
            return;
        }

        var loadingString = '<div class="loader-section">';
        loadingString += '<div class="loader-container">';
        loadingString += '<div class="loader-inner ball-triangle-path"><div></div><div></div><div></div></div>';
        loadingString += '<div class="loader-font">正在加载中...</div></div></div>';

        loadingObject.html(loadingString);
    };


    /**
     *
     * 删除loading方法;
     * @param：loading对象 ( Object );
     */
    object.deleteLoading = function (loadingObject) {

        if (loadingObject == undefined) {
            return;
        }

        loadingObject.animate({'opacity': 0}, 600, function () {
            loadingObject.remove();
        });
    }


    /**
     *   头部固定方法;
     *   @param1 ： 固定在头部得对象名称 ( String );
     *   @param2： 固定在头部得对象的父级名称 （String）;
     *   @callback1：头部固定在顶部时候的回调;
     *   @callback2：头部恢复到顶部时候得回调;
     */
    object.scrollerHeader = function (pinnedString, containerString) {

        if (pinnedString == '' || pinnedString == undefined || containerString == '' || containerString == undefined) {
            return;
        }

        $("." + pinnedString).pin({
            containerSelector: ".container"
        }, function (e) {
        }, function (e) {
        });
    }

    /**
     * 隐藏方法;
     * @param：隐藏对象 (Object)
     */
    object.hideLotteryTime = function (object) {

        if (object == undefined) {
            return;
        }

        object.css({'visibility': 'hidden'});
    }

    /**
     * 显示方法;
     * @param：显示对象 (Object)
     */
    object.showLotteryTime = function (object) {

        if (object == undefined) {
            return;
        }

        object.removeAttr('style');
    }

    /**
     *  切换二级菜单选项方法;
     *  @param：Object;
     */
    object.chooseTwoLevelMenu = function (selectBlockNav) {

        if (selectBlockNav == undefined) {
            return;
        }

        selectBlockNav.find('.app_selectBlockNav_lis').click(function () {

            var index = $(this).index();

            if ($(this).hasClass('app_selectBlockNav_active')) {

                $(this).removeClass('app_selectBlockNav_active');
                $('.app_selectBlockNavCons').find('ul').eq(index).hide();
                $('.app_selectBlockNavCons').fadeOut(300);
                object.deleteMaskLayer($('.app_public_maskLayer'));

            } else {

                selectBlockNav.find('.app_selectBlockNav_lis').removeClass('app_selectBlockNav_active');
                $('.app_selectBlockNavCons').find('ul').hide();
                object.deleteMaskLayer($('.app_public_maskLayer'));

                $(this).addClass('app_selectBlockNav_active');
                $('.app_selectBlockNavCons').find('ul').eq(index).show();
                $('.app_selectBlockNavCons').fadeIn(300);
                object.createMaskLayer($('.container'));
            }

        })
    }


    /**
     * 头部功能区---选择彩种
     * @param lotteryObject
     */
    object.chooseLottery = function (lotteryObject) {

        if (lotteryObject == undefined) {
            return;
        }

        lotteryObject.click(function () {

            if ($(this).hasClass('active')) {
                $(".header_allName").hide();
                $(".app_public_maskLayer").fadeOut(300);
                $(this).removeClass('active');
                object.deleteMaskLayer($('.app_public_maskLayer'));

                /**  显示导航和开奖时间栏 */
                $(".header_info").show();
                $(".header_select").show();
                $('#app_selectBlockNav').show();

            } else {
                $(".header_allName").show();
                $(".app_public_maskLayer").fadeIn(300);
                $(this).addClass('active');
                object.createMaskLayer($('.container'));

                /**  隐藏导航和开奖时间栏 */
                $(".header_info").hide();
                $(".header_select").hide();
                $('#app_selectBlockNav').hide();
                $('#header_selectList').hide();
                $('#selectMoreButton').removeClass('active');
            }
        });

    };


    /**
     * 历史开奖---显示条件筛选
     * @param filterObject
     */
    object.tableFilter = function (filterObject) {
        filterObject.toggle(function () {
            $(this).addClass("active");
            $(".app_table_requirement").show();
            $(this).find(".table_requirement").css("display", "block");
        }, function () {
            $(this).removeClass("active");
            $(".app_table_requirement").hide();
            $(this).find(".table_requirement").css("display", "none");
        });
    };

    /**
     * 头部功能区---点击显示帮助提示
     * @param helpObject
     */
    object.headerHelp = function (helpObject) {

        if (helpObject == undefined) {
            return;
        }
        helpObject.click(function () {
            $(".app_public_helpBlock").show();
        });
    };

    /**
     * 头部功能区---点击隐藏帮助提示
     * @param helpCloseObject
     */
    object.headerHelpClose = function (helpCloseObject) {
        if (helpCloseObject == undefined) {
            return;
        }
        helpCloseObject.click(function () {
            $(".app_public_helpBlock").hide();
        });
    };

    /**
     * 头部功能区---点击显示设置
     * @param setObject
     */
    object.headerSet = function (setObject) {
        if (setObject == undefined) {
            return;
        }
        setObject.click(function () {
            $(".app_public_setBlock").show();
        });
    };

    /**
     * 头部功能区---点击隐藏设置
     * @param setCloseObject
     */
    object.headerSetClose = function (setCloseObject) {
        if (setCloseObject == undefined) {
            return;
        }
        setCloseObject.click(function () {
            $(".app_public_setBlock").hide();
        });
    };


    /**
     * 头部功能区---选择时间
     * @param： 日期按钮对象 （String）
     */
    object.createDateWindow = function (dateButton) {

        if (dateButton == undefined) {
            return;
        }

        /**  调用日期插件 */
        var calendar = new lCalendar();
        calendar.init({
            'trigger': '#' + dateButton.attr('id'),
            'type': 'date'
        });
        dateButton.bind('input', function () {
            $(this).val($(this).val().DateFormat('MM/dd'));
        })
    };

    /**
     *   导航倒计时方法;
     *   @param：时间倒计对象;
     *   @param： 时间数;
     *   @param：当倒计完的回调函数;
     */
    object.countdownTime = function (headerTextObject, timeNumber, callBack) {

        var time = timeNumber / 1000;

        window.setInterval(function () {
            if (time <= 0) {
                headerTextObject.html('正在开奖');
                callBack();
            } else {
                time--;
            }
            headerTextObject.html(('' + time).SecondsTommss());
        }, 1000);
    }
    module.exports = object;
})
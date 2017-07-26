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
    /** 加载Iscroll插件 */
    require('Iscroll');

    /** 加载Date扩展 */
    require('Date');
    var Event = require('Event');
    var object = {};
    object.clearInterval;


    /**
     *   缓冲方法;
     *   @param： （number）
     */
    object.easeEvent = function(x) {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    }


    /**
     *   上下滑动事件，用于路珠页面;
     */
    object.swiperForDoument = function() {

       var headerHeight = $('header').height();
       $(".wrapper").css({'position':'fixed','width':'100%','top':headerHeight,'right':0,'bottom':0,'left':0,'overflow':'hidden'});

        var myScroll = new IScroll('.wrapper', { HWCompositing: true, bounceEasing: 'elastic', bounceTime: 1200 });
        $('.wrapper')[0].addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

        // var startY = 0;
        // var endY = 0;
        // var differenceY = 0;
        // var moveY = 0;
        // var tempMove = 0;
        // var move   = 0;
        // var isScrolling = false;
        //
        //
        //
        // /** 初始化的时候令滚动条先回到顶部 */
        // $('body').attr('move', 0);
        // $('html,body').stop(false, true).animate({ 'scrollTop': 0 }, 0);
        //
        //
        // new AlloyFinger($('html,body')[0], {
        //     touchStart: function(evt) {
        //         $('html,body')[0].addEventListener('touchMove', function() {
        //             object.preDef(evt);
        //         })
        //         startY = evt.touches[0].clientY;
        //     },
        //     touchMove: function(evt) {
        //        object.preDef(evt);
        //     },
        //     touchEnd: function(evt) {
        //
        //         endY = evt.changedTouches[0].clientY;
        //         differenceY = endY - startY;
        //         $('html,body')[0].removeEventListener('touchMove', object.preDef);
        //
        //     },
        //     pressMove: function(evt) {
        //
        //         if (evt.direction != 'Left' || evt.direction != 'Right') {
        //
        //             endY = evt.changedTouches[0].clientY;
        //             var tempM = parseInt($('body').attr('move'));
        //             //var tempM = move;
        //             tempMove = endY - startY;
        //
        //             $('html,body').stop(false, true).animate({ 'scrollTop': -(tempMove + tempM) }, 0);
        //
        //         }
        //     },
        //     swipe: function(evt) {
        //
        //         if (evt.direction != 'Left' || evt.direction != 'Right') {
        //             endY = evt.changedTouches[0].clientY;
        //             differenceY = endY - startY;
        //
        //             if (moveY > 0) {
        //                 moveY = 0;
        //             } else if (moveY < -$(document).height()) {
        //                 moveY = -$(document).height();
        //             } else {
        //                 moveY = differenceY + parseInt($('body').attr('move')) + tempMove;
        //             }
        //
        //             $("body").attr('move', moveY);
        //             //move = moveY;
        //             $('html,body').stop(false, true).animate({ 'scrollTop': -moveY}, 500);
        //
        //         }
        //     }
        // })




        // $('body').addClass('app_cannotScroll');
        //
        //
        // /** 调用transform插件 */
        // Transform(luZhuScope);
        //
        // new AlloyFinger(luZhuScope, {
        //     touchStart: function(evt) {
        //         luZhuScope.addEventListener('touchMove', function() {
        //             object.preDef(evt);
        //         })
        //         startY = evt.touches[0].clientY;
        //     },
        //     touchMove: function(evt) {
        //        object.preDef(evt);
        //     },
        //     touchEnd: function(evt) {
        //
        //         endY = evt.changedTouches[0].clientY;
        //         differenceY = endY - startY;
        //         luZhuScope.removeEventListener('touchMove', object.preDef);
        //
        //     },
        //     pressMove: function(evt) {
        //
        //         if (evt.direction != 'Left' || evt.direction != 'Right') {
        //
        //             endY = evt.changedTouches[0].clientY;
        //             tempMoveY = endY - startY;
        //
        //
        //             if (tempMoveY + move > minimumRange) {
        //                 luZhuScope.translateY = minimumRange;
        //             } else if (tempMoveY + move < maximumRange) {
        //                 luZhuScope.translateY = maximumRange;
        //             } else {
        //                 luZhuScope.translateY = tempMoveY + move;
        //             }
        //             console.log(tempMoveY + move)
        //
        //         }
        //     },
        //     swipe: function(evt) {
        //
        //         if (evt.direction != 'Left' || evt.direction != 'Right') {
        //
        //             differenceY = differenceY + move + tempMoveY;
        //             isScrolling = true;
        //
        //             if (differenceY > minimumRange) {
        //                 new To(luZhuScope, "translateY", minimumRange, 300, object.easeEvent, function() {
        //
        //                     move = minimumRange;
        //                     isScrolling = false;
        //                 });
        //             } else if (differenceY < maximumRange) {
        //                 new To(luZhuScope, "translateY", maximumRange, 300, object.easeEvent, function() {
        //
        //                     move = maximumRange;
        //                     isScrolling = false;
        //                 });
        //             } else {
        //                 new To(luZhuScope, "translateY", differenceY, 300, object.easeEvent, function() {
        //
        //                     move = differenceY;
        //                     isScrolling = false;
        //                 });
        //             }
        //
        //         }
        //     }
        // })

    }


    /**
     *   路珠滚动方法;
     *   @param：（路珠表格父对象）
     *   @param：（路珠滚动的速度）
     *   @param：（是否滚动到最右方）
     */
    object.swiperForTable = function(luZhuObject, speed, isGoToRight) {


        var myScroll = new IScroll(luZhuObject[0], { scrollX: true, scrollY: false, mouseWheel: false ,HWCompositing: true, bounceEasing: 'elastic', bounceTime: 1200});



        // if (luZhuObject == undefined || speed == null) {
        //     return;
        // }
        //
        // if (speed == undefined) {
        //     speed = 60;
        // }
        //
        // if (isGoToRight == undefined) {
        //     isGoToRight = true;
        // }
        //
        // var tableObject = luZhuObject.find('table');
        // var tableElement = luZhuObject.find('table')[0];
        // var luZhuElement = luZhuObject[0];
        //
        // var tdNumber = tableObject.find('td').length;
        // var tdWidth = tableObject.find('td').outerWidth();
        //
        // /** 一个页面最多能放多少排td */
        // var pageMinInsertTdNum = $(window).width() / tdWidth;
        //
        // if (pageMinInsertTdNum > tdNumber) {
        //     return;
        // }
        //
        // var startX = 0;
        // var endX = 0;
        // var differenceX = 0;
        // var move = 0;
        // var isScrolling = false;
        // var tempMoveX = 0;
        //
        // /** 定义最大最小边界 */
        // var maximumRange = -(luZhuObject.find('table tr').width() - luZhuObject.width());
        // var minimumRange = 0;
        //
        // /** 调用transform插件 */
        // Transform(tableElement);
        //
        // if (isGoToRight) {
        //
        //     /**  让表格滚动到右侧 */
        //     new To(tableElement, "translateX", maximumRange, 0, object.easeEvent, function() {});
        //
        //     /**  记录表格滚动距离 */
        //     move = maximumRange;
        //
        // } else {
        //     /**  记录表格滚动距离 */
        //     move = minimumRange;
        // }
        //
        // /** 调用alloy_finger插件 */
        // new AlloyFinger(luZhuElement, {
        //     touchStart: function(evt) {
        //         luZhuElement.addEventListener('touchMove', function() {
        //             object.preDef(evt);
        //         })
        //         startX = evt.touches[0].clientX;
        //     },
        //     touchMove: function(evt) {
        //         object.preDef(evt);
        //     },
        //     touchEnd: function(evt) {
        //
        //         endX = evt.changedTouches[0].clientX;
        //         differenceX = endX - startX;
        //         luZhuElement.removeEventListener('touchMove', object.preDef);
        //     },
        //     pressMove: function(evt) {
        //
        //         if (evt.direction != "Up" || evt.direction != "Down") {
        //
        //             if (isScrolling == false) {
        //
        //                 endX = evt.changedTouches[0].clientX;
        //                 tempMoveX = endX - startX;
        //
        //                 /**  限制路珠不能滚动出边界  */
        //                 if (tempMoveX + move > minimumRange) {
        //
        //                     tableElement.translateX = minimumRange;
        //
        //                 } else if (tempMoveX + move < maximumRange) {
        //
        //                     tableElement.translateX = maximumRange;
        //
        //                 } else {
        //
        //                     tableElement.translateX = tempMoveX + move;
        //                 }
        //             }
        //         }
        //     },
        //     swipe: function(evt) {
        //
        //         if (evt.direction != "Up" || evt.direction != "Down") {
        //
        //             isScrolling = true;
        //
        //             /** 叠加上次移动的距离 */
        //             differenceX = differenceX + move + tempMoveX;
        //
        //             /**  限制路珠不能滚动出边界  */
        //             if (differenceX > minimumRange) {
        //                 new To(tableElement, "translateX", minimumRange, speed, object.easeEvent, function() {
        //
        //                     move = minimumRange;
        //                     isScrolling = false;
        //                 });
        //             } else if (differenceX < maximumRange) {
        //                 new To(tableElement, "translateX", maximumRange, speed, object.easeEvent, function() {
        //
        //                     move = maximumRange;
        //                     isScrolling = false;
        //                 });
        //             } else {
        //                 new To(tableElement, "translateX", differenceX, 300, object.easeEvent, function() {
        //
        //                     move = differenceX;
        //                     isScrolling = false;
        //                 });
        //             }
        //         }
        //     }
        // })
    }


    /**
     *  滑动方法;
     *  @param1: 滑动对象，非jq对象而是dom对象（dom object）;
     *  @param2: 滑块的宽度 (number);
     *  @param3: 缓冲方法 (function);
     *  @param4: 方向 (string)
     */
    object.swiperFun = function(swipeScrollObject, liWidth, easeEvent, direction, time) {

        if (direction == 'left') {
            new To(swipeScrollObject, "translateX", -liWidth, time, easeEvent, function() {
                var tempObject = $(swipeScrollObject).find('li:first-child');
                $(swipeScrollObject).append(tempObject);
                new To(swipeScrollObject, "translateX", 0, 0, easeEvent, function() {});
            });
        } else {
            new To(swipeScrollObject, "translateX", -liWidth, 0, easeEvent, function() {});
            var tempObject = $(swipeScrollObject).find('li:last-child');
            $(swipeScrollObject).prepend(tempObject);
            new To(swipeScrollObject, "translateX", 0, time, easeEvent, function() {});
        }
    }


    /**
     *  阻止浏览器默认行为方法;
     *  @param:  事件对象 (Object)
     */
    object.preDef = function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    };

    /**
     *  清除轮播图动画方法;
     */
    object.clearSwiperAnimate = function() {
        window.clearInterval(object.clearInterval);
    }

    /**
     *   轮播图自适应屏幕宽度方法;
     *   @param：轮播图对象（Object）
     */
    object.adaptationWidth = function(swipeScroll) {

        if (swipeScroll == undefined) {
            return;
        }

        var liNum = swipeScroll.find('li').length;

        /** 固定轮播图Ul和li的宽度 */
        swipeScroll.css({ 'width': (liNum * 100) + '%' });
        swipeScroll.find('li').css({ 'width': (100 / liNum) + "%" });
    }

    /**
     *   轮播图方法;
     *   @param：轮播图对象 （object）
     *   @param:：轮播的时间 （number）
     *   @param：轮播的速度 （number）
     */
    object.initSwiper = function(swipeScroll, time, speed) {

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

        object.clearInterval = setInterval(function() {
            /**  滑动方法 */
            object.swiperFun(swipeElement, swipeScroll.parent().width(), object.easeEvent, 'left', speed);
        }, time);

        /** 调用transform插件 */
        Transform(swipeElement);

        /** 调用alloy_finger插件 */
        new AlloyFinger(swipeElement, {
            touchStart: function(evt) {
                swipeElement.addEventListener('touchMove', function() {
                    object.preDef(evt);
                })
            },
            touchMove: function(evt) {
                object.preDef(evt);
            },
            touchEnd: function() {
                swipeElement.removeEventListener('touchMove', object.preDef);
            },
            swipe: function(evt) {

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

    object.initHeaderSwiper = function(swiperSelect, speed) {

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
        var tempMove = 0;
        var isScrolling = false;

        /** 定义最大最小边界 */
        var maximumRange = -(swiperSelect.find('table tr').width() - swiperSelect.width());
        var minimumRange = 0;

        /** 记录滚动的距离 */

        /** 调用transform插件 */
        Transform(tableElement);

        object._swiperElement = tableElement;

        /** 调用alloy_finger插件 */
        new AlloyFinger(swiperElemt, {

            touchStart: function(evt) {
                swiperElemt.addEventListener('touchMove', function(){
                    object.preDef(evt);
                })
                startX = evt.touches[0].clientX;
            },
            touchMove: function(evt) {
                object.preDef(evt);
            },
            touchEnd: function(evt) {

                endX = evt.changedTouches[0].clientX;
                differenceX = endX - startX;
                swiperElemt.removeEventListener('touchMove', object.preDef);

            },
            pressMove: function(evt) {

                if (evt.direction != "Up" || evt.direction != "Down") {

                    if (isScrolling == false) {

                        endX = evt.changedTouches[0].clientX;
                        tempMove = endX - startX;

                        /**  限制路珠不能滚动出边界  */
                        if (tempMove + move > minimumRange) {

                            tableElement.translateX = minimumRange;

                        } else if (tempMove + move < maximumRange) {

                            tableElement.translateX = maximumRange;

                        } else {

                            tableElement.translateX = tempMove + move;
                        }

                    }

                }

            },
            swipe: function(evt) {

                if (evt.direction != "Up" || evt.direction != "Down") {
                    differenceX = differenceX + move + tempMove;

                    isScrolling = true;

                    /** 限制滚动不能超出边界 */
                    if (differenceX > minimumRange) {
                        new To(tableElement, "translateX", minimumRange, speed, object.easeEvent, function() {
                            move = minimumRange;
                            isScrolling = false;
                        });
                    } else if (differenceX < maximumRange) {
                        new To(tableElement, "translateX", maximumRange, speed, object.easeEvent, function() {
                            move = maximumRange;
                            isScrolling = false;
                        });
                    } else {
                        new To(tableElement, "translateX", differenceX, speed, object.easeEvent, function() {
                            move =differenceX;
                            isScrolling = false;
                        });
                    }
                }

            }
        });

    }



    object._swiperElement = null;
    object.moveHeader = function() {

        if ($("#app_swiperSelect") == undefined) {
            return;
        }

        var ele = $("#app_swiperSelect table td.active").index();
        var ss = $("#app_swiperSelect").width();
        var maximumRange = $("#app_swiperSelect table tr").width() - ss;
        var w = 0;
        for (var i = 0; i < ele - 1; i++) {
            var asd = $("#app_swiperSelect table td:eq(" + i + ")").outerWidth(true);
            w += parseFloat(asd);
        }
        if (w > maximumRange) {
            w = maximumRange;
        }
        object._swiperElement.translateX = -w;
    };

    /**
     *  返回上一页方法;
     *  @param: 返回按钮对象(Object);
     */
    object.returnBack = function(returnBtn) {

        // if (returnBtn == undefined) {
        //     return;
        // }

        // returnBtn.click(function () {
        //     window.location.href = '/'
        // })

    }


    /**
     *  创建并且显示遮罩层方法;
     *  @param：遮罩层父容器对象;
     */
    object.createMaskLayer = function(container) {

        if (container == undefined) {
            return;
        }

        container.append('<div class="app_public_maskLayer"></div>');
        $('.app_public_maskLayer').fadeIn(300);
        $('body').addClass('app_cannotScroll');

        object.clickMaskLayer();
    }


    /**
     *  删除遮罩层方法;
     *  @param：遮罩层对象;
     */
    object.deleteMaskLayer = function(maskLayer) {

        if (maskLayer == undefined) {
            return;
        }

        maskLayer.fadeOut(300);
        window.setTimeout(function() {

            maskLayer.remove();
            $("body").removeClass('app_cannotScroll');

        }, 310)
    }


    /** 黑色提示框
     *   @param：提示框父对象
     *   @param：提示框出现的时间;
     *   @param :  内容;
     */
    object.tipsWindow = function(loadingObject, time, string) {

        if (loadingObject == undefined) {
            return;
        }

        $(".app_public_promptWindow").remove();

        var loadingString = '<div class="app_public_promptWindow"><span>'+string+'</span></div>';
        loadingObject.append(loadingString);
        $(".app_public_promptWindow").fadeIn(600);

        window.setTimeout(function() {
            $(".app_public_promptWindow").animate({ 'opacity': 0 }, 600, function() {
                $(".app_public_promptWindow").remove();
            })
        }, time);

    }


    /**
     *  点开导航更多选项方法;
     * @param：导航更多按钮对象 (Object)
     */
    object.openSelectMore = function(selectMoreButton) {

        if (selectMoreButton == undefined) {
            return;
        }

        selectMoreButton.click(function() {
            if ($(this).hasClass('active')) {
                $("#header_selectList").fadeOut(300);
                $(this).removeClass('active');
                object.deleteMaskLayer($('.app_public_maskLayer'));
                $('#app_selectBlockNav').show();

            } else {
                $("#header_selectList").fadeIn(300);
                $(this).addClass('active');
                object.deleteMaskLayer($('.app_public_maskLayer'));
                object.createMaskLayer($('.container'));
                $('.app_public_maskLayer').attr('type', 'more');

                $('#app_selectBlockNav').hide();
                $('#app_selectBlockNav  .app_selectBlockNav_lis').removeClass('app_selectBlockNav_active');
                $('.app_selectBlockNavCons ul').hide();
                $('.app_selectBlockNavCons').hide();

                var string = "";
                $('#app_swiperSelect td').each(function(index, item) {

                    string += "<li>" + $(item).html() + "</li>";
                })
                $("#header_selectList ul").html(string);



                /**  查找导航栏那个选项是被选中的 */
                $('#app_swiperSelect td').each(function(index, item) {
                    if ($(item).hasClass('active')) {
                        $('#header_selectList li').eq(index).addClass('active');
                    };
                })
            }
        })

    }


    /**  隐藏层点击收缩方法  */
    object.clickMaskLayer = function() {

        $('.app_public_maskLayer').click(function() {
            if ($(this).attr('type') == 'color') {
                $(".header_allName").hide();
                $(".app_public_maskLayer").fadeOut(300);
                $('.header_name').removeClass('active');
                object.deleteMaskLayer($('.app_public_maskLayer'));

                /**  显示导航和开奖时间栏 */
                $(".header_info").show();
                $(".header_select").show();
                $('#app_selectBlockNav').show();

            } else if ($(this).attr('type') == 'more') {

                $("#header_selectList").fadeOut(300);
                $("#selectMoreButton").removeClass('active');
                object.deleteMaskLayer($('.app_public_maskLayer'));
                $('#app_selectBlockNav').show();

            } else if ($(this).attr('type') == 'nav') {

                $('#app_selectBlockNav  .app_selectBlockNav_lis').removeClass('app_selectBlockNav_active');
                $('.app_selectBlockNavCons').find('ul').hide();
                $('.app_selectBlockNavCons').fadeOut(300);
                object.deleteMaskLayer($('.app_public_maskLayer'));
                $('body').css({ "overflow": "" });

            }
            $("body").removeClass('app_cannotScroll');
        })

    }


    /**
     *   添加loading方法;
     *   @param ： loading对象 ( Object );
     */
    object.createLoading = function(loadingObject) {

        if (loadingObject == undefined) {
            return;
        }

        var loadingString = '<div class="loader-section">';
        loadingString += '<div class="loader-container">';
        loadingString += '<div class="loader-inner ball-triangle-path"><div></div><div></div><div></div></div>';
        loadingString += '<div class="loader-font">正在加载中...</div></div></div>';

        loadingObject.html(loadingString).css("opacity", "1");
    }


    /**
     *
     * 删除loading方法;
     * @param：loading对象 ( Object );
     */
    object.deleteLoading = function(loadingObject) {

        if (loadingObject == undefined) {
            return;
        }

        loadingObject.animate({ 'opacity': 0 }, 500, function() {
            loadingObject.empty();
        });
    }


    /**
     *   头部固定方法;
     *   @param1 ： 固定在头部得对象名称 ( String );
     *   @param2： 固定在头部得对象的父级名称 （String）;
     *   @callback1：头部固定在顶部时候的回调;
     *   @callback2：头部恢复到顶部时候得回调;
     */
    object.scrollerHeader = function(pinnedString, containerString) {

        if (pinnedString == '' || pinnedString == undefined || containerString == '' || containerString == undefined) {
            return;
        }

        $("." + pinnedString).pin({
            containerSelector: ".container"
        }, function(e) {}, function(e) {});
    }

    /**
     * 隐藏方法;
     * @param：隐藏对象 (Object)
     */
    object.hideLotteryTime = function(object) {

        if (object == undefined) {
            return;
        }

        object.css({ 'visibility': 'hidden' });
    }

    /**
     * 显示方法;
     * @param：显示对象 (Object)
     */
    object.showLotteryTime = function(object) {

        if (object == undefined) {
            return;
        }

        object.removeAttr('style');
    }

    /**
     *  切换二级菜单选项方法;
     *  @param：Object;
     */
    object.chooseTwoLevelMenu = function(selectBlockNav) {

        if (selectBlockNav == undefined) {
            return;
        }

        selectBlockNav.find('.app_selectBlockNav_lis').click(function() {

            var index = $(this).index();

            if ($(this).hasClass('app_selectBlockNav_active')) {

                $(this).removeClass('app_selectBlockNav_active');
                $('.app_selectBlockNavCons').find('ul').eq(index).hide();
                $('.app_selectBlockNavCons').fadeOut(300);
                object.deleteMaskLayer($('.app_public_maskLayer'));
                $('body').css({ "overflow": "" });

            } else {

                selectBlockNav.find('.app_selectBlockNav_lis').removeClass('app_selectBlockNav_active');
                $('.app_selectBlockNavCons').find('ul').hide();
                object.deleteMaskLayer($('.app_public_maskLayer'));

                $(this).addClass('app_selectBlockNav_active');
                $('.app_selectBlockNavCons').find('ul').eq(index).show();
                $('.app_selectBlockNavCons').fadeIn(300);
                object.deleteMaskLayer($('.app_public_maskLayer'));
                object.createMaskLayer($('.container'));
                $('.app_public_maskLayer').attr('type', 'nav');
                $('body').css({ "overflow": "hidden" });
            }

        })
    }


    /**
     * 头部功能区---选择彩种
     * @param lotteryObject
     */
    object.chooseLottery = function(lotteryObject) {

        if (lotteryObject == undefined) {
            return;
        }

        lotteryObject.click(function() {

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
                object.deleteMaskLayer($('.app_public_maskLayer'));
                object.createMaskLayer($('.container'));
                $('.app_public_maskLayer').attr('type', 'color');

                /**  隐藏导航和开奖时间栏 */
                $(".header_info").hide();
                $(".header_select").hide();
                $('#app_selectBlockNav').hide();
                $('#header_selectList').hide();
                $('#selectMoreButton').removeClass('active');

                $('.app_selectBlockNavCons').hide();
                $('.app_selectBlockNav_lis').removeClass('app_selectBlockNav_active');
            }
        });

    };
    /**
     * 选中当前彩种
     * @return {[type]} [description]
     */
    object.checkLotteryNav = function() {
        var lotterycode = $("#navLottery").attr("data-lotterycode");
        $("#navLottery a").removeClass("active");
        $("#navLottery a[data-attr='" + lotterycode + "']").addClass("active");
    }

    /**
     * 历史开奖---显示条件筛选
     * @param filterObject
     */
    object.tableFilter = function(filterObject) {
        filterObject.click(function() {

            if ($('.app_table_menuBlock span i[data-type="dz"]') != undefined) {
                if ($('.app_table_menuBlock span i[data-type="dz"]').hasClass('active')) {

                    object.tipsWindow($('.container'), 1000, '对子不能被筛选');

                    return;
                }
            }

            if ($(this).hasClass('active')) {

                $(this).removeClass("active");
                $(".app_table_requirement").hide();
                $(this).find(".table_requirement").css("display", "none");

            } else {

                $(this).addClass("active");
                $(".app_table_requirement").show();
                $(this).find(".table_requirement").css("display", "block");
            }

        });
    };

    /**
     * 头部功能区---点击显示帮助提示
     * @param helpObject
     */
    object.headerHelp = function(helpObject) {

        if (helpObject == undefined) {
            return;
        }
        helpObject.click(function() {
            $(".app_public_helpBlock").show();
            $("body").addClass('app_cannotScroll');

            // var tempHtml = $(".app_public_helpBlock .ht_content").html();
            // $(".app_public_helpBlock .ht_content").html('<div style="background: red">'+tempHtml+'</div>');
        });
    };

    /**
     * 头部功能区---点击隐藏帮助提示
     * @param helpCloseObject
     */
    object.headerHelpClose = function(helpCloseObject) {
        if (helpCloseObject == undefined) {
            return;
        }
        helpCloseObject.click(function() {
            $(".app_public_helpBlock").hide();
            $("body").removeClass('app_cannotScroll');
        });
    };

    /**
     * 头部功能区---点击显示设置
     * @param setObject
     */
    object.headerSet = function(setObject) {
        if (setObject == undefined) {
            return;
        }
        setObject.click(function() {
            $(".app_public_setBlock").show();
            $("body").addClass('app_cannotScroll');
        });
    };

    /**
     * 头部功能区---点击隐藏设置
     * @param setCloseObject
     */
    object.headerSetClose = function(setCloseObject) {
        if (setCloseObject == undefined) {
            return;
        }
        setCloseObject.click(function() {
            $(".app_public_setBlock").hide();
            $("body").removeClass('app_cannotScroll');
        });
    };


    /**
     * 头部功能区---选择时间
     * @param： 日期按钮对象 （String）
     * @type 1：历史  否则路珠
     */


    object.createDateWindow = function(dateButton, type, callback) {

        if (dateButton == undefined) {
            return;
        }

        var calendar = new lCalendar();
        // calendar.init({ 
        //     'trigger': '#' + dateButton.attr('id'), //标签id
        //     'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
        //     'minDate': '2000-1-1', //最小日期
        //     'maxDate': new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),//最大日期
        // });
        if (1 == type) {
            this.initDateMaxMin("y", 5);
        } else if (2 == type) {
            this.initDateMaxMin("m", 1);
        }

        var date = new Date().format("yyyy-MM-dd");
        calendar.init({
            'trigger': '#' + dateButton.attr('id'), //标签id
            'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
            'minDate': date.addDay(-30).format("yyyy-MM-dd"), //最小日期
            'maxDate': date //最大日期
        });

        dateButton.click(function () {
            $("body").addClass('app_cannotScroll');
        })

        dateButton.bind('input', function() {
            if (typeof callback == "function") {
                callback($(this).val());
            }
            dateButton.next().html($(this).val().DateFormat('MM/dd'));
        });

    };
    /**
     * 初始设置 日期时间范围
     * type 时间格式 y年份，m 月份 否则默认最近一个月
     * number 比当前日期 晚 number 年or月
     * @return {[type]} [description]
     */
    object.initDateMaxMin = function(type, number) {
        var maxDate = new Date().format("yyyy-MM-dd");
        var dt = new Date();
        var minDate = dt.format("yyyy-MM-dd");
        if ("y" == type) {
            minDate = new Date(dt.setFullYear(dt.getFullYear() - number)).format("yyyy-MM-dd");
        } else if ("m" == type) {
            minDate = new Date(dt.setMonth(dt.getMonth() - number)).format("yyyy-MM-dd");
        } else {
            minDate = new Date(dt.setMonth(dt.getMonth() - 1)).format("yyyy-MM-dd");
        }
        $("#date").attr("data-lcalendar", minDate + "," + maxDate);
    }

    /**
     *   导航倒计时方法;
     *   @param：彩种名字;
     *   @param：时间倒计对象;
     *   @param： 时间数;
     *   @param：当倒计完的回调函数;
     *   @param：获取返回的数据的函数
     */
    object.countdownTime = function(colorName, headerTextObject, timeNumber, callBack, parseData) {

        var time = timeNumber / 1000;
        //次数
        var count = 0;
        //等待时间秒
        var maxCount = 10;

        var clearId = window.setInterval(function() {
            if (time <= 0) {
                headerTextObject.html('开奖中');
                if (count >= maxCount) {
                    count = 0;
                    maxCount = 3;
                    callBack(colorName, clearId, parseData);
                }
                count++;
            } else {
                time--;
                headerTextObject.html(('' + time).SecondsTommss());
            }

        }, 1000);
    }


    /**
     * 倒计时执行完了的回调函数，用于获取倒计时数据和拼接操作;
     * @param1：彩种名字;
     * @param2：倒计时id,用于停止该倒计时;
     * @param3：倒计时执行完了获取的数据操作的回调,用于拼接字符串;
     */
    object.getAwardData = function(colorName, clearId, parseData) {

        /** 处理回调 */
        $.ajax({
            url: '/' + colorName + '/getAwardData',
            type: 'GET',
            success: function(data) {

                /** 判断当前期开奖号码是否和请求回来的当前号码一致 */
                if (parseInt($(".header_text i").attr('awardPeriod')) == data.Result.current.period) {

                    window.clearInterval(clearId);

                    /** 获取数据后操作，可用于拼接字符串; */
                    parseData(data)

                    $.ajax({
                        url: '/' + colorName + '/getAwardTimes',
                        type: 'GET',
                        success: function(nextData) {
                            //console.log(nextData);
                            var json = nextData;
                            $('.header_text i').attr('awardPeriod', json.current.periodNumber);
                            $('.header_text i').html('距' + json.next.periodNumber + '期开奖：');
                            $('.header_text b').attr('awardTime', json.next.awardTimeInterval);

                            /** 重新倒计时 */
                            /** 时间倒计对象 */
                            var countDownObject = $('.header_text b');
                            /** 倒计时时间数 */
                            var awardTime = parseInt($('.header_text b').attr('awardTime'));

                            object.countdownTime(colorName, countDownObject, awardTime, object.getAwardData, parseData);
                        },
                        error: function(err) {
                            console.log("awardTimes:" + err);
                        }
                    })
                }
            },
            error: function(err) {
                console.log("awardData:" + err);
            }
        })
    }

    function AdCallBackList(data) {
        Event.emit('adCallBack', data);
    }
    //获取广告
    object.getAdList = function(codes) {
        $.ajax({
            url: '/ad/getAdList',
            data: { codes: encodeURI(codes) },
            dataType: 'text',
            type: 'GET',
            success: function(data) {
                if (data) {
                    eval(data);
                }

            }
        });
    };

    module.exports = object;
})
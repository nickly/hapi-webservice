/**=============================================================
 *                                                         常用js代码
 * =============================================================
 */
"use strict";

define(function(require, exports, module) {

    require('jquery');
    var publicObject = require('public/index.js');

    var object = {};


    /**
     *  多个页面调用的函数;
     */
    object.multiplexing = function() {

        /** 添加loading */
        //publicObject.createLoading($('#loading'));
        /** 隐藏开奖栏 */
        //publicObject.hideLotteryTime($(".header_info"));
        /** 隐藏导航栏 */
        //publicObject.hideLotteryTime($(".header_select"));
        /** 隐藏二级菜单*/
        //publicObject.hideLotteryTime($("#app_selectBlockNav"));

        /** 当加载完成 */
        //setTimeout(function() {
        /** 删除loading */
        //publicObject.deleteLoading($('#loading'));
        /** 显示开奖栏 */
        //publicObject.showLotteryTime($(".header_info"));
        /** 显示导航栏 */
        //publicObject.showLotteryTime($(".header_select"));
        /** 显示二级菜单 */
        //publicObject.showLotteryTime($("#app_selectBlockNav"));
        //}, 600);

        /** 调用jquey.pin 组件固定头部 */
        publicObject.scrollerHeader('pinned', 'container');

        /**  头部返回上一页 */
        publicObject.returnBack($('#header_return'))

        /**  头部切换箭头 */
        publicObject.chooseTwoLevelMenu($('#app_selectBlockNav'));

        /** 头部功能块---选择彩种 */
        publicObject.chooseLottery($('.header_name'));

        /** 头部功能块--多选导航 */
        publicObject.openSelectMore($("#selectMoreButton"));


        /** 头部功能块---显示帮助提示 */
        publicObject.headerHelp($('.header_help'));

        /** 头部功能块---隐藏帮助提示 */
        publicObject.headerHelpClose($('.app_public_helpBlock .win_title').find("i"));
        publicObject.headerHelpClose($('.app_public_helpBlock .ht_confirm').find("span"));
        publicObject.headerHelpClose($('.app_public_helpBlock .ht_bg'));

        /** 头部功能块---显示设置提示 */
        publicObject.headerSet($('.header_set'));

        /** 头部功能块---隐藏设置提示 */
        publicObject.headerSetClose($('.app_public_setBlock .win_title').find("i"));
        publicObject.headerSetClose($('.app_public_setBlock .ht_bg'));


        /** 用户变化缩放时调用 */
        $(window).resize(function() {
            publicObject.scrollerHeader('pinned', 'container');
            publicObject.clearSwiperAnimate();
        });

        /** 用户变化屏幕方向时调用 */
        $(window).bind('orientationchange', function(e) {
            window.location.reload();
        });



    }


    module.exports = object;
})
/**=============================================================
 *                                                         历史开奖js代码
 * =============================================================
 */

define(function(require, exports, module) {

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('../../public/index.js');
    /**  多页面调用的复用代码 */
    var common = require('../../common/index')

    var object = {};

    /**  倒计时模块 */
    var awardtimer = require('public/awardtimer');

    /**
     * 初始化函数;
     * @param：
     */
    object.init = function() {

        common.multiplexing();

        /** 初始化导航 */
        publicObject.initHeaderSwiper($("#app_swiperSelect"));
        /**选中彩种*/
        publicObject.checkLotteryNav();
        /** 头部功能块---选择时间 */
        publicObject.createDateWindow($('#date'),1, function(val) {
            $.ajax({
                type: 'GET',
                url: '/jsk3/gethistory',
                data: 'date=' + val,
                dataType: 'html',
                success: function(data) {
                    $("#history tbody").html(data)
                },
                complete: function() {}
            });
        });
        /** 开奖倒计时 结束执行 */
        awardtimer.start("jsk3", function(result) {
            var selectDate = $("#date").val().replace(/^(\d{2})\/(\d{2})$/, new Date().getFullYear() + '-$1-$2');
            var current = result.current;
            if (selectDate === current.date) {
                $.ajax({
                    type: 'GET',
                    url: '/jsk3/gethistory',
                    data: 'date=' + current.date,
                    dataType: 'html',
                    success: function(data) {
                        $("#history tbody").html(data)
                    },
                    complete: function() {}
                });
            }
        });

    }





    module.exports = object; //直接把整个模块对象导出;
})
/**=============================================================
 * 大小单双路珠
 * =============================================================
 */

define(function (require, exports, module) {

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('public/index');
    /**  多页面调用的复用代码 */
    var common = require('common/index');

    /**  多页面调用的复用代码 */
    var luzhu = require('public/luzhu');
    //倒计时
    var awardTimer = require('public/awardtimer');

    var exprotObj = {};

    /**
     * 初始化函数;
     * @param：
     */
    exprotObj.init = function () {
        common.multiplexing();
        /** 初始化导航 */
        publicObject.initHeaderSwiper($("#app_swiperSelect"));
        /**选中彩种*/
        publicObject.checkLotteryNav();
        /** 头部功能块---选择时间 */
        publicObject.createDateWindow($('#date'),2, function () {
            date = $('#date').val();
            exprotObj.refresh(true);
            return false;
        });

        //路珠
        luzhu.init(true);

        /** 彩种名字 */
        var lotteryCode = 'cqssc';

        //倒计时
        awardTimer.start(lotteryCode, function (result) {

            //如果用户选择了不是当前日期， 则不做更新处理
            var selectDate = $("#date").val().replace(/^(\d{2})\/(\d{2})$/, new Date().getFullYear() + '-$1-$2');
            if (selectDate == result.current.date) {
                exprotObj.refresh(false);
            }
        });
    }



    exprotObj.refresh = function (bflag) {
        if (bflag) {
            exprotObj.loadData();
        } else {
            var setTime = setTimeout(function () {
                exprotObj.loadData();
                if (setTime) {
                    clearTimeout(setTime);
                }
            }, 10000)
        }
    }
    exprotObj.loadData = function () {

        publicObject.createLoading($('#loading'));

        $.get('/cqssc/getbigorsmall?date=' + date, function (html) {
            $('#data_result').html(html);
            $(".app_luZhu_list").each(function (index, item) {
                publicObject.swiperForTable($(item), 600);
                luzhu.filterLuzhu();
                publicObject.deleteLoading($('#loading'));
            })
        });
    }


    module.exports = exprotObj;   //直接把整个模块对象导出;
});

/**=============================================================
 * 大小单双路珠
 * =============================================================
 */

define(function(require, exports, module) {

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('public/index');
    /**  多页面调用的复用代码 */
    var common = require('common/index');
    /**  多页面调用的复用代码 */
    var luzhu = require('public/luzhu');

    var awardtimer = require('public/awardtimer');
    var exprotObj = {};
    var selected = {};

    /**
     * 初始化函数;
     * @param：
     */
    exprotObj.init = function() {
        common.multiplexing();
        /** 初始化导航 */
        publicObject.initHeaderSwiper($("#app_swiperSelect"));
        /**选中彩种*/
        publicObject.checkLotteryNav();
        /** 头部功能块---选择时间 */
        publicObject.createDateWindow($('#date'),2, function() {
            $('#date').attr("date", $('#date').val());
            date = $('#date').val();
            exprotObj.refresh(true);
            return false;
        });

        //路珠
        luzhu.init(false);

        console.info($("#date").val())
        awardtimer.start("jsk3", function(result) {
            var selectDate = $("#date").val().replace(/^(\d{2})\/(\d{2})$/, new Date().getFullYear() + '-$1-$2');
            var current = result.current;
            if (selectDate === current.date) {
                exprotObj.refresh(false);
            }
        });
    }

    exprotObj.refresh = function(bflag) {
        if (bflag) {
            exprotObj.loadData();
        } else {
            var setTime = setTimeout(function() {
                exprotObj.loadData();
                if (setTime) {
                    clearTimeout(setTime);
                }
            }, 10000)
        }
    }
    exprotObj.loadData = function() {
        $.get('/jsk3/getluzhutotal?date=' + date, function(html) {
            $('#data_result').html(html);
            $(".app_luZhu_list").each(function(index, item) {
                publicObject.swiperForTable($(item), 600);
            })
        });
    }


    module.exports = exprotObj; //直接把整个模块对象导出;
});
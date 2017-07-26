/**=============================================================
 * 大小单双路珠
 * =============================================================
 */

define(function (require, exports, module) {

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('../../public/index');
    /**  多页面调用的复用代码 */
    var common = require('../../common/index');

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
        publicObject.moveHeader();

        //倒计时
        awardTimer.start('cqssc', function (result) { });
    }

    module.exports = exprotObj;   //直接把整个模块对象导出;
});

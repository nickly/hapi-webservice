/**=============================================================
 *                                                         历史开奖js代码
 * =============================================================
 */

define(function (require, exports, module) {

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('../../public/index');
    /**  多页面调用的复用代码 */
    var common = require('../../common/index');

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
        //publicObject.createDateWindow($('#date'));
    }

    module.exports = exprotObj;   //直接把整个模块对象导出;
});
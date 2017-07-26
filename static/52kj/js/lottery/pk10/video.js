/**=============================================================
 *                                                         开奖视频js代码
 * =============================================================
 */

define(function(require,exports,module) {

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('public/index.js');
    /**  多页面调用的复用代码 */
    var common = require('common/index');

    var awardtimer    = require('public/awardtimer');

    var historyList      = require('lottery/pk10/historyList');

    var object = {};


    /**
     * 初始化函数;
     * @param：
     */
    object.init = function () {

        common.multiplexing();

        historyList.initColorAndFont();

        /** 点击大小 */
        historyList.clickDxButton();

        /**选中彩种*/
        publicObject.checkLotteryNav();

        /**  切换龙虎  */
        historyList.clickChangeLongHu();

        /**  倒计时开奖 */
        awardtimer.start("pk10", function(result){
                historyList.mosaicHtml(result);
                historyList.mosaicHtml2(result);
        });
        
        /** 关闭提示按钮 */
        $('.tips_close').click(function () {
              $('.app_video_tipsBlock').fadeOut(200);
        })
        
    }






    module.exports = object;   //直接把整个模块对象导出;
})
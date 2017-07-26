/**=============================================================
 *                                                         视频直播js代码
 * =============================================================
 */

define(function(require, exports, module) {

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('../../public/index.js');
    /**  多页面调用的复用代码 */
    var common = require('../../common/index')

    /**  倒计时模块 */
    var awardtimer = require('public/awardtimer');

    var object = {};


    /**
     * 初始化函数;
     * @param：
     */
    object.init = function() {

        common.multiplexing();

        /**选中彩种*/
        publicObject.checkLotteryNav();

        $(".tips_close").click(function() {
            $(this).parent().hide();
        });

        var vh = $('.app_video_iframeBlock').width() / 1.55;
        $('.app_video_iframeBlock').height(vh);

        /** 开奖倒计时 结束执行 */
        awardtimer.start("jsk3", function(result) {

            var current = result.current;

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
        });

    }



    module.exports = object; //直接把整个模块对象导出;
})
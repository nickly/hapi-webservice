/**=============================================================
 *                                                         幸运农场视频直播js代码
 * =============================================================
 */

define(function(require, exports, module) {

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('../../public/index');
    var exprotObj = {}

    /**
     * 初始化函数;
     * @param：
     */
    exprotObj.init = function() {
        this.historySetNumColor();
        /**选中彩种*/
        publicObject.checkLotteryNav();

        $(".tips_close").click(function() {
            $(this).parent().hide();
        });

        var vh = $('.app_video_iframeBlock').width() / 1.55;
        $('.app_video_iframeBlock').height(vh);
    }


    /**
     * 设置号码颜色;
     * @param：
     */
    exprotObj.historySetNumColor = function() {
        /***************************设置号码颜色Start**************************** */
        var hitColor = {};
        $(".app_lottery_gdklsf:first i").each(function(i) {
            var numStyle = ['red', 'purple', 'soil', 'blue', 'green', 'orange', 'brown', 'darkPurple'];
            var hit = $(this).text();
            hitColor[hit] = numStyle[i];
        });

        $(".app_lottery_gdklsf i").each(function() {
            var hit = $(this).text();
            $(this).addClass(hitColor[hit] || 'gray');
        });
        /***************************设置号码颜色End**************************** */
    }


    /**
     * 倒计时结束 开奖结果插入到列表中;
     * 如果
     * @param：开奖数据
     */
    exprotObj.atInsertResult = function(data) {
        var current = data.current;

        var nums = current.award.split(',');
        var time = current.time;
        var strDay = current.date.replace('-', '').replace('-', '');
        var period = current.period;
        var $tr = $('<tr data-type="historyList"><td></td><td></td><td><div class="app_lottery_gdklsf"></div></td></tr>');
        $tr.find('td').eq(0).html(strDay + "-" + period);
        $tr.find('td').eq(1).html(time);
        for (var i = 0; i < nums.length; i++) {
            var num = nums[i];
            var $i = $('<i></i>').html(parseInt(num));
            $tr.find('.app_lottery_gdklsf').append($i);
        }
        $("#historyList").prepend($tr);

    }
    module.exports = exprotObj; //直接把整个模块对象导出;
});
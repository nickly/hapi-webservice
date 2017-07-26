define(function(require, exports, module) {

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('public/index');
    /**  多页面调用的复用代码 */
    var common = require('common/index');

    //倒计时
    var awardTimer = require('public/awardtimer');

    var exprotObj = {};


    /**根据第一行开奖记录，设置数字颜色 */
    function setNumColor() {
        var hitColor = {};
        $(".app_lottery_cqssc:first i").each(function(i) {
            var numStyle = ['red', 'purple', 'soil', 'blue', 'green'];
            var hit = $(this).text();
            hitColor[hit] = numStyle[i];
        });

        $(".app_lottery_cqssc i").each(function() {
            var hit = $(this).text();
            $(this).addClass(hitColor[hit] || 'gray');
        });

    }

    /**追加开奖结果到历史记录 */
    function appendResult(result) {

        var award = result.current;
        var row = [];
        var period = award.period + '';
        period = period.replace(/^(\d{2})$/g, '0$1');
        row.push('<tr><td>' + award.date.replace(/\-/g, '') + '-' + period + '</td><td>' + award.time + '</td> <td><div class="app_lottery_cqssc">');
        $.each(result.current.award.split(','), function(i, ball) {
            row.push('<i>' + ball + '</i>');
        });
        row.push('</div></td></tr>');

        $("#historyList").prepend(row.join(''));

        setNumColor();
    }


    /**
     * 初始化函数;
     * @param：
     */
    exprotObj.init = function() {

        common.multiplexing();
        // /** 初始化导航 */
        // publicObject.initHeaderSwiper($("#app_swiperSelect"));

        // /** 头部功能块---选择时间 */
        // publicObject.createDateWindow($('#date'));

        // //号码选择
        // publicObject.tableFilter($(".table_req_filter"));

        /**选中彩种*/
        publicObject.checkLotteryNav();

        $("#header_return").parent('a').attr("href", "/cqssc/history");

        $(".tips_close").click(function() {
            $(this).parent().hide();
        });

        setNumColor();

        //倒计时
        awardTimer.start("cqssc", function(result) {
            appendResult(result);
        });
        var vh = $('.app_video_iframeBlock').width() / 1.55;
        $('.app_video_iframeBlock').height(vh);
    }

    module.exports = exprotObj; //直接把整个模块对象导出;
});
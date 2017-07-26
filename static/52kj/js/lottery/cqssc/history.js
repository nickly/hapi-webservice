define(function (require, exports, module) {

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('../../public/index');
    /**  多页面调用的复用代码 */
    var common = require('../../common/index');

    //倒计时
    var awardTimer = require('public/awardtimer');

    var exprotObj = {};

    /**根据第一行开奖记录，设置数字颜色 */
    function setNumColor() {
        var hitColor = {};
        $(".app_lottery_cqssc:first i").each(function (i) {
            var numStyle = ['red', 'purple', 'soil', 'blue', 'green'];
            var hit = $(this).text();
            hitColor[hit] = numStyle[i];
        });

        $(".app_lottery_cqssc i").each(function () {
            var hit = $(this).text();
            $(this).removeAttr('class').attr('class', hitColor[hit] || 'gray');
        });
    }


    /**选中号码 */
    function activeSelected() {

        var groupOpt = { "单": [1, 3, 5, 7, 9], "双": [0, 2, 4, 6, 8], "大": [5, 6, 7, 8, 9], "小": [0, 1, 2, 3, 4] };

        var selected = [];
        var selectedNum = [];
        $(".app_table_requirement li span.active").each(function () {
            var text = $(this).text();
            if (isNaN(text)) {

                if (selected.length == 0) {
                    selected = groupOpt[text];
                }
                else {
                    //取交集, ie8 不支持filter
                    selected = selected.filter(function (v) {
                        return groupOpt[text].indexOf(v) != -1;
                        //return $.inArray(v, selected) != -1 && $.inArray(v, groupOpt[text]) != -1;
                    });
                }
            } else {
                selectedNum.push(parseInt(text));
            }
        });
        selected = selected.concat(selectedNum);
        //selected = $.unique(selected);//不去重也可以


        $(".app_lottery_cqssc i").each(function () {
            var hit = parseInt($(this).text());
            if ($.inArray(hit, selected) == -1) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            }
        });
    }

    /**追加开奖结果到历史记录 */
    function appendResult(result) {

        var award = result.current;
        var row = [];
        var period = award.period + '';
        period = period.replace(/^(\d{2})$/g, '0$1')
        row.push('<tr><td>' + award.date.replace(/\-/g, '') + '-' + period + '</td><td>' + award.time + '</td> <td><div class="app_lottery_cqssc">');
        $.each(result.current.award.split(','), function (i, ball) {
            row.push('<i>' + ball + '</i>');
        });
        row.push('</div></td></tr>');

        $("#historyList").prepend(row.join(''));

        setNumColor();
        activeSelected();
    }


    /**
     * 初始化函数;
     * @param：
     */
    exprotObj.init = function () {

        /** 彩种名字 */
        var lotteryCode = 'cqssc';

        common.multiplexing();
        /** 初始化导航 */
        publicObject.initHeaderSwiper($("#app_swiperSelect"));
        /**选中彩种*/
        publicObject.checkLotteryNav();
        //号码选择
        publicObject.tableFilter($(".table_req_filter"));

        setNumColor();

        /** 头部功能块---选择时间 */
        publicObject.createDateWindow($('#date'),1, function () {
            publicObject.createLoading($('#loading'));

            $.get('/cqssc/getHistory', { date: $('#date').val() }, function (html) {
                $("#historyList").empty().append(html);
                setNumColor();
                activeSelected();
                publicObject.deleteLoading($('#loading'));
            });

        });


        //倒计时
        awardTimer.start(lotteryCode, function (result) {

            //如果用户选择了不是当前日期， 则不做更新处理
            var selectDate = $("#date").val().replace(/^(\d{2})\/(\d{2})$/, new Date().getFullYear() + '-$1-$2');
            if (selectDate == result.current.date) {
                appendResult(result);
            }

        });


        //分组选择, 原后激活号码
        $(".app_table_requirement li span").click(function () {
            var group = $(this).attr("data-group");
            var recovery = $(".app_table_requirement ul").find("span[data-group='clear']");

            if (group == "clear") {
                $(this).parent().parent().find("span").removeClass("active");
                $(this).removeClass("fontOrange");
                activeSelected();
            } else {
                recovery.addClass("fontOrange");
                $(this).parents().find("span[data-group='" + group + "']").not(this).removeClass("active");
                $(this).toggleClass("active");

                var count = $(".app_table_requirement li span.active").length;
                if(count == 0){
                    recovery.removeClass("fontOrange");
                }
                activeSelected();
            }
        });

    }

    module.exports = exprotObj;   //直接把整个模块对象导出;
});

/**=============================================================
 *                                                         历史开奖js代码
 * =============================================================
 */

define(function(require,exports,module){

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('public/index.js');
    /**  多页面调用的复用代码 */
    var common        = require('common/index');

    var awardtimer    = require('public/awardtimer');

    var historyList      = require('lottery/pk10/historyList');

    var object ={};

    /** 筛选状态对象 */
    object.selectedNum = [];


    /**
     * 初始化函数;
     * @param：
     */
    object.init = function () {

        common.multiplexing();

        /** 初始化导航 */
        publicObject.initHeaderSwiper($("#app_swiperSelect"));

        /**选中彩种*/
        publicObject.checkLotteryNav();
        publicObject.moveHeader();

        /** 历史开奖---显示条件筛选 */
        publicObject.tableFilter($('.table_req_filter'));

        /**  判断大小单双的颜色值，临时放到属性中 */
        historyList.initColorAndFont();

        /**  切换龙虎  */
        historyList.clickChangeLongHu();


        /** 头部功能块---选择时间 */
        publicObject.createDateWindow($('#date'),1,function () {
            $('#date').attr("date",$('#date').val());

            publicObject.createLoading($("#loading"));

            $.ajax({
                url: '/pk10/getHistory',
                type:'GET',
                dataType: "html",
                data:{
                    date: $('#date').val().replace(/-/g, "/")
                },
                success:function (data) {

                    $(".app_public_tableBlock").eq(0).find("table").remove();
                    $(".app_public_tableBlock").eq(0).append(data);

                    /** 历史开奖---显示条件筛选 */
                    publicObject.tableFilter($('.table_req_filter'));

                    /** 重新初始化单双号码样色和文字 */
                    historyList.initColorAndFont();

                    publicObject.deleteLoading($("#loading"));
                    $("#loading").html('');
                },
                error:function (err) {
                    console.log(err);
                }
            })

            /**  同时还要给冠亚龙虎加载历史数据 */
            $.ajax({
                url: '/pk10/getLongHu',
                type:'GET',
                dataType: "html",
                data:{
                    date: $('#date').val().replace(/-/g, "/")
                },
                success:function (data) {

                    $(".app_public_tableBlock").eq(1).find("table").remove();
                    $(".app_public_tableBlock").eq(1).append(data);

                    /** 切换龙虎 */
                    if($('.Switch_btn').hasClass('active')){
                        historyList.changeLongHu();
                    }

                    /** 历史开奖---显示条件筛选 */
                    publicObject.tableFilter($('.table_req_filter'));

                    /** 重新初始化单双号码样色和文字 */
                    historyList.initColorAndFont();

                    publicObject.deleteLoading($("#loading"));
                    $("#loading").html('');
                },
                error:function (err) {
                    console.log(err);
                }
            })
        });

        /**  倒计时开奖 */
        awardtimer.start("pk10", function(result){
            if(result.current.date == $('#date').attr("date")){
                historyList.mosaicHtml(result);
                historyList.mosaicHtml2(result);
            }
        });


        /** 分组选择, 原后激活号码 */
        $(".app_table_requirement li span").click(function () {
            var recovery = $(".app_table_requirement ul").find("span[data-group='clear']");
            var group = $(this).attr("data-group");
            if (group == "clear") {
                $(this).parent().parent().find("span").removeClass("active");
                $(this).removeClass("fontOrange");
                historyList.activeSelected();
            } else {
                recovery.addClass("fontOrange");
                $(this).parents().find("span[data-group='" + group + "']").not(this).removeClass("active");
                $(this).toggleClass("active");
                var count = $(".app_table_requirement li span.active").length;
                if(count == 0){
                    recovery.removeClass("fontOrange");
                }
                historyList.activeSelected();
            }
        });


        /** 点击大小 */
        historyList.clickDxButton();

    }


    module.exports=object;   //直接把整个模块对象导出;
})


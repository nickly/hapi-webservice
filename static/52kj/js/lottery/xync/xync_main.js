/**=============================================================
 *                                                         幸运农场主js
 * =============================================================
 */

define(function(require, exports, module) {

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('../../public/index');
    /**  多页面调用的复用代码 */
    var common = require('../../common/index');
    /**  倒计时模块 */
    var awardtimer = require('public/awardtimer');
    var main = {};

    main.setting = {
        page: "history", //彩种code
        tagId: "", //选择页面数据元素ID 带#号
        dateCallback: null, //选择日期回调
        atCallback: null //倒计时回调
    };

    /**
     * 初始化函数;
     * @param：
     */
    main.init = function(options) {
        $.extend(this.setting, options || {});
        common.multiplexing();


        if (this.setting.page !== "video") {
            /** 初始化导航 */
            publicObject.initHeaderSwiper($("#app_swiperSelect"));
            /**选中彩种*/
            publicObject.checkLotteryNav();

            main.dateWindow();



            /** 设置数据功能按钮选中*/
            $("#" + this.setting.page + "Link").addClass("active");
            //publicObject.moveHeader();
        }

        /** 开奖倒计时 结束执行 */
        awardtimer.start("xync", function(result) {
            if (typeof main.setting.atCallback === 'function') {
                main.setting.atCallback(result);
            } else {
                main.dfAtCallback(result);
            }
        });

        switch (this.setting.page) {
            case "history":
                this.historyInit();
                break;
            case "bigorsmall":
                this.luZhuInit();
                break;
            case "total":
                this.luZhuInit();
                break;
            case "video":
                break;
            case "betGame":
                break;
        }
    }

    /**
     * 路珠页面table滚动效果初始化;
     * @param：
     */
    main.luZhuInit = function() {
        /** 给每个路珠绑定滚动方法 */
        $(".app_luZhu_list").each(function(index, item) {
            publicObject.swiperForTable($(item), 600);
        });
        publicObject.swiperForDoument();
    }

    /**
     * 历史开奖初始化;
     * @param：
     */
    main.historyInit = function() {
        /***************************筛选按钮事件Start**************************** */
        // $(".table_req_filter").click(function() {
        //     $(".app_table_requirement").toggle();
        //     $(this).addClass("active");
        //     $(this).find(".table_requirement").css("display","block");
        // });

        $(".table_req_filter").click(function () {

            if($(this).hasClass('active')){

                $(this).removeClass("active");
                $(".app_table_requirement").hide();
                $(this).find(".table_requirement").css("display", "none");

            }else{

                $(this).addClass("active");
                $(".app_table_requirement").show();
                $(this).find(".table_requirement").css("display", "block");
            }

        });
        /***************************筛选按钮事件End**************************** */
    }


    /**
     * 选择日期;
     * @param：
     */
    main.dateWindow = function() {
        var _this = this;

        /** 头部功能块---选择时间 */
        publicObject.createDateWindow($('#date'), _this.setting.page === "history" ? 1 : 2, callback);
    }

    /**
     * 倒计时默认回调处理函数;
     * @param：
     */
    main.dfAtCallback = function(result) {
        var _this = this;
        var date = $("#date").val();
        var current = result.current;
        if (date === current.date) {
            callback(date);
        }
    }

    function callback(date) {
        publicObject.createLoading($('#loading'));
        $.get('/xync/' + main.setting.page + '?date=' + date, function(html) {
            $(main.setting.tagId).html($(html).find(main.setting.tagId).html());
            if (main.setting.dateCallback) {
                main.setting.dateCallback();
            }
            publicObject.deleteLoading($('#loading'));
        });
    }

    module.exports = main; //直接把整个模块对象导出;
});
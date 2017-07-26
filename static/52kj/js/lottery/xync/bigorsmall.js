/**=============================================================
 *                                                         幸运农场大小单双路珠js代码
 * =============================================================
 */

define(function(require, exports, module) {
    var exprotObj = {};
    var selected = {};
    /** 调用公共库 */
    var publicObject = require('../../public/index');
    /**
     * 初始化函数;
     * @param：
     */
    exprotObj.init = function() {

        //选择求号或大小单双
        $(".app_selectBlockNavCons li").click(function() {

            var selectText = $(this).text();
            var selectItem = $(this).parent().attr("data-attr");
            $(this).parents().find("span[data-attr='" + selectItem + "']").html(selectText + "<i></i>");


            $(this).parent().find('li.active').removeClass("active");
            $(this).addClass("active");
            $(".app_selectBlockNavCons").hide();
            $('#app_selectBlockNav  .app_selectBlockNav_lis').removeClass('app_selectBlockNav_active');
            publicObject.deleteMaskLayer($('.app_public_maskLayer'));
            filterLuzhu();
        });

    }

    /**
     * 路珠页面table滚动效果初始化;
     * @param：
     */
    exprotObj.luZhuTableInit = function() {

        /** 给每个路珠绑定滚动方法 */
        $(".app_luZhu_list").each(function(index, item) {
            publicObject.swiperForTable($(item), 600);


        });
        publicObject.swiperForDoument();
        filterLuzhu();
    }

    /**筛选路珠 */
    function filterLuzhu() {

        $(".app_selectBlockNavCons ul").each(function() {
            var name = $(this).attr("data-attr");
            $(this).find("li.active").each(function() {
                selected[name] = $(this).text();
            });
        });
        //"球号":"第一球","两面":"全部两面"
        $(".app_luZhu_Block").each(function() {
            var selector = $(this).attr("data-attr");

            var startsWith = selected["球号"] == "全部球号" ? true : selector.indexOf(selected["球号"]) != -1;
            var endsWith = selected["两面"] == "全部两面" ? true : selector.indexOf(selected["两面"]) != -1;

            if (startsWith && endsWith) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    exprotObj.atInsertResult = function(data) {
        var current = data.current;
        var date = $("#date").val();
        if (date === current.date) {
            var nums = current.award.split(',');
            for (var i = 0; i < nums.length; i++) {
                var num = nums[i];

            }
        }
    }


    module.exports = exprotObj; //直接把整个模块对象导出;
});
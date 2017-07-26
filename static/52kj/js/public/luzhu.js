/**=============================================================
 * 大小单双路珠
 * =============================================================
 */

define(function (require, exports, module) {

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('public/index');
    var exprotObj = {};
    var selected = {};

    /**筛选路珠 */
    exprotObj.filterLuzhu = function () {

        $(".app_selectBlockNavCons ul").each(function () {
            var name = $(this).attr("data-attr");
            $(this).find("li.active").each(function () {
                selected[name] = $(this).text();
            });
        });

        //"球号":"第一球","两面":"全部两面"

        $(".app_luZhu_Block").each(function () {
            var selector = $(this).attr("data-attr");

            var startsWith = selected["球号"] == "全部" ? true : selector.indexOf(selected["球号"]) != -1;
            var endsWith = selected["两面"] == "全部" ? true : selector.indexOf(selected["两面"]) != -1;

            if (startsWith && endsWith) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    /**
     * 初始化函数;
     * @param：isCondion 是否有筛选条件，true是
     */
    exprotObj.init = function (isCondion) {
        /** 给每个路珠绑定滚动方法 */
        $(".app_luZhu_list").each(function (index, item) {
            publicObject.swiperForTable($(item), 60);
        });

        //选择求号或大小单双
        $(".app_selectBlockNavCons li").click(function () {

            var selectText = $(this).text();
            var selectItem = $(this).parent().attr("data-attr");

            if (selectText == '全部')
                selectText = $(this).parents().find("span[data-attr='" + selectItem + "']").attr("data-default");

            $(this).parents().find("span[data-attr='" + selectItem + "']").html(selectText + "<i></i>");


            $(this).parent().find('li.active').removeClass("active");
            $(this).addClass("active");
            $(".app_selectBlockNavCons").hide();
            $('#app_selectBlockNav  .app_selectBlockNav_lis').removeClass('app_selectBlockNav_active');
            publicObject.deleteMaskLayer($('.app_public_maskLayer'));

            if (isCondion) {

                exprotObj.filterLuzhu();
            }
            $(".app_NoMoblie").css({ "overflow": "" });

        });
        publicObject.swiperForDoument(); 
    }





    module.exports = exprotObj;   //直接把整个模块对象导出;
});

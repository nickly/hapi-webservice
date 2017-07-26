/**=============================================================
 *                                                         幸运农场总和路珠js代码
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

        /**初始日期范围控制*/
        publicObject.initDateMaxMin("m",1);
    }

    /**
     * 路珠页面table滚动效果初始化;
     * @param：
     */
    exprotObj.luZhuTableInit = function() {
        /** 给每个路珠绑定滚动方法 */
        $(".app_luZhu_list").each(function(index, item) {
            publicObject.swiperForTable($(item), 600);

        })
        publicObject.swiperForDoument()
    }

    module.exports = exprotObj; //直接把整个模块对象导出;
});
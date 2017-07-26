/**=============================================================
 *                                                         单双大小路珠js代码
 * =============================================================
 */

define(function(require,exports,module){

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('../../public/index.js');
    /**  多页面调用的复用代码 */
    var common        = require('../../common/index');

    var object ={};


    /**
     * 初始化函数;
     * @param：
     */
    object.init = function () {

        common.multiplexing();

        /** 初始化导航 */
        publicObject.initHeaderSwiper($("#app_swiperSelect"));

        /** 头部功能块---选择时间 */
        publicObject.createDateWindow($('#date'));

        /** 给每个路珠绑定滚动方法 */
        $(".app_luZhu_list").each(function (index,item) {
              publicObject.swiperForTable($(item),600);
        })
    }

    module.exports=object;   //直接把整个模块对象导出;
})


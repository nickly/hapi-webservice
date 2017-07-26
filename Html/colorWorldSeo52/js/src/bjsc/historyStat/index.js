/**=============================================================
 *                                                         历史开奖统计js代码
 * =============================================================
 */

define(function(require,exports,module){

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('../../public/index.js');
    /**  多页面调用的复用代码 */
    var common        = require('../../common/index')

    var object ={};


    /**
     * 初始化函数;
     * @param：
     */
    object.init = function () {

        common.multiplexing();

        /** 初始化导航 */
        publicObject.initHeaderSwiper($("#app_swiperSelect"));

        /** 滚动方法 */
        publicObject.swiperForTable($("#result"),600, false);

        /** 头部功能块---选择时间 */
        publicObject.createDateWindow($('#date'));

    }

    module.exports=object;   //直接把整个模块对象导出;
})


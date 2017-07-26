/**=============================================================
 *                                                         首页js代码
 * =============================================================
 */

define(function(require,exports,module){

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('../public/index.js');
    /**  多页面调用的复用代码 */
    var common        = require('../common/index')

    var object ={};

    /**
     * 初始化函数;
     * @param：
     */
    object.init = function () {

        common.multiplexing();

        /** 初始化广告轮播图 */
        publicObject.initSwiper($('#app_swiperContainer'),3000);

    }

    module.exports=object;   //直接把整个模块对象导出;
})

/**=============================================================
 *                                                         免费参考 js代码
 * =============================================================
 */

define(function(require,exports,module){

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('public/index.js');
    /**  多页面调用的复用代码 */
    var common        = require('common/index');

    var awardtimer = require('public/awardtimer');

    var object ={};


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

        awardtimer.start("pk10", object.refresh);

        publicObject.moveHeader();
        
    }
    /*
    * 开奖更新数据
     */
    object.refresh = function() {
      var setTime = setTimeout(function(){
            /** 添加loading */
            publicObject.createLoading($('#loading'));

            $.get('/pk10/gethotcoldnumber', function(html) {
                $('#data_result').html(html);
                /** 滚动方法 */
                //publicObject.swiperForTable($("#data-result"),600, false);
                publicObject.deleteLoading($('#loading'));
                
                if(setTime){
                    clearTimeout(setTime);
                }
            });
       } ,10000);
    }

    module.exports=object;   //直接把整个模块对象导出;
})

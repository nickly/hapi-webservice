/**=============================================================
 * 大小单双路珠
 * =============================================================
 */

define(function (require, exports, module) {

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('public/index');
    /**  多页面调用的复用代码 */
    var common = require('common/index');
     /**  多页面调用的复用代码 */
    var luzhu = require('public/luzhu');
    
    var awardtimer = require('public/awardtimer');

    var exprotObj = {};
    var selected = {};
    var date= new Date();
    /**
     * 初始化函数;
     * @param：
     */
    exprotObj.init = function () {
        common.multiplexing();
        /** 初始化导航 */
        publicObject.initHeaderSwiper($("#app_swiperSelect"));
        /**选中彩种*/
        publicObject.checkLotteryNav();
        publicObject.moveHeader();
         /** 头部功能块---选择时间 */
        publicObject.createDateWindow($('#date'),2,function(){
            $('#date').attr("date",$('#date').val());
        	date = $('#date').val();
        	exprotObj.refresh(true);
            return false;
        });

        awardtimer.start("pk10", function(result){
            if(result.current.date == $('#date').attr("date")){
                exprotObj.refresh(false);
            }
        });

        //路珠
        luzhu.init(false);
  		
    }
	exprotObj.refresh=function(bflag){
		if(bflag){
    		exprotObj.loadData();
		}else{
			var setTime = setTimeout(function(){
				exprotObj.loadData();
				if(setTime){
                    clearTimeout(setTime);
                }
			},10000)
		}
    }
 	exprotObj.loadData=function()
    {
        /** 添加loading */
        publicObject.createLoading($('#loading'));

    	$.get('/pk10/getguanyahe?date='+date, function(html) {
            $('#data_result').html(html);
            $(".app_luZhu_list").each(function (index, item) {
                 publicObject.swiperForTable($(item), 600);
            });
            publicObject.deleteLoading($('#loading'));
         });
    }
    module.exports = exprotObj;   //直接把整个模块对象导出;
});

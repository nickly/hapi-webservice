/**=============================================================
 *                                                         杀号定胆js代码
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
        /** 滚动方法 */
        publicObject.swiperForTable($("#result"),600, false);

        awardtimer.start("pk10", function(result){
            object.refresh(false);
        });

        publicObject.moveHeader();

        publicObject.swiperForDoument(); 
        this.ballclick();
        this.countclick();
    }
    /*
    * 开奖or条件筛选 更新数据 bflag true及时更新，否则视为开奖自动更新(等待10秒)
     */
    object.refresh = function(bflag) {
        var issue =  $("#spIssue").attr("data-issue");
        var ball = $("#spBall").attr("data-ball");
        //console.log("ball:"+ball+" - issue:"+issue)

        //publicObject.deleteMaskLayer($(".app_public_maskLayer"));
        
        if(bflag){
            object.loadData(issue,ball,null)
        }else{
            var setTime = setTimeout(function(){
                object.loadData(issue,ball,setTime);
            } ,10000);   
        }
        $(".app_NoMoblie").css({"overflow":""});
        $(".app_selectBlockNavCons").hide();
        $('#app_selectBlockNav  .app_selectBlockNav_lis').removeClass('app_selectBlockNav_active');
        publicObject.deleteMaskLayer($('.app_public_maskLayer'));
    }
    /**
     * 加载数据
     * @param  issue 期数
     * @param  {[type]} ball   球号
     * @param  {[type]} setTime 计数器
     */
    object.loadData=function(issue,ball,setTime)
    {
         /** 添加loading */
        publicObject.createLoading($('#loading'));
        
        $.get('/pk10/getkillnumber?count='+issue+"&ball="+ball, function(html) {
                $('#data_result').html(html);
                /** 滚动方法 */
                publicObject.swiperForTable($("#result"),600, false);

                publicObject.swiperForDoument(); 

                publicObject.deleteLoading($('#loading'));

                if(setTime){
                    clearTimeout(setTime);
                }
            });
    }
    /**
     * 位置筛选
     */
    object.ballclick=function() {
        $("#chkBall li").bind("click",function(index) {
            $("#chkBall li").removeClass("active");
            $("#spBall").attr("data-ball",$(this).attr("data-ball"));
            $("#spBall").html($(this).find("span").text()+"<i></i>");
            $(this).addClass("active");
            object.refresh(true);
        });
        
    }
    /**
     * 期数筛选
     */
    object.countclick=function() {
         $("#chkIssue li").bind("click",function(index) {
             $("#chkIssue li").removeClass("active");
            $("#spIssue").attr("data-issue",$(this).attr("data-issue"));
            $("#spIssue").html("近"+$(this).find("span").text()+"<i></i>");
            $(this).addClass("active");
            object.refresh(true);
        });
    }
    module.exports=object;   //直接把整个模块对象导出;
})
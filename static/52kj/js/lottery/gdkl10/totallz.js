seajs.use('lottery/gdkl10/public/index', function (index) {
    $(document).ready(function () {

        index.init();

        index.lunzhuswiper();/** 给每个路珠绑定滚动方法 */

        //日期选择 
        index.selectDay("gettotallz",2, function (data) {
            $(".app_luZhu_Scope").html(data);
            index.lunzhuswiper();
        });

        //开奖倒计时回调 
        index.countdownTime(function (data) {
           
                index.getHtmlByDay(function (html) {
                    $(".app_luZhu_Scope").html(data);
                    index.lunzhuswiper();
                })
            
        });
    })
});
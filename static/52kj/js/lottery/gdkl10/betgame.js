seajs.use('lottery/gdkl10/public/index', function (index) {
    $(document).ready(function () {
        index.init();
        $(".header_date").hide();

        //开奖倒计时回调
        index.countdownTime(function (data) {
              index.ajaxHtml("getbetgame",{},function(html){
                    $(".app_referralProgram").html(html);
              });
         }); 
    }); 
});
 
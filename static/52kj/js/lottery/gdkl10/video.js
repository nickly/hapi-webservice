seajs.use('lottery/gdkl10/public/index', function (index) {
    $(document).ready(function () { 
        index.init();
        $(".header_date").hide();  
    })
});
/**=============================================================
 *                                                         历史开奖公共js代码
 * =============================================================
 */
define(function(require,exports,module){

    require('jquery');
    /** 调用公共库 */

    var publicObject = require('public/index');

    var object ={};

    /** 筛选状态对象 */
    object.selectedNum = [];

    /**选中号码 */
    object.activeSelected =function () {

        var groupOpt = { "单": [1, 3, 5, 7, 9], "双": [2, 4, 6, 8, 10], "大": [6, 7, 8, 9, 10], "小": [1, 2, 3, 4, 5] };


        var selected = [];
        var selectedNum = [];

        $(".app_table_requirement li span.active").each(function () {

            var text = $(this).attr('textValue');
            if (isNaN(text)) {
                //取交集
                if (selected.length == 0) {
                    selected = groupOpt[text];
                }
                else {
                    //ie8 不支持filter
                    selected = selected.filter(function (v) {
                        return groupOpt[text].indexOf(v) != -1;
                        //return $.inArray(v, selected) != -1 && $.inArray(v, groupOpt[text]) != -1;
                    });
                }
            } else {
                selectedNum.push(parseInt(text));
            }
        });

        selected = selected.concat(selectedNum);
        //selected = $.unique(selected);//不去重也可以
        /** 用于倒计时的时候插入判断当前那几个被选中了 */
        object.selectedNum = selected;

        if(selected.length==0){
            $(".app_lotterySection li").each(function (index,item) {
                $(item).find('span').removeClass('noBg');
                $(item).find('span').attr('ishasbg',true);
            });
            return;
        }

        $(".app_lotterySection li").each(function (index,item) {

            var hit = parseInt($(item).find('span').attr('datatype'));
            if ($.inArray(hit, selected) == -1) {
                $(item).find('span').addClass('noBg');
                $(item).find('span').attr('ishasbg',false);
            } else {
                $(item).find('span').removeClass('noBg');
                $(item).find('span').attr('ishasbg',true);
            }
        });
    }



    /**  大小单双切换方法 */
    object.clickDxButton = function () {


        /**  当点选了号码按钮进行切换的时候  */
        $(".container").on('click',".app_table_menuBlock span i[data-type='number']",function () {

            if($(".app_hiddenMesk")!=undefined){
                $(".app_hiddenMesk").hide();
            }
            $(".app_table_menuBlock span.table_req_filter").removeClass("noTouch");
            $(".app_table_menuBlock span i").removeClass('active');
            $(this).addClass('active');

            if(object.selectedNum.length!=0){
                $(".app_table_requirement li").each(function (index,item) {
                    if($(item).find('span').attr('isActive')=='true'){
                        $(item).find('span').addClass('active');
                        $(item).find('span').removeAttr('isActive');
                    }
                })
            }
            object.activeSelected();

            $('.app_lotterySection').removeAttr('class').addClass('app_lotterySection  app_lotteryStyle1');

            $(".app_lotterySection span").each(function (index,item) {
                if(!$(item).hasClass('noBg')){
                    $(item).removeAttr('class').addClass($(item).attr('numberclass'));
                }else{
                    $(item).removeAttr('class').addClass($(item).attr('numberclass')+" noBg");
                }
                $(item).html($(item).attr('datatype'));
            })

        })


        /**  当点选了大小按钮进行切换的时候  */
        $(".container").on('click',".app_table_menuBlock span i[data-type='dx'], .app_table_menuBlock span i[data-type='ds']",function () {

            if($(".app_hiddenMesk")!=undefined){
                $(".app_hiddenMesk").hide();
            }

            var _this = $(this);

            /**  移除样式 */
            $(".app_table_menuBlock span.table_req_filter").removeClass("noTouch");
            $(".app_table_menuBlock span i").removeClass('active');
            $(this).addClass('active');

            if(object.selectedNum.length!=0){
                $(".app_table_requirement li").each(function (index,item) {
                    if($(item).find('span').attr('isActive')=='true'){
                        $(item).find('span').addClass('active');
                        $(item).find('span').removeAttr('isActive');
                    }
                })
            }
            object.activeSelected();


            /**  列表父级修改样式 */
            $('.app_lotterySection').removeAttr('class').addClass('app_lotterySection  app_lotteryStyle2')

            /** 遍历改变成大小单双列表 */
            $(".app_lotterySection span").each(function (index,item) {

                if(_this.attr('data-type')=='dx'){

                    /** 查询是否有背景 */
                    if($(item).attr('ishasbg')=='true'){
                        $(item).removeAttr('class').addClass($(item).attr('dxclass'));
                    }else{
                        $(item).removeAttr('class').addClass($(item).attr('dxclass')+' noBg');
                    }

                    $(item).html($(item).attr('dxtype'));
                }else{

                    /** 查询是否有背景 */
                    if($(item).attr('ishasbg')=='true'){
                        $(item).removeAttr('class').addClass($(item).attr('dsclass'));
                    }else{
                        $(item).removeAttr('class').addClass($(item).attr('dsclass')+' noBg');
                    }

                    $(item).html($(item).attr('dstype'));
                }

            })
        })


        /**  当点选了对子进行切换的时候  */
        $(".container").on("click",".app_table_menuBlock span i[data-type='dz']",function () {

            if($(".app_hiddenMesk")!=undefined){
                $(".app_hiddenMesk").show();
            }

            /**  移除样式 */
            $(".app_table_menuBlock span i").removeClass('active');
            $(".app_table_requirement").hide();
            $(".app_table_menuBlock span.table_req_filter").removeClass('active');
            $(".app_table_menuBlock span.table_req_filter").addClass("noTouch");
            $(".app_table_menuBlock .table_requirement").hide();
            $(this).addClass('active');

            /**  记录导航状态 */
            $(".app_table_requirement  li").each(function (index,item) {
                if($(item).find('span').hasClass('active')){
                    $(item).find('span').attr('isActive',true);
                }
            })

            /**  清除导航样式 */
            $(".app_table_requirement  li span").removeClass('active');

            /**  列表父级修改样式 */
            $('.app_lotterySection').removeAttr('class').addClass('app_lotterySection  app_lotteryStyle1');

            /** 遍历还原号码 */
            $(".app_lotterySection span").each(function (index,item) {
                $(item).removeAttr('class').addClass('num'+$(item).attr('datatype')+' bg  noBg').attr('ishasbg',false).html($(item).attr('datatype'));
            })

            /** 遍历列表 */
            for(var i =0; i<10; i++){
                $(".app_public_tableBlock").eq(0).find("table tr").each(function (index,item) {
                    if(index !=0){
                        if($(item).find('.app_lotterySection li span').eq(i).attr('datatype')==$(item).next().find('.app_lotterySection li span').eq(i).attr('datatype')){
                            $(item).find('.app_lotterySection li span').eq(i).removeClass('noBg').attr('ishasbg',true);
                            $(item).next().find('.app_lotterySection li span').eq(i).removeClass('noBg').attr('ishasbg',true);
                        }
                    }
                })
            }
        })
    }



    /**  初始化大小单双的颜色值和大小单双的文字，临时放到属性中 */
    object.initColorAndFont = function () {
        $(".app_lotterySection span").each(function (index,item) {
            if(parseInt($(item).attr('datatype')) > 5){

                if(parseInt($(item).attr('datatype')) % 2 == 0 ){
                    $(item).attr({'dxclass':'orangeBg','dsclass':'blueBg', 'dxtype': '大', 'dstype':'双', 'ishasbg': true});
                }else{
                    $(item).attr({'dxclass':'orangeBg','dsclass':'orangeBg', 'dxtype': '大', 'dstype':'单', 'ishasbg': true});
                }

            }else{

                if(parseInt($(item).attr('datatype')) % 2 == 0 ){
                    $(item).attr({'dxclass':'blueBg','dsclass':'blueBg', 'dxtype': '小', 'dstype':'双', 'ishasbg': true});
                }else{
                    $(item).attr({'dxclass':'blueBg','dsclass':'orangeBg', 'dxtype': '小', 'dstype':'单', 'ishasbg': true});

                }
            }
        })
    }


    /** 拼接历史开奖字符串 */
    object.mosaicHtml = function (data){

        var awardArray = data.current.award.split(',');
        var awardString = "";
        var  newDateObject=[];

        /** 查看那个选择被点击了 */
        var datatype;
        $(".app_table_menuBlock span").each(function (index,item) {
            if($(item).find('i').hasClass('active')){
                datatype = $(item).find('i').attr('data-type');
            }
        })

        var tempObject = {};

        /**  插入之前判断这条新开奖数据的数据类型 */
        for(var i=0; i<awardArray.length; i++){
            if(parseInt(awardArray[i]) > 5){
                if(parseInt(awardArray[i]) % 2 == 0){
                    tempObject = {datatype:awardArray[i], dxclass: "orangeBg", dsclass:'blueBg', dxtype: "大" , dstype: "双", ishasbg : "false"};
                }else{
                    tempObject = {datatype:awardArray[i], dxclass: "orangeBg", dsclass:'orangeBg', dxtype: "大" , dstype: "单", ishasbg : "false"};
                }
            }else{
                if(parseInt(awardArray[i]) % 2 == 0){
                    tempObject = {datatype:awardArray[i], dxclass: "blueBg", dsclass:'blueBg', dxtype: "小" , dstype: "双" ,ishasbg : "false"};
                }else{
                    tempObject = {datatype:awardArray[i], dxclass: "blueBg", dsclass:'orangeBg', dxtype: "小" , dstype: "单" ,ishasbg : "false"};
                }
            }
            newDateObject.push(tempObject);
        }

        /**  拼接字符串 */
        awardString += "<tr><td>" + data.current.period + "</td>";
        awardString+="<td>"+data.current.time+"</td><td><div class='app_lotterySection  app_lotteryStyle1'><ul>";

        for(var i=0;  i< awardArray.length; i++){
            if(newDateObject[i].ishasbg=='true'){
                awardString += "<li><span class='num" + awardArray[i] + " bg'  numberclass='num" + awardArray[i] + " bg'  datatype='" + awardArray[i] + "'  dxclass='"+newDateObject[i].dxclass+"'  dsclass='"+newDateObject[i].dsclass+"'  dxtype='"+newDateObject[i].dxtype+"'  dstype='"+newDateObject[i].dstype+"'  ishasbg='"+newDateObject[i].ishasbg+"'>" + awardArray[i] + "</span></li>";
            }else{
                awardString += "<li><span class='num" + awardArray[i] + " bg  noBg'  numberclass='num" + awardArray[i] + " bg'  datatype='" + awardArray[i] + "'  dxclass='"+newDateObject[i].dxclass+"'  dsclass='"+newDateObject[i].dsclass+"'  dxtype='"+newDateObject[i].dxtype+"'  dstype='"+newDateObject[i].dstype+"'  ishasbg='"+newDateObject[i].ishasbg+"'>" + awardArray[i] + "</span></li>";
            }
        }
        awardString += "</ul></div></td></tr>";

        if($('.app_public_tableBlock').eq(0).find('table tr').eq(1).find('td').eq(0).html()!=(""+data.current.period)){
            $('.app_public_tableBlock').eq(0).find('table tr:first-child').after(awardString);
        }

        if(datatype == 'number'){

            $(".app_table_menuBlock span i[data-type='number']").click();

        }else if(datatype == 'dx'){

            $(".app_table_menuBlock span i[data-type='dx']").click();

        }else if(datatype == 'ds'){

            $(".app_table_menuBlock span i[data-type='ds']").click();

        }else if(datatype == 'dz'){

            $(".app_table_menuBlock span i[data-type='dz']").click();

        }

    }


    /**  拼接龙虎字符串 */
    object.mosaicHtml2=function(data){

        var awardString = "";
        awardString += "<tr><td>" + data.current.period + "</td>";
        awardString +="<td>"+data.current.time+"</td><td><span class='table_history_kaijiang  historyGuanYaHe'></span><td>";
        awardString += '<span style="display: none;"  class="historyLonghu">'+data.current.award+'</span><span class="table_history_kaijiang  longhu"></span>';
        awardString += "</td></tr>";

        if($('.app_public_tableBlock').eq(1).find('table tr').eq(1).find('td').eq(0).html()!=(""+data.current.period)){
            $('.app_public_tableBlock').eq(1).find('table tr:first-child').after(awardString);
        }

        /**  解析数据 */
        object.analysis(0,  $('.app_public_tableBlock').eq(1).find('table tr:nth-child(2) .historyLonghu')[0]);

    };


    /**  切换龙虎  */
    object.clickChangeLongHu = function () {

        $('.Switch_btn').click(function () {

            publicObject.createLoading($('#loading'));

            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $(".app_public_tableBlock").eq(0).show();
                $(".app_public_tableBlock").eq(1).hide();

            }else{
                $(this).addClass('active');
                $(".app_public_tableBlock").eq(0).hide();
                $(".app_public_tableBlock").eq(1).show();
                /**  切换龙虎 */
                object.changeLongHu();
            }

            /** 解析完把loading清掉 */
            window.setTimeout(function () {
                publicObject.deleteLoading($('#loading'));
                $('#loading').html('');
                $('#loading').removeAttr('style');
            },610);

        })
    }


    /** 切换龙虎 */
    object.changeLongHu = function () {

        $('.app_public_tableBlock').eq(1).find('.historyLonghu').each(function (index,item) {
            /**  解析数据 */
            object.analysis(index, item);
        })
    }


    /**  解析数据 */
    object.analysis = function (index,item) {
        var tempI = $(item);
        var tempStr ='';
        if(tempI.html()!='' || tempI.html()!=undefined){
            var tempArray = tempI.html().split(",");
            var plusAnd    =  parseInt(tempArray[0]) + parseInt(tempArray[1]);
            var largeOrSmall;
            var singleOrDouble;
            if(plusAnd > 11){
                largeOrSmall = "大";
            }else{
                largeOrSmall = "小";
            }
            if(plusAnd % 2 ==0){
                singleOrDouble = "双";
            }else{
                singleOrDouble = "单";
            }

            for(var i=0; i<tempArray.length; i++){
                if(i < (tempArray.length / 2 )){
                    if(parseInt(tempArray[i]) > parseInt(tempArray[tempArray.length -(i+1)])){
                        tempStr +='<i class="orange">龍</i>';
                    }else{
                        tempStr +='<i class="blue">虎</i>';
                    }
                }else{
                    break;
                }
            }
            $(item).next().html(tempStr);
            if(largeOrSmall=='大'){
                if(singleOrDouble=='双'){
                    $(item).parent().prev().find('.historyGuanYaHe').html('<i>'+plusAnd+'</i><i class="orange">'+largeOrSmall+'</i><i class="blue">'+singleOrDouble+'</i>');
                }else{
                    $(item).parent().prev().find('.historyGuanYaHe').html('<i>'+plusAnd+'</i><i class="orange">'+largeOrSmall+'</i><i class="orange">'+singleOrDouble+'</i>');
                }
            }else{
                if(singleOrDouble=='双'){
                    $(item).parent().prev().find('.historyGuanYaHe').html('<i>'+plusAnd+'</i><i class="blue">'+largeOrSmall+'</i><i class="blue">'+singleOrDouble+'</i>');
                }else{
                    $(item).parent().prev().find('.historyGuanYaHe').html('<i>'+plusAnd+'</i><i class="blue">'+largeOrSmall+'</i><i class="orange">'+singleOrDouble+'</i>');
                }
            }
        }

    }


    module.exports=object;   //直接把整个模块对象导出;
})

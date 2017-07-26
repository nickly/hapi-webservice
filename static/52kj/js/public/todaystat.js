/**=============================================================
 * 今日号码统计
 * =============================================================
 */

define(function (require, exports, module) {

    require('jquery');
     /** 调用公共库 */
    var publicObject = require('public/index.js');

	var exprotObj = {};
 		
    exprotObj.init=function()
    {

        var numberClone = $("#result tbody").clone();
        var numbers = numberClone.find("tr td span:not('.titleBg')");


        var inputs = $("#iptText input[type='number']");
        var data = JSON.parse($("#_colors").val());
        var rang = [2, 500];  

        var numberLen = numbers.length, temp = "", r = false, tempnumber = 0;
        var i = 0, len = 0, j = 0, temp_min = 0, temp_max = 0, checkTip = "输入错误";
        $("#iptText input").focus(function(){
			$("#tipResult").html("");
        });
         $("#iptText input").blur(function(){
            var ipt = $(this).val();
            if(ipt=="" || ipt==null){
                $(this).val('0');
            }
        });
        var popData=[15,100,0,0,0,0];

        $("#today_ok").click(function(){

                    exprotObj.clearColor(numberClone);

                    inputs.each(function(i){
                        popData[i] = Number($(this).val());
                    });
                    
                    i = len = j = temp_min = temp_max = 0, checkTip = "输入错误";
                    var bflag=true;

                    var _min=0;
                    var _max=0;

                    for (i = 0, len = data.length; i < len; i++) {
                        check = "输入错误";
                        temp_min = popData[i * 2];
                        temp_max = popData[i * 2 + 1];

                        if (!isNaN(temp_min) && !isNaN(temp_max)) {

                            temp_min = Number(temp_min);
                            temp_max = Number(temp_max);

                            if (temp_min == 0 && temp_max == 0) {
                                checkTip = i == 0 ? "最少要有一个数值范围" : "";
                            }
                            else {
                                if (temp_min >= rang[0] && temp_max <= rang[1]) {
                                    if (temp_min <= temp_max) {

                                        for (var m = 0; m < data.length; m++) {
                                            _min = popData[m * 2];
                                            _max = popData[m * 2+1];

                                            if(m>0 && i!=m){
                                                  if((temp_min>=_min && temp_min<=_max) || (temp_max>=_min && temp_max<=_max)){
                                                    bflag=false;
                                                    break;
                                                  }
                                                  else if(temp_min<=_min && temp_max>=_min){
                                                    bflag=false;
                                                    break;
                                                  }else{
                                                    bflag = true;
                                                  }
                                              }
                                        }
                                        if (!bflag) {
                                            checkTip = "数值范围重叠";
                                        }
                                        else {
                                            checkTip = "";
                                        }
                                    }
                                    else {
                                        checkTip = "数值范围输入错误";
                                    }
                                }
                                else {
                                    checkTip = "数值范围输入错误";
                                }
                            }
                        };
                        if (!checkTip == "") {
                            break;
                        }
                        else {
                            data[i].min = temp_min;
                            data[i].max = temp_max;
                        }
                    }

                    if (checkTip=="") {
                        $(".app_public_setBlock").hide();
                         /** 添加loading */
                        publicObject.createLoading($('#loading'));

                        for (j = 0; j < numberLen; j++) {
                            r = false;
                            temp = numbers[j];
                            tempnumber = Number(temp.innerText);
                            
                            for (i = 0; i < len; i++) {
                                if (data[i].min == 0 || data[i].max == 0) {
                                    break;
                                }

                                if (tempnumber >= data[i].min && tempnumber <= data[i].max) {
                                    r = true;
                                    //console.log(data[i].min+" = "+data[i].max+"|"+tempnumber);
                                    break;
                                }
                            }

                            if (r) {
                                temp.style.color = "#" + data[i].color;
                            }
                            
                        }

                        $("#result tbody").html(numberClone[0].innerHTML);
                        $("#tipResult").html("");
                        publicObject.deleteLoading($('#loading'));
                    }
                    else {
                        $("#tipResult").html(checkTip);  
                    }
        });
        $("#today_cancel").click(function(){
            $("#tipResult").html("");
                    //$(".app_public_setBlock").hide();
                    $("#iptText input").each(function(index){
                        if(index==0){
                            $(this).val("15");
                        }else if(index==1){
                            $(this).val("100");
                        }else{
                            $(this).val("0");
                        }
                    });
        });

        $("#tdy_x").click(function(){
             inputs.each(function(i){
                $(this).val(popData[i]);
             });
        })
    
        $("#today_ok").click();
    }
    exprotObj.clearColor=function(obj){
        $(obj).find('span').each(function(){
            if($(this).attr('style')){
                $(this).removeAttr('style');
            }
        });
    }


    module.exports = exprotObj;   //直接把整个模块对象导出;
});

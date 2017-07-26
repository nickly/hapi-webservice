var pathArray = ['public/index', 'common/index'];

seajs.use(pathArray, function (publicObject, common) {

    /** 添加loading */
    publicObject.createLoading($('#loading'));

    $(document).ready(function () {

        common.multiplexing();
        /** 初始化导航 */
        publicObject.initHeaderSwiper($("#app_swiperSelect"));

        /** 滚动方法 */
        publicObject.swiperForTable($("#result"), 600, false);



        var numberClone = $("#result tbody").clone();
        var numbers = numberClone.find("tr td span:not('.titleBg')");


        var inputs = $(".ht_windows .set_content input[type='number']");
        var data = JSON.parse($("#_colors").val());
        var rang = [2, 500]; //(".ht_windows .ht_content").attr("data-rang").split(',');  //[2,500]; 

        var numberLen = numbers.length, temp = "", r = false, tempnumber = 0;
        var i = 0, len = 0, j = 0, temp_min = 0, temp_max = 0, checkTip = "输入错误";
        $(".ht_windows .ht_confirm").click(function () { 
            var ele = event.target;
            if (ele.tagName == "SPAN") {
                if (ele.className == "cancel") {
                    $(".app_public_setBlock").hide();
                }
                else {
                    i = len = j = temp_min = temp_max = 0, checkTip = "输入错误";

                    for (i = 0, len = data.length; i < len; i++) {
                        check = "输入错误";
                        temp_min = inputs[i * 2].value;
                        temp_max = inputs[i * 2 + 1].value;

                        if (!isNaN(temp_min) && !isNaN(temp_max)) {

                            temp_min = Number(temp_min);
                            temp_max = Number(temp_max);

                            if (temp_min == 0 && temp_max == 0) {
                                checkTip = i == 0 ? "最少要有一个数值范围" : "";
                            }
                            else {
                                if (temp_min >= rang[0] && temp_max <= rang[1]) {
                                    if (temp_min < temp_max) {
                                        if (i > 0) {
                                            if (data[i - 1].max < temp_min) {
                                                checkTip = "";
                                            }
                                            else {
                                                checkTip = "数值范围要是连续的";
                                            }
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
                                    break;
                                }
                            }

                            if (r) {
                                temp.style.color = "#" + data[i].color;
                            }   
                        }
                        $("#result tbody").html(numberClone[0].innerHTML);
                    }
                    else {
                        alert(checkTip);
                    }
                }
            }

        })

    })
})
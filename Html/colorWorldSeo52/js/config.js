seajs.config({
    base: "../../js/",    //当前目录
    alias: {
        "jquery": "libs/jquery-1.8.3.min.js",
        "jquery.pin": "libs/jquery.pin.js",
        "lCalendar": "libs/lCalendar.min.js",
        "transform": "libs/transform.js",
        "alloy_finger":"libs/alloy_finger.js",
        "to":"libs/to.js",
        "String":"extensions/String.js"
    },
    map:[
        ["/^(.*\.(?:css|js))(.*)$/i",".js?v="+Math.random()]     //映射规则
    ]
})


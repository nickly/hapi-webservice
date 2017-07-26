seajs.config({
    base: "/static/52kj/js/", //当前目录
    paths: {
        '_libs': '/static/lib/',
        '_ext': '/static/extensions/'
    },
    alias: {
        "jquery": "_libs/jquery-1.8.3.min.js",
        "jquery.pin": "_libs/jquery.pin.js",
        "lCalendar": "_libs/lCalendar.min.js",
        "transform": "_libs/transform.js",
        "alloy_finger": "_libs/alloy_finger.js",
        "Iscroll": "_libs/iscroll-lite.js",
        "to": "_libs/to.js",
        "String": "_ext/String.js",
        "CqsscExtensions": "_ext/CqsscExtensions.js",
        "Gdkl10Extensions": "_ext/Gdkl10Extensions.js",
        "Jsk3Extensions": "_ext/Jsk3Extensions.js",
        "Pk10Extensions": "_ext/Pk10Extensions.js",
        "Array": "_ext/Array.js",
        "Date": "_ext/Date.js",
        "Event": "_ext/Event.js",

    },
    map: [
        ["/^(.*\.(?:css|js))(.*)$/i", ".js?v=" + Math.random()] //映射规则
    ]
})
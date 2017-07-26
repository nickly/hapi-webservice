addEventListener("message", function(evt) {
    var data = evt.data;
    var time = data.time;
    var clock = setInterval(function() {
        time = time - 1;
        if (time <= 0) {
            clearInterval(clock);
            data.time = 0;
        } else
            data.time = time;
        postMessage(data);
    }, 1000);
});
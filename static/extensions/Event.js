define(function(require, exports, module) {

    var Event = {
        on: function(eventName, callback) {
            this[eventName] = this[eventName] || new Array();
            this[eventName].push(callback);
        },

        emit: function(eventName) {
            var params = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
            if (this[eventName]) {
                Array.prototype.forEach.call(this[eventName], function(arg) {
                    arg.apply(this, params);
                });
            }
        }
    }
    module.exports = Event;
})
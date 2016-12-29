System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SingleScore;
    return {
        setters:[],
        execute: function() {
            SingleScore = (function () {
                function SingleScore() {
                    this.multiplyBy = 3;
                }
                SingleScore.prototype.setCurrNum = function (value) {
                    this.currNum = value;
                };
                SingleScore.prototype.calculateScore = function (value) {
                    this.currNum = value;
                    return this.multiplyBy * value;
                };
                SingleScore.prototype.getScore = function () {
                    return this.multiplyBy * this.currNum;
                };
                return SingleScore;
            }());
            exports_1("default", SingleScore);
        }
    }
});

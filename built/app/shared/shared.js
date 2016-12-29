System.register(['./classes/single_score'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var single_score_1;
    return {
        setters:[
            function (single_score_1_1) {
                single_score_1 = single_score_1_1;
            }],
        execute: function() {
            exports_1("SingleScore", single_score_1.default);
        }
    }
});

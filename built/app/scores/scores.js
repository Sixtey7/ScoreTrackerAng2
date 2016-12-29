System.register(['./widget/score_widget.component', './single/single_score.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var score_widget_component_1, single_score_component_1;
    return {
        setters:[
            function (score_widget_component_1_1) {
                score_widget_component_1 = score_widget_component_1_1;
            },
            function (single_score_component_1_1) {
                single_score_component_1 = single_score_component_1_1;
            }],
        execute: function() {
            if (typeof score_widget_component_1.default === "undefined") {
                console.log('UNDEFINED!!!');
            }
            else {
                console.log('Not undefined!');
            }
            exports_1("ScoreWidgetComponent", score_widget_component_1.default);
            exports_1("SingleScoreComponent", single_score_component_1.default);
        }
    }
});

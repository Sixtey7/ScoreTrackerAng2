System.register(['@angular/core', '../../shared/shared', '../widget/score_widget.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, shared_1, score_widget_component_1;
    var SingleScoreComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            },
            function (score_widget_component_1_1) {
                score_widget_component_1 = score_widget_component_1_1;
            }],
        execute: function() {
            if (typeof score_widget_component_1.default === "undefined") {
                console.log('UNDEFINED!!!');
            }
            else {
                console.log('Not undefined!');
            }
            SingleScoreComponent = (function () {
                function SingleScoreComponent() {
                    this.scoreUpdated = new core_1.EventEmitter();
                }
                SingleScoreComponent.prototype.ngOnInit = function () {
                    this.backingClass = new shared_1.SingleScore();
                };
                SingleScoreComponent.prototype.valueUpdated = function (newValue) {
                    console.log('Value: ' + newValue);
                    this.backingClass.setCurrNum(newValue);
                    this.scoreUpdated.emit(this.backingClass.getScore());
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SingleScoreComponent.prototype, "scoreUpdated", void 0);
                SingleScoreComponent = __decorate([
                    core_1.Component({
                        selector: 'single-score',
                        styleUrls: ['app/scores/single/single_score.component.css'],
                        templateUrl: 'app/scores/single/single_score.component.html',
                        directives: [score_widget_component_1.default]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SingleScoreComponent);
                return SingleScoreComponent;
            }());
            exports_1("default", SingleScoreComponent);
        }
    }
});

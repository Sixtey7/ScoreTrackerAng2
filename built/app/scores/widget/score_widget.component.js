System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var ScoreWidgetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ScoreWidgetComponent = (function () {
                function ScoreWidgetComponent() {
                    this.valueUpdated = new core_1.EventEmitter();
                }
                ScoreWidgetComponent.prototype.ngOnInit = function () {
                    console.log('Score Widget On Init!');
                    this.currentValue = this.initialValue;
                };
                ScoreWidgetComponent.prototype.decreaseNumber = function () {
                    console.log("Decreasing number!");
                    //no reason this should go below 0
                    if (this.currentValue > 0) {
                        this.currentValue--;
                    }
                    //emit the current value
                    this.valueUpdated.emit(this.currentValue);
                };
                ScoreWidgetComponent.prototype.increaseNumber = function () {
                    console.log('Increasing Number!');
                    this.currentValue++;
                    this.valueUpdated.emit(this.currentValue);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], ScoreWidgetComponent.prototype, "initialValue", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ScoreWidgetComponent.prototype, "valueUpdated", void 0);
                ScoreWidgetComponent = __decorate([
                    core_1.Component({
                        selector: 'score-widget',
                        styleUrls: ['app/scores/widget/score_widget.component.css'],
                        templateUrl: 'app/scores/widget/score_widget.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], ScoreWidgetComponent);
                return ScoreWidgetComponent;
            }());
            exports_1("default", ScoreWidgetComponent);
        }
    }
});

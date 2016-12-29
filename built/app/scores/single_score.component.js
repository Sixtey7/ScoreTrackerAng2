System.register(['@angular/core', '../shared/shared'], function(exports_1, context_1) {
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
    var core_1, shared_1;
    var SinglesScoreComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            }],
        execute: function() {
            SinglesScoreComponent = (function () {
                function SinglesScoreComponent() {
                }
                SinglesScoreComponent.prototype.ngOnInit = function () {
                    this.backingClass = new shared_1.SingleScore();
                };
                SinglesScoreComponent = __decorate([
                    core_1.Component({
                        selector: 'single-score',
                        styleUrls: ['app/scores/single_score.component.css'],
                        templateUrl: 'app/scores/single_score.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], SinglesScoreComponent);
                return SinglesScoreComponent;
            }());
            exports_1("default", SinglesScoreComponent);
        }
    }
});

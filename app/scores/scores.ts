import ScoreWidgetComponent from './widget/score_widget.component';
import SingleScoreComponent from './single/single_score.component';
import RangeScoreComponent from './range/range_score.component';


if (typeof ScoreWidgetComponent === "undefined") {
    console.log('UNDEFINED!!!');
}
else {
    console.log('Not undefined!');
}
export {
    ScoreWidgetComponent,
    SingleScoreComponent,
    RangeScoreComponent
};
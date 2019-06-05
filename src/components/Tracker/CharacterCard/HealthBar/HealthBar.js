import { Progress } from 'reactstrap';
import React from 'react';

const HealthBar = (props) => {
    const percentage = parseInt(((props.tracker.current_hit_points / props.hit_points) * 100).toFixed(0));
    let barColor = (num) => {
        if (num  >= 75) {
            return "success"
        } else if (num < 75 && num >= 30) {
            return "warning"
        } else if (num < 30) {
            return "danger"
        }
    }
    return (
        <div>
            <Progress color={barColor(percentage)} value={percentage}>{props.tracker.current_hit_points} / {props.hit_points}</Progress>
        </div>
    )
}
export default HealthBar;
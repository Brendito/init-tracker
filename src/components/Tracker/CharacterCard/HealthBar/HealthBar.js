import { Progress } from 'reactstrap';
import React from 'react';

const HealthBar = (props) => {
    const percentage = parseInt(((props.stats.currentHP / props.stats.maxHP) * 100).toFixed(0));
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
            <Progress color={barColor(percentage)} value={percentage}>{props.stats.currentHP} / {props.stats.maxHP}</Progress>
        </div>
    )
}
export default HealthBar;
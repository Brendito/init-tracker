import React, { Component } from 'react';
import HealthBar from '../Tracker/CharacterCard/HealthBar/HealthBar';
import * as types from "../../constants/formGroupTypes";
import { Col, Input, Button } from 'reactstrap';

class HealthController extends Component {
    constructor(props) {
        super(props);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
    }

    handleIncrement (event) {
        let inputValue = parseInt(document.getElementById("hpAmount").value)
        let newHP;
        if (inputValue) {
            newHP = this.props.stats.currentHP + inputValue;
            this.props.listener("currentHP", newHP, types.STATS)
        } else {
            newHP = this.props.stats.currentHP + 1;
            this.props.listener("currentHP", newHP, types.STATS)
        }
    }

    handleDecrement (event) {
        let inputValue = parseInt(document.getElementById("hpAmount").value)
        let newHP;
        if (inputValue) {
            newHP = this.props.stats.currentHP - parseInt(inputValue);
            this.props.listener("currentHP", newHP, types.STATS)
        } else {
            newHP = this.props.stats.currentHP - 1;
            this.props.listener("currentHP", newHP, types.STATS)
        }
    }

    render() {
        return (
            <div>
                <HealthBar {...this.props} />
                <div className="d-flex justify-content-center">
                <Col sm={6}>
                    <div className="d-flex m-2">
                        <Button onClick={this.handleDecrement}>-</Button>
                        <Input className="mx-3" type="text" id="hpAmount"></Input>
                        <Button onClick={this.handleIncrement}>+</Button>
                    </div>
                </Col>
                </div>
            </div>);
    }
}

export default HealthController;
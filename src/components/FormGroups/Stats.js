import React, { Component } from "react";
import * as formGroupTypes from "../../constants/formGroupTypes";
import { FormGroup, Label, Input } from "reactstrap";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.handleStats = this.handleStats.bind(this);
    this.handleInit = this.handleInit.bind(this);
  }

  handleStats(event) {
    const name = event.target.name;
    const value = Number(event.target.value);
    this.props.listener(name, value, formGroupTypes.STATS);
  }

  handleInit(event){
    const name = event.target.name;
    const value = Number(event.target.value);
    this.props.listener(name, value, formGroupTypes.INIT);
  }

  render() {
    return (
      <div>
        <h4>Character Stats</h4>
        <FormGroup>
          <Label for="maxHP">Max HP</Label>
          <Input
            type="number"
            name="maxHP"
            id="maxHP"
            placeholder={this.props.maxHP}
            onChange={this.handleStats}
          />
        </FormGroup>
        <FormGroup>
          <Label for="init">AC</Label>
          <Input
            type="number"
            name="ac"
            id="ac"
            placeholder={this.props.ac}
            onChange={this.handleStats}
          />
        </FormGroup>
        <FormGroup>
          <Label for="initMod">Initiative Modifier</Label>
          <Input
            type="number"
            name="initMod"
            id="initMod"
            placeholder={this.props.initMod}
            onChange={this.handleInit}
          />
        </FormGroup>
      </div>
    );
  }
}

export default Stats;
